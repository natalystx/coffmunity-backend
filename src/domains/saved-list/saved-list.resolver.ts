import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NODE } from 'src/constants/nodes';
import { Neo4jService } from 'src/neo4j/neo4js.service';
import {
  AddRecipeToListInput,
  CreateSavedListInput,
  DeleteSavedListInput,
  RemoveRecipeToListInput,
} from 'type';
import { SavedList } from './save-list.entity';
import { RELATIONSHIP } from 'src/constants/relationships';
import { queryToSavedList } from './utils/queryToSavedList';
import { node } from 'cypher-query-builder';

@Resolver('SavedList')
export class SavedListResolver {
  constructor(private neo4jService: Neo4jService) {}

  @Mutation('createSavedList')
  async createSavedList(
    @Args('createSavedListInput') createSavedListInput: CreateSavedListInput,
  ): Promise<SavedList> {
    const result = await this.neo4jService
      .initQuery()
      .raw(
        `
    MATCH (user:${NODE.USER} {username: "${createSavedListInput.createBy}"})
    CREATE (saveList:${NODE.SAVED_LIST} {id: apoc.create.uuid(), name: "${createSavedListInput.name}", createdTime: timestamp(), saveRecipeIds: "", createBy: "${createSavedListInput.createBy}"}),
    (user) -[:${RELATIONSHIP.CREATE}]->(saveList)
    return saveList
    `,
      )
      .run();

    return queryToSavedList(result[0]['saveList'].properties);
  }

  @Mutation('addRecipeToList')
  async addRecipeToList(
    @Args('addRecipeToListInput') addRecipeToListInput: AddRecipeToListInput,
  ) {
    const result = await this.neo4jService
      .initQuery()
      .raw(
        `MATCH (list:${NODE.SAVED_LIST} {id: "${addRecipeToListInput.listId}"})
        SET list.saveRecipeIds = CASE
        WHEN list.saveRecipeIds = "" THEN ["${addRecipeToListInput.recipeId}"]
        ELSE
            CASE
            WHEN NOT "${addRecipeToListInput.recipeId}" IN list.saveRecipeIds THEN list.saveRecipeIds + ["${addRecipeToListInput.recipeId}"]
            ELSE list.saveRecipeIds
            END
        END
        WITH list
        MATCH (recipe:${NODE.RECIPE} {id: "${addRecipeToListInput.recipeId}"})
        CREATE (recipe)-[:${RELATIONSHIP.ADD}]->(list)
        RETURN list
        `,
      )
      .run();

    return queryToSavedList(result[0]['list'].properties);
  }

  @Mutation('removeRecipeToList')
  async removeRecipeToList(
    @Args('removeRecipeToListInput')
    removeRecipeToListInput: RemoveRecipeToListInput,
  ) {
    const result = await this.neo4jService
      .initQuery()
      .raw(
        `MATCH (list:${NODE.SAVED_LIST} {id: "${removeRecipeToListInput.listId}"})
      SET list.saveRecipeIds = [x IN list.saveRecipeIds WHERE x <> "${removeRecipeToListInput.recipeId}"]
      WITH list
      MATCH (recipe:${NODE.RECIPE} {id: "${removeRecipeToListInput.recipeId}"})-[r:${RELATIONSHIP.ADD}]->(list)
      DELETE r
      RETURN list
      `,
      )
      .run();

    return queryToSavedList(result[0]['list'].properties);
  }

  @Mutation('deleteSavedList')
  async deleteSavedList(
    @Args('deleteSavedListInput') deleteSavedListInput: DeleteSavedListInput,
  ) {
    await this.neo4jService
      .initQuery()
      .raw(
        `MATCH (list:${NODE.SAVED_LIST} {id: "${deleteSavedListInput.listId}"})
        OPTIONAL MATCH (recipe:${NODE.RECIPE})-[add:${RELATIONSHIP.ADD}]->(list)
        OPTIONAL MATCH (user:${NODE.USER} {username: "${deleteSavedListInput.createBy}"})-[create:${RELATIONSHIP.CREATE}]->(list)
        DELETE list, add, create`,
      )
      .run();

    return {
      success: true,
    };
  }

  @Query('savedLists')
  async findAllSavedListByUsername(@Args('username') username: string) {
    const result = await this.neo4jService
      .initQuery()
      .match(node(NODE.SAVED_LIST, NODE.SAVED_LIST, { createBy: username }))
      .return(NODE.SAVED_LIST)
      .run();
    if (result.length === 0) {
      return [];
    }
    const formattedResult = result.map(
      (item) => item[NODE.SAVED_LIST].properties as SavedList,
    );
    return formattedResult;
  }

  @Query('savedListById')
  async findAllSavedListById(@Args('username') listId: string) {
    const result = await this.neo4jService
      .initQuery()
      .match(node(NODE.SAVED_LIST, NODE.SAVED_LIST, { id: listId }))
      .return(NODE.SAVED_LIST)
      .run();

    return result[0][NODE.SAVED_LIST].properties as SavedList;
  }
}
