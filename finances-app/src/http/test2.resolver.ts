import { Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Resolver()
export class TestResolver2 {
  constructor(private prisma: PrismaService) {}
  @Query(() => String)
  funcao() {
    return 'batata';
  }
}
