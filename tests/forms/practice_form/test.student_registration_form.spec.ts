import { test, expect } from '../../../utils/baseTest.ts';
import data from '../../../test_data/forms/practice_form/td.studentData.json';
import * as utils from '../../../utils/genericUtilities.ts';
import * as srfUtils from '../../../utils/forms/practice_form/util.student_registration_form.ts';
import { StudentFormLocators as Loc } from '../../../locators/forms/practice_form/loc.student_registration_form.ts';

test.describe.serial('Forms_PracticeForm_Student_Registration_Tests', () => {

  // Loop all over student data
  for (const student of data) {

    const testName = `Forms_PracticeForm_Student_Registration_Test_for_${student.firstName}_${student.lastName}`;

    test(testName, async ({ page }, testInfo) => {

      // Navigate to the Student Form page 
      await page.goto('/automation-practice-form', { timeout: 30000 });
      await expect(page.locator(Loc.student_registration_form_wrapper)).toBeVisible();

      // Remove ads
      await utils.removeAds(page);

      // Fill basic information
      await utils.fillTextField(page, Loc.firstName_input_field, student.firstName);
      await utils.fillTextField(page, Loc.lastName_input_field, student.lastName);
      await utils.fillTextField(page, Loc.email_input_field, student.email);

      // Gender
      await srfUtils.selectGender(page, student.gender);

      // Mobile
      await utils.fillTextField(page, Loc.mobile_number_input_field, student.mobile);

      // Date of Birth
      await srfUtils.selectDateOfBirth(page, student.monthOfBirth, student.yearOfBirth, student.dateOfBirth);

      // Subjects
      await srfUtils.selectSubject(page, student.subjects);

      // Hobbies
      await srfUtils.selectHobbies(page, student.hobbies);

      // Picture
      await srfUtils.uploadStudentPicture(page, student.picture);

      // Address
      await utils.fillTextField(page, Loc.current_address_textarea, student.current_address_textarea);

      // State & City
      await srfUtils.selectDropdownOption(page, "state", student.state);
      await srfUtils.selectDropdownOption(page, "city", student.city);

      // Submit
      await utils.clickElement(page, Loc.submit_button);

      // Verification of submitted data
      await srfUtils.verifySubmittedData(page, student);

      // Screenshot
      await page.screenshot({ path: `test-results/screenshots/${testInfo.title.replace(/\s+/g, '_')}.png` });

      // Close the modal
      await page.click(Loc.modal_close_button);
      await expect(page.locator(Loc.modal_dialog)).toBeHidden();

    });
  }
});




