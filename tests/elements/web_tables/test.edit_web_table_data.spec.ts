import { test, expect } from '../../../utils/baseTest.ts';
import data from '../../../test_data/elements/web_tables/td.webTableData.json';
import * as webTablesUtils from '../../../utils/elements/web_tables/util.web_tables.ts';
import { WebTablesFormLocators as Loc } from '../../../locators/elements/web_tables/loc.web_tables_form.ts';
import * as utils from '../../../utils/genericUtilities.ts';

test.describe.serial('Elements_Web_Tables_Edit_And_Verify_Tests', () => {

  // Loop all over web table data
  for (const record of data) {
    
    const testName = `Elements_Web_Tables_Edit_And_Verify_Test_for_Record_#${record.rowIndex}`;

    test(testName, async ({ page }, testInfo) => {

      // Navigate to Web Tables page
      await page.goto('/webtables', { timeout: 30000 });
      await expect(page.locator(Loc.web_tables_form_wrapper)).toBeVisible();

      // Remove ads
      await utils.removeAds(page);

      // Edit by index
      await webTablesUtils.editRecordByIndex(page, record.rowIndex);

      // Update and submit
      await webTablesUtils.updateRecord(page, record);

      // Wait for DOM to stabilize
      await utils.waitForStableDOM(page);

      // Verify changes in same row
      await webTablesUtils.verifyRecordUpdateByIndex(page, record.rowIndex, record);

      // Screenshot
      await page.screenshot({ path: `test-results/screenshots/${testInfo.title.replace(/\s+/g, '_')}.png` });
    });
  }
});
