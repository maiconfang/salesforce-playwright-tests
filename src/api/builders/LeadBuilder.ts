import { Lead } from "@api/models/Lead";

export class LeadBuilder {

  private lead: Lead = {
    LastName: "Fang",
    Company: "TaskManagerPlus",
  };

  withFirstName(firstName: string): LeadBuilder {
    this.lead.FirstName = firstName;

    return this;
  }

  withLastName(lastName: string): LeadBuilder {
    this.lead.LastName = lastName;

    return this;
  }

  withCompany(company: string): LeadBuilder {
    this.lead.Company = company;

    return this;
  }

  build(): Lead {
    return {
      ...this.lead,
    };
  }
}