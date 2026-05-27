import {
  expect,
  Locator,
  Page,
} from "@playwright/test";

import { BasePage } from "./BasePage";

import { Logger } from "@framework-utils/logger/Logger";

import { ExecutionContextManager } from "@/core/execution/ExecutionContextManager";
import { ExecutionFlowType } from "@/core/execution/ExecutionFlowType";

/**
 * LoginPage
 *
 * Responsibility:
 * - Handle Salesforce authentication flows
 * - Perform login actions
 * - Validate authentication states
 *
 * Benefits:
 * - Cleaner authentication tests
 * - Reusable login behavior
 * - Better maintainability
 * - Enterprise-style architecture
 *
 * Execution Observability:
 * - Generates semantic execution flow events
 * - Provides human-readable execution telemetry
 * - Supports future AI-powered analysis
 */
export class LoginPage extends BasePage {

  private readonly usernameInput: Locator;

  private readonly passwordInput: Locator;

  private readonly loginButton: Locator;

  private readonly loginErrorMessage: Locator;

  constructor(page: Page) {

    super(page);

    this.usernameInput =
      this.page.getByLabel(
        "Username",
      );

    this.passwordInput =
      this.page.getByLabel(
        "Password",
      );

    this.loginButton =
      this.page.getByRole(
        "button",
        {
          name: "Log In",
        },
      );

    this.loginErrorMessage =
      this.page.locator(
        "#error",
      );
  }

  /**
   * Performs user login.
   */
  async login(
    username: string,
    password: string,
  ): Promise<void> {

    const executionContext =
      ExecutionContextManager.getContext();

    executionContext.addStep(
      ExecutionFlowType.FLOW,
      "Performing user login",
    );

    executionContext.addData(
      "Username",
      username,
      "Authentication",
    );

    executionContext.addData(
      "Password",
      password,
      "Authentication",
      true,
    );

    Logger.debug(
      "Starting login flow",
    );

    await this.uiActionsComponent.fill(
      this.usernameInput,
      username,
      "Username input",
    );

    await this.uiActionsComponent.fill(
      this.passwordInput,
      password,
      "Password input",
    );

    await this.uiActionsComponent.click(
      this.loginButton,
      "Login button",
    );

    Logger.debug(
      "Login action executed successfully",
    );
  }

  /**
   * Validates successful authentication.
   */
  async expectSuccessfulLogin(): Promise<void> {

    Logger.debug(
      "Validating successful login",
    );

    await expect(this.page)
      .not.toHaveURL(/login/);

    Logger.debug(
      "Successful login validated",
    );
  }

  /**
   * Validates invalid credentials error.
   */
  async expectInvalidCredentialsError(): Promise<void> {

    Logger.debug(
      "Validating invalid credentials error message",
    );

    await expect(
      this.loginErrorMessage,
    ).toHaveText(
      "Error: Please check your username and password. If you still can't log in, contact your Salesforce administrator.",
    );

    Logger.debug(
      "Invalid credentials error validated successfully",
    );
  }
}