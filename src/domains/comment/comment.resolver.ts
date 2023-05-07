import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NODE } from 'src/constants/nodes';
import { RELATIONSHIP } from 'src/constants/relationships';
import { Neo4jService } from 'src/neo4j/neo4js.service';
import { CommentInput, DeleteCommentInput, EditCommentInput } from 'type';
import { Comment } from './comment.entity';
import { node } from 'cypher-query-builder';
import { UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from 'src/authorization/authorization.guard';

@Resolver('Comment')
export class CommentResolver {
  constructor(private neo4jService: Neo4jService) {}

  @UseGuards(AuthorizationGuard)
  @Mutation('createComment')
  async commentTo(@Args('commentInput') commentInput: CommentInput) {
    const result = await this.neo4jService
      .initQuery()
      .raw(
        `
        MATCH (me:${NODE.USER} {username: "${commentInput.createBy}"}), (node {id: "${commentInput.commentToNode}"})
        CREATE (comment:${NODE.COMMENT} {id: apoc.create.uuid(), comment: "${commentInput.comment}", createdTime: timestamp(), 
        commentToNode: "${commentInput.commentToNode}", createBy:"${commentInput.createBy}"})-[:${RELATIONSHIP.COMMENT_TO}]->(node), 
        (me)-[:${RELATIONSHIP.CREATE}]->(comment)
    `,
      )
      .return('comment')
      .run();

    return result[0]['comment'].properties as Comment;
  }

  @UseGuards(AuthorizationGuard)
  @Mutation('deleteComment')
  async deleteComment(
    @Args('deleteCommentInput') deleteCommentInput: DeleteCommentInput,
  ) {
    try {
      await this.neo4jService
        .initQuery()
        .raw(
          `MATCH (user:${NODE.USER} {username: "${deleteCommentInput.createBy}"}) -[create:${RELATIONSHIP.CREATE}]-> (comment:${NODE.COMMENT} {id: "${deleteCommentInput.id}"}),
            (comment:${NODE.COMMENT} {id: "${deleteCommentInput.id}"}) -[commentTo:${RELATIONSHIP.COMMENT_TO}]-> (node {id:"${deleteCommentInput.commentToNode}"})
            DELETE create, commentTo, comment
        `,
        )
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

  @UseGuards(AuthorizationGuard)
  @Mutation('editComment')
  async editComment(
    @Args('editCommentInput') editCommentInput: EditCommentInput,
  ) {
    try {
      const result = await this.neo4jService
        .initQuery()
        .match(node(NODE.COMMENT, NODE.COMMENT, { id: editCommentInput.id }))
        .setValues({
          [`${NODE.COMMENT}.comment`]: editCommentInput.comment,
        })
        .return(NODE.COMMENT)
        .run();

      console.log(JSON.stringify(result));

      return result[0][NODE.COMMENT].properties as Comment;
    } catch (error) {
      return error;
    }
  }

  @Query('comments')
  async getCommentsInNode(@Args('nodeId') nodeId: string): Promise<Comment[]> {
    const result = await this.neo4jService
      .initQuery()
      .match(
        node(NODE.COMMENT, NODE.COMMENT, {
          commentToNode: nodeId,
        }),
      )
      .return(NODE.COMMENT)
      .run();

    if (result.length > 0) {
      const formatted = result.map(
        (item) => item[NODE.COMMENT].properties as Comment,
      );
      return formatted;
    }

    return [];
  }
}
