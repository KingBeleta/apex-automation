import { Page, expect } from '@playwright/test';
import { StudentFormLocators as Loc } from '../../../locators/forms/practice_form/loc.student_registration_form.ts';
import * as utils from '../../genericUtilities.ts';
import path from 'path';

// Gender selection
export async function selectGender(page: Page, gender: string) {
  const genderMap: Record<string, string> = {
    Male: Loc.gender_male_radio_button,
    Female: Loc.gender_female_radio_button,
    Other: Loc.gender_other_radio_button,
  };

  const genderSelector = genderMap[gender];
  if (!genderSelector) throw new Error(`Invalid gender: ${gender}`);
  await page.click(genderSelector);
}

// Month name to month value mapping
const monthMap = Object.fromEntries(
  Array.from({ length: 12 }, (_, i) => [
    new Date(0, i).toLocaleString('en-US', { month: 'long' }),
    i.toString(),
  ])
);

// Student Registration Form datepicker
export async function selectDateOfBirth(page: Page, month: string, year: string, day: string) {
  await utils.clickElement(page, Loc.date_of_birth_input);

  // Wait until datepicker is visible before interacting
  await page.waitForSelector(Loc.date_picker);

  // Convert month name to numeric value
  const monthValue = monthMap[month];
  if (monthValue === undefined) {
    throw new Error(`Invalid month name: ${month}`);
  }
  
  // Select month and year from dropdowns
  await page.selectOption(Loc.date_picker_month_select, monthValue);
  await page.selectOption(Loc.date_picker_year_select, year);

  // Click the correct day (avoiding days from other months)
  const dayNumber = parseInt(day, 10);
  const daySelector = `.react-datepicker__day:not(.react-datepicker__day--outside-month):has-text("${dayNumber}")`;
  await page.click(daySelector);

}

// Student Registration Form subject input
export async function selectSubject(page: Page, subjects: string[]) {
  const selector = Loc.subjects_input_field;
  const input = page.locator(selector);

  // Skip if no subjects provided
  if(!subjects || subjects.length === 0) {
    console.log('No subjects provided, skipping selection.');
    return; 
  }

  // Select each subject
  for (const subject of subjects) {
    
    // Click the input to open the dropdown
    await input.click();

    // Type the subject text (autocomplete should filter)
    await input.fill(subject);

    // Wait for the option to appear
    const option = page.locator(`.subjects-auto-complete__option:has-text("${subject}")`);
    await option.waitFor({ state: 'visible' });

    // Click the matching option instead of pressing ArrowDown/Enter
    await option.click();
  }
}

// Student Registration Form hobbies selection
export async function selectHobbies(page: Page, hobbies: string[]) {
  // Map hobby names to locators
  const hobbyMap: Record<string, string> = {
    Sports: Loc.hobbies_sports_checkbox,
    Reading: Loc.hobbies_reading_checkbox,
    Music: Loc.hobbies_music_checkbox,
  };

  // Skip if no hobbies provided
  if(!hobbies || hobbies.length === 0) {
    console.log('No hobbies provided, skipping selection.');
    return; 
  }
  
  // Select each hobby
  for (const hobby of hobbies) {
    const hobbySelector = hobbyMap[hobby];
    if (!hobbySelector) throw new Error(`Invalid hobby: ${hobby}`);
    await page.click(hobbySelector);
  }
}

export async function uploadStudentPicture(page: Page, pictureFileName: string) {
  const filePath = path.resolve(process.cwd(), `test_data/forms/practice_form/pictures/${pictureFileName}`);

  // Find the hidden input directly linked to the label
  const fileInput = page.locator(Loc.upload_picture_input);

  // Skip if no picture provided
  if(!pictureFileName) {
    console.log('No picture provided, skipping upload.');
    return;
  }
  
  // Upload the file
  await fileInput.setInputFiles(filePath);
}

export async function selectDropdownOption(page: Page, dropdownKey: 'state' | 'city', value: string) {
  const dropdownLocator = dropdownKey === 'state' ? Loc.select_state : Loc.city_dropdown;
  
  // Skip if no value provided
  if(!dropdownKey || !value) {
    console.log(`No ${dropdownKey} or value provided, skipping selection.`);
    return;
  }

  await utils.clickElement(page, dropdownLocator);

  // Map value to locator key
  const optionKey = dropdownKey === 'state' ? stateMap[value] : cityMap[value];
  if (!optionKey) throw new Error(`No locator found for ${value}`);

  // Click the option
  await utils.clickElement(page, Loc[optionKey]);
}

// State dropdown option mappings
const stateMap: Record<string, keyof typeof Loc> = {
  'NCR': 'state_dropdown_option_ncr',
  'Uttar Pradesh': 'state_dropdown_option_uttar',
  'Haryana': 'state_dropdown_option_harayana',
  'Rajasthan': 'state_dropdown_option_rajasthan',
};

// City dropdown option mappings
const cityMap: Record<string, keyof typeof Loc> = {
  'Delhi': 'city_dropdown_option_delhi',
  'Gurgaon': 'city_dropdown_option_gurgaon',
  'Noida': 'city_dropdown_option_noida',
  'Agra': 'city_dropdown_option_agra',
  'Lucknow': 'city_dropdown_option_lucknow',
  'Merrut': 'city_dropdown_option_merrut',
  'Karnal': 'city_dropdown_option_karnal',
  'Panipat': 'city_dropdown_option_panipat',
  'Jaipur': 'city_dropdown_option_jaipur',
  'Jaisalmer': 'city_dropdown_option_jaisalmer',
};

// Verify submitted student data in the modal dialog
export async function verifySubmittedData(page: Page, student: any) {
  try {

    // Wait for modal to appear
    await expect(page.locator(Loc.modal_dialog)).toBeVisible();

    // Prepare expected values
    const expectedFullName = `${student.firstName} ${student.lastName}`;
    const actualDobRaw = await page.locator(Loc.student_date_of_birth_modal_field_value).innerText();
    const actualDob = actualDobRaw.replace(/^0/, '').replace(/\s*,\s*/g, ',').trim();
    const expectedDob = `${parseInt(student.dateOfBirth, 10)} ${student.monthOfBirth},${student.yearOfBirth}`.replace(/\s*,\s*/g, ',').trim();
    const expectedSubjects = Array.isArray(student.subjects) ? student.subjects.join(', ') : student.subjects;
    const expectedHobbies = Array.isArray(student.hobbies) ? student.hobbies.join(', ') : student.hobbies;
    const expectedStateCity = `${student.state} ${student.city}`;

    // Assertions
    await expect(page.locator(Loc.student_name_modal_field_value)).toHaveText(expectedFullName);
    await expect(page.locator(Loc.student_email_modal_field_value)).toHaveText(student.email);
    await expect(page.locator(Loc.student_gender_modal_field_value)).toHaveText(student.gender);
    await expect(page.locator(Loc.student_mobile_modal_field_value)).toHaveText(student.mobile);
    await expect(actualDob).toContain(expectedDob);
    await expect(page.locator(Loc.student_subjects_modal_field_value)).toHaveText(expectedSubjects);
    await expect(page.locator(Loc.student_hobbies_modal_field_value)).toHaveText(expectedHobbies);
    await expect(page.locator(Loc.student_picture_modal_field_value)).toHaveText(student.picture);
    await expect(page.locator(Loc.student_address_modal_field_value)).toHaveText(student.current_address_textarea);
    await expect(page.locator(Loc.student_state_and_city_modal_field_value)).toHaveText(expectedStateCity);

  } catch (err) {
    console.error(`Verification failed for ${student.firstName} ${student.lastName}:`, err);
  }
}