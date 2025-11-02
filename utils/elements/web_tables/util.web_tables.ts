import { Page, expect } from '@playwright/test';
import { WebTablesFormLocators as Loc } from '../../../locators/elements/web_tables/loc.web_tables_form.ts';
import * as utils from '../../genericUtilities.ts';

// Edit Web Table Record by Index
export async function editRecordByIndex(page: Page, index: number) {
  await utils.clickElement(page, Loc.edit_button_by_index(index));
}

// Update Web Table records with new data
export async function updateRecord(page: Page, updatedData: any) {
  await utils.fillTextField(page, Loc.first_name_input, updatedData.updatedFirstName);
  await utils.fillTextField(page, Loc.last_name_input, updatedData.updatedLastName);
  await utils.fillTextField(page, Loc.email_input, updatedData.updatedEmail);
  await utils.fillTextField(page, Loc.age_input, updatedData.updatedAge);
  await utils.fillTextField(page, Loc.salary_input, updatedData.updatedSalary);
  await utils.fillTextField(page, Loc.department_input, updatedData.updatedDepartment);
  await utils.clickElement(page, Loc.submit_button);
}

// Verify that the record has been updated correctly
export async function verifyRecordUpdateByIndex(page: Page, index: number, expectedData: any) {
  const row = page.locator(Loc.table_rows).nth(index - 1);

  // Wait for the row to exist and stabilize
  await row.waitFor({ state: 'visible' });

  // Define the column order in the table
  const columns = [
    expectedData.updatedFirstName,
    expectedData.updatedLastName,
    expectedData.updatedAge,
    expectedData.updatedEmail,
    expectedData.updatedSalary,
    expectedData.updatedDepartment,
  ];

  // Loop through each cell by index and verify
  for (let i = 0; i < columns.length; i++) {
    const expectedValue = columns[i].toString();
    const cell = row.locator('.rt-td').nth(i);

    // Wait until the cell text matches (with retry)
    await expect.poll(async () => (await cell.textContent())?.trim(), { timeout: 5000 }).toBe(expectedValue);

  }
}


