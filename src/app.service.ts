import { Injectable } from "@nestjs/common";
import * as dotenv from "dotenv";
import { Client } from "@notionhq/client";
import { Octokit } from "octokit";

dotenv.config();

@Injectable()
export class AppService {
  #octokit: Octokit;
  #notion: Client;
  constructor() {
    this.#notion = new Client({ auth: process.env.NOTION_KEY });
    this.#octokit = new Octokit({ auth: process.env.GITHUB_KEY });
  }
  async getGitHubIssuesForRepository(): Promise<any[]> {
    const issues = [];
    const iterator = this.#octokit.paginate.iterator(this.#octokit.rest.issues.listForRepo, {
      owner: process.env.GITHUB_REPO_OWNER,
      repo: process.env.GITHUB_REPO_NAME,
      state: "all",
      per_page: 100
    });
    for await (const { data } of iterator) {
      for (const issue of data) {
        if (!issue.pull_request) {
          issues.push({
            number: issue.number,
            title: issue.title,
            state: issue.state,
            comment_count: issue.comments,
            url: issue.html_url
          });
        }
      }
    }
    return issues;
  }

  async getNotionDatabase() {
    const response = await this.#notion.databases.query({ database_id: process.env.NOTION_DATABASE_ID });
    return response;
  }
}
