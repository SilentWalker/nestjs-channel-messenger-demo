import { Injectable, Logger } from '@nestjs/common';
import { ApolloDriverConfig, ApolloDriverConfigFactory } from '@nestjs/apollo';
import { GraphQLDirective, DirectiveLocation } from 'graphql';
import { upperDirectiveTransformer } from './directives/upper-case.directive';

import { NODE_ENV, GRAPHQL_DEPTH_LIMIT } from '../../environments';

import * as depthLimit from 'graphql-depth-limit';

@Injectable()
export class GraphqlConfigService implements ApolloDriverConfigFactory {
  async createGqlOptions(): Promise<ApolloDriverConfig> {
    return {
      autoSchemaFile: 'schema.gql',
      transformSchema: (schema) => upperDirectiveTransformer(schema, 'upper'),
      installSubscriptionHandlers: true,
      buildSchemaOptions: {
        directives: [
          new GraphQLDirective({
            name: 'upper',
            locations: [DirectiveLocation.FIELD_DEFINITION],
          }),
        ],
      },
      bodyParserConfig: { limit: '50mb' },
      validationRules: [
        depthLimit(GRAPHQL_DEPTH_LIMIT!, (depths) => {
          if (depths[''] === GRAPHQL_DEPTH_LIMIT! - 1) {
            Logger.warn(
              `⚠️  You can only descend ${GRAPHQL_DEPTH_LIMIT} levels.`,
              'GraphQL',
              false,
            );
          }
        }),
      ],
      introspection: true,
      playground: NODE_ENV !== 'production',
      cache: 'bounded',
      formatError: (error) => {
        return {
          message: error.message,
          code: error.extensions && error.extensions.code,
          locations: error.locations,
          path: error.path,
        };
      },
      formatResponse: (response) => {
        return response;
      },
    };
  }
}
