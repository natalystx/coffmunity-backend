import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { Neo4jModule } from './neo4j/neo4j.module';
import { GraphQLModule } from '@nestjs/graphql';
import { AppResolver } from './app.resolver';
import { ApolloDriver } from '@nestjs/apollo';
import { AuthorizationModule } from './authorization/authorization.module';
import { UserModule } from './domains/user/user.module';
import { RecipeModule } from './domains/recipe/recipe.module';
import { CommentModule } from './domains/comment/comment.module';
import { SavedListModule } from './domains/saved-list/saved-list.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    AuthorizationModule,
    Neo4jModule.forRoot(),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      playground: true,
      cors: false,
      introspection: true,
    }),

    UserModule,
    RecipeModule,
    CommentModule,
    SavedListModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
