import { OpportunityData }
  from "@models/opportunities/OpportunityData";

export function createOpportunityData():
  OpportunityData {

  const uniqueId =
    Date.now();

  const closeDate =
    new Date(
      Date.now() +
      30 * 24 * 60 * 60 * 1000,
    )
      .toISOString()
      .split("T")[0];

  return {

    name:
      `Healthcare-${uniqueId}`,

    stageName:
      "Prospecting",

    closeDate,

  };
}