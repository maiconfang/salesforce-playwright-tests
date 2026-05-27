import { APIRequestContext, APIResponse } from "@playwright/test";
import { ApiClient } from "./ApiClient";
import { SalesforceAuthClient } from "@api/auth/SalesforceAuthClient";
import { ApiLogger } from "@api/utils/logger/ApiLogger";
import { ExecutionContextManager } from "@/core/execution/ExecutionContextManager";
import { ExecutionFlowType } from "@/core/execution/ExecutionFlowType";

export abstract class SalesforceApiClient extends ApiClient {

  private readonly apiVersion =
    process.env.SF_API_VERSION ?? "v61.0";

  constructor(
    request: APIRequestContext,
    protected authClient: SalesforceAuthClient,
  ) {
    super(request);
  }

  /**
   * Builds default Salesforce API headers.
   *
   * Allows optional header extension for:
   * - Correlation IDs
   * - Multipart requests
   * - Feature flags
   * - Future observability integrations
   */
  protected async buildHeaders(
    additionalHeaders?: Record<string, string>,
  ): Promise<Record<string, string>> {

    const token =  await this.authClient.authenticate();

    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...additionalHeaders,
    };
  }

  /**
   * Builds Salesforce REST API endpoint.
   */
  protected buildEndpoint(path: string): string {

    return `/services/data/${this.apiVersion}${path}`;
  }

  /**
   * Executes HTTP GET request.
   */
  protected async get(
    endpoint: string,
  ): Promise<APIResponse> {

    const response =
      await this.request.get(
        this.buildEndpoint(endpoint),
        {
          headers: await this.buildHeaders(),
        },
      );

    await this.validateResponse(response);

    return response;
  }

  /**
   * Executes HTTP POST request.
   */
  protected async post(
    endpoint: string,
    payload: unknown,
  ): Promise<any> {

    ApiLogger.logRequest(
      "POST",
      endpoint,
      payload,
    );

    ExecutionContextManager
      .getContext()
      .addStep(
        ExecutionFlowType.FLOW,
        `Executing POST request to ${endpoint}`,
      );

    ExecutionContextManager
      .getContext()
      .addStep(
        ExecutionFlowType.DATA,
        "Sending Salesforce Lead payload",
        undefined,
        undefined,
        undefined,
        {
          payload,
        },
      );


    const startTime = Date.now();

    const response =
      await this.request.post(
        this.buildEndpoint(endpoint),
        {
          headers: await this.buildHeaders(),
          data: payload,
        },
      );

    const duration =
      Date.now() - startTime;

    const responseBody =
      await response.json();

    ExecutionContextManager
      .getContext()
      .addStep(
        ExecutionFlowType.SUCCESS,
        `POST ${endpoint} completed with status ${response.status()}`,
      );

    ApiLogger.logResponse(
      response.status(),
      duration,
      responseBody,
    );

    return responseBody;
  }

  /**
   * Executes HTTP PATCH request.
   */
  protected async patch(
    endpoint: string,
    payload: unknown,
  ): Promise<APIResponse> {

    const response =
      await this.request.patch(
        this.buildEndpoint(endpoint),
        {
          headers: await this.buildHeaders(),
          data: payload,
        },
      );

    await this.validateResponse(response);

    return response;
  }

  /**
   * Executes HTTP DELETE request.
   */
  protected async delete(
    endpoint: string,
  ): Promise<APIResponse> {

    const response =
      await this.request.delete(
        this.buildEndpoint(endpoint),
        {
          headers: await this.buildHeaders(),
        },
      );

    await this.validateResponse(response);

    return response;
  }
}