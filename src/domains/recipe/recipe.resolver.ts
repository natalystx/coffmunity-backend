import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Neo4jService } from 'src/neo4j/neo4js.service';
import {
  CreateRecipeInput,
  DeleteRecipeInput,
  DisLikeRecipeInput,
  LikeRecipeInput,
  UpdateRecipeInput,
} from 'type';
import { NODE } from 'src/constants/nodes';
import { node } from 'cypher-query-builder';
import { RELATIONSHIP } from 'src/constants/relationships';
import { Recipe } from './recipe.entity';
import { queryToRecipe } from './utils/queryToRecipe';
import { isEmpty } from 'lodash';
import { ActionResponse } from 'src/schema/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from 'src/authorization/authorization.guard';

@Resolver('Recipe')
export class RecipeResolver {
  constructor(private neo4jService: Neo4jService) {}

  @UseGuards(AuthorizationGuard)
  @Mutation('createRecipe')
  async createRecipe(
    @Args('createRecipeInput') createRecipeInput: CreateRecipeInput,
  ) {
    console.log(createRecipeInput);

    const result = await this.neo4jService
      .initQuery()
      .create([
        node(NODE.RECIPE, NODE.RECIPE, {
          ...createRecipeInput,
          id: '',
          detail: JSON.stringify(createRecipeInput.detail),
          beanDetail: JSON.stringify(createRecipeInput.beanDetail),
          images: JSON.stringify(createRecipeInput?.images || []),
          likes: 0,
          dislikes: 0,
          createdTime: '',
        }),
      ])
      .setVariables({
        [`${NODE.RECIPE}.id`]: 'apoc.create.uuid()',
        [`${NODE.RECIPE}.createdTime`]: 'timestamp()',
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

  @UseGuards(AuthorizationGuard)
  @Mutation('updateRecipe')
  async updateRecipe(
    @Args('updateRecipeInput') updateRecipeInput: UpdateRecipeInput,
  ) {
    let updateList = {};
    const keys = Object.keys(updateRecipeInput);
    const convertToJSON = ['detail', 'beanDetail', 'images'];

    keys.forEach((key) => {
      if (key !== 'id') {
        if (!isEmpty(updateRecipeInput[key])) {
          updateList = {
            ...updateList,
            [`${NODE.RECIPE}.${key}`]: convertToJSON.includes(key)
              ? JSON.stringify(updateRecipeInput[key])
              : updateRecipeInput[key],
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

  @UseGuards(AuthorizationGuard)
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
      return {
        success: false,
      };
    }
  }
  @UseGuards(AuthorizationGuard)
  @Mutation('likeRecipe')
  async likeRecipe(@Args('likeRecipeInput') likeRecipeInput: LikeRecipeInput) {
    await this.neo4jService
      .initQuery()
      .raw(
        `MATCH (user:${NODE.USER} {username: "${likeRecipeInput.username}"}),
      (recipe:${NODE.RECIPE} {id: "${likeRecipeInput.recipeId}"})
      OPTIONAL MATCH (user)-[like:${RELATIONSHIP.LIKE}]->(recipe)
      OPTIONAL MATCH (user)-[dislike:${RELATIONSHIP.DISLIKE}]->(recipe)
      DELETE like, dislike
      WITH user, recipe, COALESCE(like, NULL) as prevLike, COALESCE(dislike, NULL) as prevDislike
      SET recipe.likes = recipe.likes - CASE WHEN prevLike IS NOT NULL THEN 1 ELSE 0 END,
          recipe.dislikes = recipe.dislikes - CASE WHEN prevDislike IS NOT NULL THEN 1 ELSE 0 END
      WITH user, recipe, prevLike, prevDislike
      FOREACH (x IN CASE WHEN prevLike IS NULL OR prevDislike IS NULL THEN [1] ELSE [] END |
          CREATE (user)-[:${RELATIONSHIP.LIKE}]->(recipe)
          SET recipe.likes = recipe.likes + 1
      )`,
      )
      .run();

    return {
      success: true,
    };
  }

  @UseGuards(AuthorizationGuard)
  @Mutation('dislikeRecipe')
  async dislikeRecipe(
    @Args('dislikeRecipeInput') dislikeRecipeInput: DisLikeRecipeInput,
  ) {
    await this.neo4jService
      .initQuery()
      .raw(
        `MATCH (user:${NODE.USER} {username: "${dislikeRecipeInput.username}"}),
      (recipe:${NODE.RECIPE} {id: "${dislikeRecipeInput.recipeId}"})
      OPTIONAL MATCH (user)-[like:${RELATIONSHIP.LIKE}]->(recipe)
      OPTIONAL MATCH (user)-[dislike:${RELATIONSHIP.DISLIKE}]->(recipe)
      DELETE like, dislike
      WITH user, recipe, COALESCE(like, NULL) as prevLike, COALESCE(dislike, NULL) as prevDislike
      SET recipe.likes = recipe.likes - CASE WHEN prevLike IS NOT NULL THEN 1 ELSE 0 END,
          recipe.dislikes = recipe.dislikes - CASE WHEN prevDislike IS NOT NULL THEN 1 ELSE 0 END
      WITH user, recipe, prevLike, prevDislike
      FOREACH (x IN CASE WHEN prevLike IS NULL OR prevDislike IS NULL THEN [1] ELSE [] END |
          CREATE (user)-[:${RELATIONSHIP.DISLIKE}]->(recipe)
          SET recipe.dislikes = recipe.dislikes + 1
      )`,
      )
      .run();

    return {
      success: true,
    };
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
