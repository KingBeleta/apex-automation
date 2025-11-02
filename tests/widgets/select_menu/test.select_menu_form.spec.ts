import { test, expect } from '../../../utils/baseTest.ts';
import data from '../../../test_data/widgets/select_menu/td.selectMenuData.json';
import * as utils from '../../../utils/genericUtilities.ts';
import * as srfUtils from '../../../utils/widgets/select_menu/util.select_menu_form.ts';
import { SelectMenuFormLocators as Loc } from '../../../locators/widgets/select_menu/loc.select_menu_form.ts';

test.describe.serial('Widgets_Select_Menu_Form_Tests', () => {

  // Loop all over select-menu data combinations
  for (const dataCombination of data) {

    const testName = `Widgets_Select_Menu_Test_for_Data_Combination_${dataCombination.dataSet}`;

    test(testName, async ({ page }, testInfo) => {
      
      // Navigate to Select Menu Form page
      await page.goto('/select-menu', { timeout: 30000 });
      await expect(page.locator(Loc.select_menu_container)).toBeVisible();

      // Remove ads
      await utils.removeAds(page);

      // Select Value/Option
      await srfUtils.selectMenuOption(page, 'selectValue', dataCombination.selectValue);

      // Select One/Title
      await srfUtils.selectMenuOption(page, 'selectOne', dataCombination.selectOne);

      // Old Style Select Menu
      const oldStyleDropdown = page.locator(Loc.old_style_select_menu_dropdown);
      await oldStyleDropdown.selectOption({ label: dataCombination.oldStyleSelectMenu });

      // Multi Select DropDown
      await srfUtils.selectMultiOption(page, Loc.multi_select_dropdown, dataCombination.multiSelectDropDown);

      // Standard Multi Select Cars
      await srfUtils.selectCars(page, Loc.multi_select_cars, dataCombination.standardMultiSelect);

      // ScreenShot after selections
      await page.screenshot({ path: `test-results/screenshots/${testName.replace(/\s+/g, '_')}.png`, });

    });
  }
});
