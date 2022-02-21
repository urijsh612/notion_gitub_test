import { Field, ObjectType, Resolver, Query } from "@nestjs/graphql";
import { AppService } from "./app.service";

@ObjectType({ description: "테스트" })
export class TestModel {
  @Field()
  test: boolean;
}

@Resolver(of => TestModel)
export class TestResolver {
  #appService: AppService;
  constructor(appService: AppService) {
    this.#appService = appService;
  }
  @Query(returns => Boolean)
  async getGithubIssue() {
    const result = await this.#appService.getGitHubIssuesForRepository();
    console.log("result---->", result);
    return true;
  }

  @Query(returns => Boolean)
  async getNotionDatabase() {
    const result = await this.#appService.getNotionDatabase();
    console.log("result.results[0]---->", result.results[0]);
    console.log("result.results[1]---->", result.results[1]);
    return true;
  }
}
