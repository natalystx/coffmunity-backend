import { Inject, Injectable, OnApplicationShutdown } from '@nestjs/common';
import { Connection } from 'cypher-query-builder';
import { NEO4J_CONNECTION } from './neo4j.module';

@Injectable()
export class Neo4jService implements OnApplicationShutdown {
  constructor(
    @Inject(NEO4J_CONNECTION)
    private readonly connection: Connection,
  ) {}

  initQuery() {
    return this.connection.query;
  }
  onApplicationShutdown() {
    this.connection.close();
  }
}
