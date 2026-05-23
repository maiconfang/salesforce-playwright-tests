import { test } from '@playwright/test';

import { LeadsPage } from '@pages/LeadsPage';
import { leadTestData } from '@data/leads';

test.describe('Search Component', () => {
    test.skip('should search lead using reusable search component', async ({ page }) => {
        const leadsPage = new LeadsPage(page);

        await leadsPage.open();

        await leadsPage.openLeads();

        // await leadsPage.searchGlobalComponent.searchByText(
        //     leadTestData.firstName,
        // );

        // Logger.debug("Search text:", leadTestData.firstName);

        // await leadsPage.searchGlobalComponent.expectSearchResultVisible(
        //     leadTestData.firstName,
        // );

    });
});