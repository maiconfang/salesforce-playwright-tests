import { APIRequestContext, APIResponse } from "@playwright/test";

export abstract class ApiClient {
  constructor(protected request: APIRequestContext) {}

  protected async validateResponse(response: APIResponse): Promise<void> {
    if (!response.ok()) {
      throw new Error(
        `API request failed with status ${response.status()}`,
      );
    }
  }
}
