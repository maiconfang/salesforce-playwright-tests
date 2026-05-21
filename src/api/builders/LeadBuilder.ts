export class LeadBuilder {
  private lead = {
    FirstName: "Maicon",
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

  build() {
    return this.lead;
  }
}
