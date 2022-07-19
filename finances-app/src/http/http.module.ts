import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../database/database.module';
import { GraphQLModule } from '@nestjs/graphql';
import { resolve } from 'node:path';
import { ApolloDriver } from '@nestjs/apollo';
import { BillResolver } from './graphql/resolvers/bill.resolver';
import { UserResolver } from './graphql/resolvers/user.resolver';
import { BillsService } from 'src/services/bills.service';
import { BillRepositoryInMemory } from 'src/repositories/BillRepositoryInMemory';
import { BillRepositoryPostgres } from 'src/repositories/BillRepositoryPostgres';
import { UsersService } from 'src/services/user.service';
import { UserRepository } from 'src/repositories/UserRepositoryPostgres';

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
    //Resolvers
    BillResolver,
    UserResolver,
    //Services
    BillsService,
    UsersService,
    // Repositories
    UserRepository,
    BillRepositoryInMemory,
    BillRepositoryPostgres,
  ],
})
export class HttpModule {}
