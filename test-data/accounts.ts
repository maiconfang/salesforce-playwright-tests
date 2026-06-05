import { AccountData }
  from "@models/accounts/AccountData";

export function createAccountData():
  AccountData {

  const uniqueId =
    Date.now();

  return {

    name:
      `OpenAI-${uniqueId}`,

  };
}