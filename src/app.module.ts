import { ApolloDriver } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { AppController } from "./app.controller";
import { TestResolver } from "./app.resolver";
import { AppService } from "./app.service";

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
      context: context => context,
      driver: ApolloDriver
    })
  ],
  controllers: [AppController],
  providers: [AppService, TestResolver]
})
export class AppModule {}
