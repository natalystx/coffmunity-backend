import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { Connection } from 'cypher-query-builder';

export const NEO4J_CONFIG = 'NEO4J_CONFIG';
export const NEO4J_CONNECTION = 'NEO4J_CONNECTION';

export type Neo4jConfig = {
  host: string;
  password: string;
  username: string;
};

const createDatabaseConfig = (configService: ConfigService): Neo4jConfig => {
  return {
    host: configService.get('NEO4J_URI'),
    password: configService.get('NEO4J_PASSWORD'),
    username: configService.get('NEO4J_USERNAME'),
  };
};

@Module({})
export class Neo4jModule {
  static forRootSync(): DynamicModule {
    return {
      module: Neo4jModule,
      imports: [ConfigModule],
      global: true,
      providers: [
        {
          provide: NEO4J_CONFIG,
          inject: [ConfigService],
          useFactory: (ConfigService: ConfigService) =>
            createDatabaseConfig(ConfigService),
        },
        {
          provide: NEO4J_CONNECTION,
          inject: [NEO4J_CONFIG],
          useFactory: (config: Neo4jConfig) => {
            try {
              const connection = new Connection(config.host, {
                username: config.username,
                password: config.password,
              });

              return connection;
            } catch (err) {
              throw Error(err);
            }
          },
        },
      ],
    };
  }
}
