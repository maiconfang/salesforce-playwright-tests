import {
  createAccountData,
} from "@test-data/accounts";

import {
  createContactData,
} from "@test-data/contacts";

import {
  createOpportunityData,
} from "@test-data/opportunities";

import {
  createTaskData,
} from "@test-data/tasks";

export function createCustomerOnboardingData() {

  return {

    account:
      createAccountData(),

    contact:
      createContactData(),

    opportunity:
      createOpportunityData(),

    task:
      createTaskData(),

  };
}