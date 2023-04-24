import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { Neo4jModule } from './neo4j/neo4j.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';

@Module({
  imports: [
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    // }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    Neo4jModule.forRootSync(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
