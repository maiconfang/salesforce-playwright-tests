import { LeadData } from "src/models/LeadData";

export const leadTestData: LeadData = {
  salutation: 'Mr.',
  firstName: 'User',
  lastName: 'Name',
  company: 'IT QA',
  email: 'user.name@gmail.com',
  phone: '2324255',
  title: 'QA',
  rating: 'Hot',
  addressSearch: 'Moncton',
  addressOption: 'Moncton NB, Canada',
  city: 'Moncton',
  stateProvince: 'NB',
  country: 'Canada',
  street: '999 Main',
  postalCode: 'AWP 875',
  numberOfEmployees: '5',
  leadSource: 'Web',
  annualRevenue: '8000',
  industry: 'Other',
  description: 'Description hi',
};

export function createLeadCancelTestData(): LeadData {
  const uniqueId = Date.now();

  return {
    salutation: 'Mr.',
    firstName: 'Cancel',
    lastName: `Lead-${uniqueId}`,
    company: 'Cancel QA',
    email: `cancel.${uniqueId}@gmail.com`,
    phone: '5551234',
    title: 'QA Cancel Test',
    rating: 'Warm',
    addressSearch: 'Moncton',
    addressOption: 'Moncton NB, Canada',
    city: 'Moncton',
    stateProvince: 'NB',
    country: 'Canada',
    street: '100 Cancel Street',
    postalCode: 'E1A 1A1',
    numberOfEmployees: '10',
    leadSource: 'Web',
    annualRevenue: '1000',
    industry: 'Technology',
    description: 'Lead used for cancel validation test',
  };
}