export class ApiLogger {

  static logRequest(
    method: string,
    endpoint: string,
    payload?: unknown,
  ): void {

    console.log("\n========== API REQUEST ==========");

    console.log("Method:", method);

    console.log("Endpoint:", endpoint);

    if (payload) {

      console.log(
        "Payload:",
        JSON.stringify(
          payload,
          null,
          2,
        ),
      );
    }
  }

  static logResponse(
    status: number,
    duration: number,
    response?: any,
  ): void {

    console.log("\n========== API RESPONSE ==========");

    console.log("Status:", status);

    console.log("Duration:", `${duration}ms`);

    /*
     * Keep terminal logs concise.
     *
     * Large payloads should be stored
     * in artifacts/debug files instead
     * of flooding terminal output.
     */

    if (!response) {
      return;
    }

    if (response.id) {

      console.log(
        "ID:",
        response.id,
      );
    }

    if (response.success !== undefined) {

      console.log(
        "Success:",
        response.success,
      );
    }

    if (
      response.errors &&
      response.errors.length > 0
    ) {

      console.log(
        "Errors:",
        JSON.stringify(
          response.errors,
          null,
          2,
        ),
      );
    }
  }
}