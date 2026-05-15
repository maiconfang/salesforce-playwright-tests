import { test } from '@playwright/test';
import { LeadsPage } from '@pages/LeadsPage';
import { createLeadCancelTestData, leadTestData } from '@data/leads';

// Legacy relative imports kept as reference after migrating to TypeScript path aliases.
// Replaced with cleaner and more maintainable aliases such as:
// @pages/LeadsPage
// @data/leads

// import { LeadsPage } from '../../pages/LeadsPage';
// import { leadTestData } from '../../test-data/leads';

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

    const leadCancelTestData = createLeadCancelTestData();

    await leadsPage.navigate();

    await leadsPage.openLeads();

    await leadsPage.openNewLeadForm();

    await leadsPage.waitToastToDisappear();

    await leadsPage.fillLeadForm(leadCancelTestData);

    await leadsPage.cancelAndCloseModal();

    await leadsPage.searchGlobalComponent.searchByText(
      leadCancelTestData.lastName,
    );

    await leadsPage.expectGlobalSearchNoResults(leadCancelTestData.lastName);
  });

});