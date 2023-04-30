import { DynamicModule, Module } from '@nestjs/common';
import { Neo4jService } from './neo4js.service';

export const NEO4J_CONFIG = 'NEO4J_CONFIG';
export const NEO4J_CONNECTION = 'NEO4J_CONNECTION';
export const NEO4J_SERVICE = 'NEO4J_SERVICE';

export type Neo4jConfig = {
  host: string;
  password: string;
  username: string;
};

@Module({
  providers: [Neo4jService],
})
export class Neo4jModule {
  static forRoot(): DynamicModule {
    return {
      module: Neo4jModule,
      // imports: [ConfigModule],
      global: true,
      providers: [Neo4jService],
      exports: [Neo4jService],
    };
  }
}
