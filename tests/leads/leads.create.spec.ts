import { test } from '@playwright/test';
import { LeadsPage } from '../../pages/LeadsPage';
import { leadTestData } from '../../test-data/leads';

test.describe('Leads Create', () => {

  test('should create a new lead', async ({ page }) => {
    const leadsPage = new LeadsPage(page);

    await leadsPage.navigate();

    await leadsPage.openLeads();

    await leadsPage.createLead(leadTestData);

    await leadsPage.expectLeadCreated(leadTestData);
  });

  test('should display validation errors when required fields are empty', async ({
    page,
  }) => {
    const leadsPage = new LeadsPage(page);

    await leadsPage.navigate();

    await leadsPage.openLeads();

    await leadsPage.openNewLeadForm();

    await leadsPage.waitToastToDisappear();

    await leadsPage.saveLead();

    await leadsPage.expectValidationErrors([
      'Name',
      'Company',
    ]);
  });

  test('should cancel lead creation without saving data', async ({ page }) => {
    const leadsPage = new LeadsPage(page);

    await leadsPage.navigate();

    await leadsPage.openLeads();

    await leadsPage.openNewLeadForm();

    await leadsPage.waitToastToDisappear();

    await leadsPage.fillLeadForm(leadTestData);

    await leadsPage.cancelAndCloseModal();

    await leadsPage.searchLead(leadTestData.lastName);

    await leadsPage.expectEmptyState();
  });

});