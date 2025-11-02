import { Page } from '@playwright/test';
import { SelectMenuFormLocators as Loc } from '../../../locators/widgets/select_menu/loc.select_menu_form.ts';
import { expect } from '../../baseTest.ts';
import * as utils from '../../genericUtilities.ts';

// Select Menu Form option selection
export async function selectMenuOption(page: Page, menuKey: 'selectValue' | 'selectOne' , value: string) {
  let dropdownLocator: string;
  let optionKey: keyof typeof Loc | undefined;

  // Skip if no menuKey or value provided
  if(!menuKey || !value) {
    console.log(`No menuKey ${menuKey} or value ${value} provided, skipping selection.`);
    return;
  }
  
  // Determine locators based on menu type
  if (menuKey === 'selectValue') {
    dropdownLocator = Loc.select_value_dropdown;
    optionKey = selectValueMap[value];
  } else {
    dropdownLocator = Loc.select_value_one_dropdown;
    optionKey = selectOneMap[value];
  } 
  
  // Error handling for unmapped values
  if (!optionKey) throw new Error(`No locator found for value: ${value}`);

  // Perform selection
  await page.locator(dropdownLocator).click({ force: true });
  await utils.clickElement(page, Loc[optionKey]);
}

// Mappings for selectValue options
const selectValueMap: Record<string, keyof typeof Loc> = {
  'Group 1, option 1': 'select_value_option_group_1_option_1',
  'Group 1, option 2': 'select_value_option_group_1_option_2',
  'Group 2, option 1': 'select_value_option_group_2_option_1',
  'Group 2, option 2': 'select_value_option_group_2_option_2',
  'A root option': 'select_value_a_root_option',
  'Another root option': 'select_value_another_root_option',
};

// Mappings for selectOne options
const selectOneMap: Record<string, keyof typeof Loc> = {
  'Dr.': 'select_value_one_option_dr',
  'Mr.': 'select_value_one_option_mr',
  'Ms.': 'select_value_one_option_ms',
  'Mrs.': 'select_value_one_option_mrs',
  'Prof.': 'select_value_one_option_prof',
  'Other': 'select_value_one_option_other',
};

// Multi-Select option selection
export async function selectMultiOption(page: Page, dropdownSelector: string, options: string[]) {
  const dropdown = page.locator(dropdownSelector);

  // Skip if no options provided
  if(!options || options.length === 0) {
      console.log('No options provided, skipping multi-selection.');
      return;
    }

  // Click to open the dropdown
  await dropdown.click({ force: true });

  for (const option of options) {
    // Locate and click the option text dynamically
    const optionLocator = page.locator(`//div[contains(@id, "react-select") and text()="${option}"]`);

    await optionLocator.waitFor({ state: 'visible', timeout: 3000 });
    await optionLocator.click();
  }

  // Optional: click outside to close the dropdown
  await page.keyboard.press('Escape');
}

// Select Cars from multi-select dropdown
export async function selectCars(page: Page, dropdownSelector: string, options: string[]) {
  const dropdown = page.locator(dropdownSelector);
  
  // Skip if no option is provided
  if(!options || options.length === 0) {
    console.log('No options provided, skipping car selection.');
    return;
  }

  await dropdown.selectOption(options.map(label => ({ label })));

  // Verification
  const selected = await page.locator(`${dropdownSelector} option:checked`).allInnerTexts();
  await expect(selected.sort()).toEqual(options.sort());
}


