import { Account } from "@api/models/Account";


export class AccountBuilder {

  private account: Account = {
    Name: "OpenAI Account",
  };

  withName(
    name: string,
  ): AccountBuilder {

    this.account.Name = name;

    return this;
  }

  withType(
    type: string,
  ): AccountBuilder {

    this.account.Type = type;

    return this;
  }

  withPhone(
    phone: string,
  ): AccountBuilder {

    this.account.Phone = phone;

    return this;
  }

  withWebsite(
    website: string,
  ): AccountBuilder {

    this.account.Website = website;

    return this;
  }

  withIndustry(
    industry: string,
  ): AccountBuilder {

    this.account.Industry = industry;

    return this;
  }

  withAnnualRevenue(
    annualRevenue: number,
  ): AccountBuilder {

    this.account.AnnualRevenue = annualRevenue;

    return this;
  }

  withNumberOfEmployees(
    numberOfEmployees: number,
  ): AccountBuilder {

    this.account.NumberOfEmployees =
      numberOfEmployees;

    return this;
  }

  withDescription(
    description: string,
  ): AccountBuilder {

    this.account.Description =
      description;

    return this;
  }

  withBillingStreet(
    billingStreet: string,
  ): AccountBuilder {

    this.account.BillingStreet =
      billingStreet;

    return this;
  }

  withBillingCity(
    billingCity: string,
  ): AccountBuilder {

    this.account.BillingCity =
      billingCity;

    return this;
  }

  withBillingState(
    billingState: string,
  ): AccountBuilder {

    this.account.BillingState =
      billingState;

    return this;
  }

  withBillingPostalCode(
    billingPostalCode: string,
  ): AccountBuilder {

    this.account.BillingPostalCode =
      billingPostalCode;

    return this;
  }

  withBillingCountry(
    billingCountry: string,
  ): AccountBuilder {

    this.account.BillingCountry =
      billingCountry;

    return this;
  }

  build(): Account {

    return this.account;
  }
}