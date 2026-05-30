import { Opportunity }
  from "@api/models/Opportunity";

export class OpportunityBuilder {

  private opportunity: Opportunity = {
    Name: "OpenAI Enterprise Contract",
    StageName: "Prospecting",
    CloseDate: "2026-12-31",
  };

  withName(
    name: string,
  ): OpportunityBuilder {

    this.opportunity.Name = name;

    return this;
  }

  withDescription(
    description: string,
  ): OpportunityBuilder {

    this.opportunity.Description =
      description;

    return this;
  }

  withStageName(
    stageName: string,
  ): OpportunityBuilder {

    this.opportunity.StageName =
      stageName;

    return this;
  }

  withAmount(
    amount: number,
  ): OpportunityBuilder {

    this.opportunity.Amount =
      amount;

    return this;
  }

  withCloseDate(
    closeDate: string,
  ): OpportunityBuilder {

    this.opportunity.CloseDate =
      closeDate;

    return this;
  }

  withNextStep(
    nextStep: string,
  ): OpportunityBuilder {

    this.opportunity.NextStep =
      nextStep;

    return this;
  }

  withType(
    type: string,
  ): OpportunityBuilder {

    this.opportunity.Type =
      type;

    return this;
  }

  withLeadSource(
    leadSource: string,
  ): OpportunityBuilder {

    this.opportunity.LeadSource =
      leadSource;

    return this;
  }

  build(): Opportunity {

    return this.opportunity;
  }
}