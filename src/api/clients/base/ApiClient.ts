import { APIRequestContext, APIResponse, } from "@playwright/test";

export abstract class ApiClient {

  constructor(
    protected request: APIRequestContext,
  ) {}

  protected async validateResponse(
    response: APIResponse,
  ): Promise<void> {

    if (!response.ok()) {

      const responseBody =
        await response.text();

      throw new Error(
        [
          "API request failed",
          `Status: ${response.status()}`,
          `Status Text: ${response.statusText()}`,
          `Response: ${responseBody}`,
        ].join("\n"),
      );
    }
  }
}