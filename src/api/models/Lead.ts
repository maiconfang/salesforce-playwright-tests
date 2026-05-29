/**
 * Salesforce Lead entity.
 *
 * Represents the business data used by:
 * - API tests
 * - UI tests
 * - Hybrid workflows
 * - Builders
 * - Validation helpers
 */
export interface Lead {

  Salutation?: string;

  FirstName?: string;

  LastName: string;

  Company: string;

  Title?: string;

  Email?: string;

  Phone?: string;

  MobilePhone?: string;

  Fax?: string;

  Website?: string;

  Street?: string;

  City?: string;

  State?: string;

  PostalCode?: string;

  Country?: string;

  Description?: string;

  LeadSource?: string;

  Industry?: string;

  AnnualRevenue?: number;

  NumberOfEmployees?: number;
}