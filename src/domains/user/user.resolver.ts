import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.entity';
import { Neo4jService } from 'src/neo4j/neo4js.service';
import { node } from 'cypher-query-builder';
import { NODE } from 'src/constants/nodes';
import {
  CreateUserInput,
  DisLikeRecipeInput,
  FollowUserInput,
  LikeRecipeInput,
  UpdateUserInput,
} from 'type';
import { HttpException, HttpStatus } from '@nestjs/common';
import { RELATIONSHIP } from 'src/constants/relationships';

@Resolver('User')
export class UserResolver {
  constructor(private neo4jService: Neo4jService) {}

  @Query('users')
  async findAll(): Promise<User[]> {
    try {
      const result = await this.neo4jService
        .initQuery()
        .match([node(NODE.USER)])
        .return(NODE.USER)
        .run();

      const users = result.map((item) => item[NODE.USER]?.properties as User);
      return users;
    } catch (error) {
      return [];
    }
  }

  @Query('user')
  async findOne(@Args('username') username: string) {
    try {
      const result = await this.neo4jService
        .initQuery()
        .match([
          node(NODE.USER, NODE.USER, {
            username: username,
          }),
        ])
        .return(NODE.USER)
        .run();

      return result[0][NODE.USER].properties as User;
    } catch (error) {
      return null;
    }
  }

  @Mutation('createUser')
  async createUser(@Args('createUserInput') userInput: CreateUserInput) {
    const existUser = await this.findOne(userInput.username);
    if (existUser?.id) {
      throw new HttpException('This user already exist', HttpStatus.FORBIDDEN);
    }
    const result = await this.neo4jService
      .initQuery()
      .createNode(NODE.USER, NODE.USER, {
        ...userInput,
        id: '',
        createdTime: '',
        followers: 0,
      })
      .setVariables({
        [`${NODE.USER}.id`]: 'apoc.create.uuid()',
        [`${NODE.USER}.createdTime`]: 'timestamp()',
      })
      .return(NODE.USER)
      .run();

    return result[0][NODE.USER].properties as User;
  }

  @Mutation('updateUser')
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    const result = await this.neo4jService
      .initQuery()
      .match(
        node(NODE.USER, NODE.USER, {
          id: updateUserInput.id,
        }),
      )
      .setValues({
        [`${NODE.USER}.fullName`]: updateUserInput.fullName,
        [`${NODE.USER}.image`]: updateUserInput.image,
      })
      .return(NODE.USER)
      .run();

    if (!result.length) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }
    return result[0][NODE.USER].properties as User;
  }

  @Mutation('deleteUser')
  async deleteUser(@Args('id') id: string) {
    try {
      await this.neo4jService
        .initQuery()
        .match(
          node(NODE.USER, NODE.USER, {
            id: id,
          }),
        )
        .delete(NODE.USER)
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

  @Query('didLikeRecipe')
  async didLikeRecipe(
    @Args('checkRecipeLikeInput') checkRecipeLikeInput: LikeRecipeInput,
  ) {
    const result = await this.neo4jService
      .initQuery()
      .raw(
        `
      MATCH (user:${NODE.USER} {username: "${checkRecipeLikeInput.username}"}) 
      - [:${RELATIONSHIP.LIKE}] -> 
      (recipe:${NODE.RECIPE} {id: "${checkRecipeLikeInput.recipeId}"})
    `,
      )
      .return('recipe')
      .run();

    return {
      like: result.length > 0,
    };
  }

  @Query('didDislikeRecipe')
  async didDislikeRecipe(
    @Args('checkRecipeDislikeInput')
    checkRecipeDislikeInput: DisLikeRecipeInput,
  ) {
    const result = await this.neo4jService
      .initQuery()
      .raw(
        `
      MATCH (user:${NODE.USER} {username: "${checkRecipeDislikeInput.username}"}) 
      - [:${RELATIONSHIP.DISLIKE}] -> 
      (recipe:${NODE.RECIPE} {id: "${checkRecipeDislikeInput.recipeId}"})
    `,
      )
      .return('recipe')
      .run();

    return {
      dislike: result.length > 0,
    };
  }

  @Mutation('followUser')
  async followUser(@Args('followUserInput') followUserInput: FollowUserInput) {
    await this.neo4jService
      .initQuery()
      .raw(
        `MATCH (me:${NODE.USER} {username: "${followUserInput.myUsername}"}), (you:${NODE.USER} {username: "${followUserInput.followUser}"})
        OPTIONAL MATCH (me)-[prevFollow:${RELATIONSHIP.FOLLOW}]->(you)   
        DELETE prevFollow
        WITH me, you, prevFollow
        SET you.followers = you.followers - CASE WHEN prevFollow IS NOT NULL THEN 1 ELSE 0 END
        WITH me, you, prevFollow
        FOREACH (x IN CASE WHEN prevFollow IS NULL THEN [1] ELSE [] END |
            CREATE (me)-[:${RELATIONSHIP.FOLLOW}]->(you)
            SET you.followers = you.followers + 1
        )`,
      )
      .run();

    return {
      success: true,
    };
  }
}
