import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { Connection } from 'cypher-query-builder';

@Injectable()
export class Neo4jService implements OnApplicationShutdown {
  private connection: Connection;
  constructor() {
    const connection = new Connection(process.env['NEO4J_URI'], {
      username: process.env['NEO4J_USERNAME'],
      password: process.env['NEO4J_PASSWORD'],
    });
    this.connection = connection;
  }

  initQuery() {
    return this.connection.query();
  }
  onApplicationShutdown() {
    this.connection.close();
  }
}
