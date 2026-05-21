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
        JSON.stringify(payload, null, 2),
      );
    }
  }

  static logResponse(
    status: number,
    duration: number,
    response?: unknown,
  ): void {

    console.log("\n========== API RESPONSE ==========");

    console.log("Status:", status);

    console.log("Duration:", `${duration}ms`);

    if (response) {

      console.log(
        "Response:",
        JSON.stringify(response, null, 2),
      );
    }
  }
}