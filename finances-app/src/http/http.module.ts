import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../database/database.module';
import { GraphQLModule } from '@nestjs/graphql';
import { resolve } from 'node:path';
import { ApolloDriver } from '@nestjs/apollo';
import { TestResolver } from './test.resolver';
import { TestResolver2 } from './test2.resolver';
import { BillsService } from 'src/services/bills.service';
import { BillRepositoryInMemory } from 'src/repositories/BillRepositoryInMemory';
import { BillRepositoryPostgres } from 'src/repositories/BillRepositoryPostgres';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [
    TestResolver,
    TestResolver2,
    BillsService,
    BillRepositoryInMemory,
    BillRepositoryPostgres,
  ],
})
export class HttpModule {}
