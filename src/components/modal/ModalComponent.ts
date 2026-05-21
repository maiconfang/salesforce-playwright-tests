import { expect, Page } from "@playwright/test";
import { BaseComponent } from "@components/BaseComponent";

/**
 * ModalComponent
 *
 * Responsibility:
 * - Handle Salesforce modal behavior
 * - Open and close modal actions
 * - Validate modal visibility
 *
 * Benefits:
 * - Reusable modal behavior
 * - Cleaner page objects
 * - Better maintainability
 * - Enterprise-style architecture
 */
export class ModalComponent extends BaseComponent {

    constructor(page: Page) {
        super(page);
    }

    /**
     * Validates modal heading visibility.
     */
    async expectHeadingVisible(
        heading: string,
    ): Promise<void> {

        await expect(
            this.page.getByRole("heading", {
                name: heading,
            }),
        ).toBeVisible();
    }

    /**
     * Clicks modal cancel button.
     */
    async cancel(): Promise<void> {

        const cancelButton =
            this.page.getByRole("button", {
                name: "Cancel",
                exact: true,
            });

        await expect(cancelButton)
            .toBeVisible();

        await this.uiActionsComponent.click(cancelButton);

        await cancelButton.click();
    }
}

