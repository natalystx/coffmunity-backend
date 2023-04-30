import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Neo4jService } from 'src/neo4j/neo4js.service';
import { CreateRecipeInput, DeleteRecipeInput, UpdateRecipeInput } from 'type';
import { NODE } from 'src/constants/nodes';
import { node, relation } from 'cypher-query-builder';
import { RELATIONSHIP } from 'src/constants/relationships';
import { Recipe } from './recipe.entity';
import { queryToRecipe } from './utils/queryToRecipe';
import { isEmpty } from 'lodash';
import { ActionResponse } from 'src/schema/graphql';

@Resolver('Recipe')
export class RecipeResolver {
  constructor(private neo4jService: Neo4jService) {}

  @Mutation('createRecipe')
  async createRecipe(
    @Args('createRecipeInput') createRecipeInput: CreateRecipeInput,
  ) {
    const result = await this.neo4jService
      .initQuery()
      .match(
        node(NODE.USER, NODE.USER, {
          username: createRecipeInput.createBy,
        }),
      )
      .create([
        node(NODE.RECIPE, NODE.RECIPE, {
          ...createRecipeInput,
          id: '',
          detail: JSON.stringify(createRecipeInput.detail),
          images: JSON.stringify(createRecipeInput.images),
        }),
      ])
      .setVariables({
        [`${NODE.RECIPE}.id`]: 'apoc.create.uuid()',
      })
      .return(NODE.RECIPE)
      .run();
    const recipe = result[0][NODE.RECIPE].properties;

    const formattedRecipe = queryToRecipe(recipe);

    await this.neo4jService
      .initQuery()
      .raw(
        `MATCH (user: ${NODE.USER} {username: "${createRecipeInput.createBy}"}),
        (recipe: ${NODE.RECIPE} {id: "${recipe.id}"}) 
        CREATE (user) - [:${RELATIONSHIP.CREATE}] -> (recipe)
        `,
      )
      .run();

    return formattedRecipe as Recipe;
  }

  @Mutation('updateRecipe')
  async updateRecipe(
    @Args('updateRecipeInput') updateRecipeInput: UpdateRecipeInput,
  ) {
    let updateList = {};
    const keys = Object.keys(updateRecipeInput);

    keys.forEach((key) => {
      if (key !== 'id') {
        if (!isEmpty(updateRecipeInput[key])) {
          updateList = {
            ...updateList,
            [`${NODE.RECIPE}.${key}`]: updateRecipeInput[key],
          };
        }
      }
    });

    const result = await this.neo4jService
      .initQuery()
      .match(
        node(NODE.RECIPE, NODE.RECIPE, {
          id: updateRecipeInput.id,
        }),
      )
      .setValues({
        ...updateList,
      })

      .return(NODE.RECIPE)
      .run();
    const recipe = result[0][NODE.RECIPE].properties;

    const formattedRecipe = queryToRecipe(recipe);

    return formattedRecipe as Recipe;
  }

  @Mutation('deleteRecipe')
  async deleteRecipe(
    @Args('deleteRecipeInput') deleteRecipeInput: DeleteRecipeInput,
  ): Promise<ActionResponse> {
    try {
      await this.neo4jService
        .initQuery()
        .raw(
          `MATCH (:${NODE.USER} {username: "${deleteRecipeInput.username}"})
          -[r:${RELATIONSHIP.CREATE}]->
          (:${NODE.RECIPE} {id: "${deleteRecipeInput.recipeId}"})`,
        )
        .delete('r')
        .run();

      await this.neo4jService
        .initQuery()
        .match(
          node(NODE.RECIPE, NODE.RECIPE, {
            id: deleteRecipeInput.recipeId,
          }),
        )
        .delete(NODE.RECIPE)
        .run();
      return {
        success: true,
      };
    } catch (error) {
      console.log(error);

      return {
        success: false,
      };
    }
  }

  @Query('recipes')
  async findAll() {
    const result = await this.neo4jService
      .initQuery()
      .match(node(NODE.RECIPE, NODE.RECIPE))
      .return(NODE.RECIPE)
      .run();

    const formattedData = result.map((item) =>
      queryToRecipe(item[NODE.RECIPE].properties),
    );

    return formattedData;
  }

  @Query('recipe')
  async findOne(@Args('recipeId') id: string) {
    const result = await this.neo4jService
      .initQuery()
      .match(
        node(NODE.RECIPE, NODE.RECIPE, {
          id: id,
        }),
      )
      .return(NODE.RECIPE)
      .run();

    if (!result.length) return null;
    return queryToRecipe(result[0][NODE.RECIPE].properties);
  }

  @Query('userRecipe')
  async findByUsername(@Args('username') username: string) {
    const result = await this.neo4jService
      .initQuery()
      .match(
        node(NODE.RECIPE, NODE.RECIPE, {
          createBy: username,
        }),
      )
      .return(NODE.RECIPE)
      .run();
    if (!result.length) return null;
    const formattedData = result.map((item) =>
      queryToRecipe(item[NODE.RECIPE].properties),
    );

    return formattedData;
  }
}
