/**
 * Centralized application logger.
 *
 * Purpose:
 * - Avoid repetitive console.log usage across the framework
 * - Centralize logging behavior
 * - Provide cleaner and more maintainable code
 * - Allow future evolution without changing all components
 *
 * Current Features:
 * - Debug logs controlled by DEBUG_LOGS environment variable
 * - Standard info logs
 * - Error logs
 *
 * Future Improvements:
 * - Log levels (warn, trace, success)
 * - Timestamps
 * - Colored console output
 * - CI/CD optimized logs
 * - HTML report integration
 * - Persistent log files
 * - AI telemetry integration
 *
 * Environment Example:
 *
 * DEBUG_LOGS=true
 *
 * Usage Examples:
 *
 * Logger.debug("Waiting for locator");
 *
 * Logger.info("Lead created successfully");
 *
 * Logger.error("Failed to create lead");
 */
export class Logger {

  /**
   * Controls whether debug logs are enabled.
   */
  private static readonly debugEnabled =
    process.env.DEBUG_LOGS === "true";

  /**
   * Writes debug-level logs when DEBUG_LOGS=true.
   *
   * Intended for:
   * - Development troubleshooting
   * - Synchronization tracing
   * - UI interaction visibility
   * - Framework execution debugging
   *
   * Uses rest parameters (...messages)
   * to support multiple log values,
   * similar to console.log().
   *
   * Examples:
   *
   * Logger.debug("Final URL:", finalUrl);
   *
   * Logger.debug("Response:", response);
   */
  static debug(...messages: unknown[]): void {

    if (!this.debugEnabled) {
      return;
    }

    // console.log(
    //   "DEBUG_LOGS Maicon Fang Test to check de value of :",
    //   process.env.DEBUG_LOGS,
    // );

    console.log(...messages);
  }

  /**
   * Writes informational logs.
   */
  static info(message: string): void {
    console.log(message);
  }

  /**
   * Writes error logs.
   */
  static error(message: string): void {
    console.error(message);
  }
}