import { APIRequestContext } from "@playwright/test";
import { ApiClient } from "./ApiClient";
import { SalesforceAuthClient } from "../auth/SalesforceAuthClient";

export abstract class SalesforceApiClient extends ApiClient {
  private readonly apiVersion =
    process.env.SF_API_VERSION ?? "v61.0";

  constructor(
    request: APIRequestContext,
    protected authClient: SalesforceAuthClient,
  ) {
    super(request);
  }

  protected async buildHeaders(): Promise<Record<string, string>> {
    const token = await this.authClient.authenticate();

    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  }

  protected buildEndpoint(path: string): string {
    return `/services/data/${this.apiVersion}${path}`;
  }
}
