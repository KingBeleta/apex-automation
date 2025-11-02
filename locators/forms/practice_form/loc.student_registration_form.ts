export const StudentFormLocators = {

  // Student Registration Form Container
  student_registration_form_wrapper: '.practice-form-wrapper',

  // Basic Information
  firstName_input_field: '#firstName',
  lastName_input_field: '#lastName',
  email_input_field: '#userEmail',
  mobile_number_input_field: '#userNumber',

  // Gender Radio Buttons
  gender_male_radio_button: 'label[for="gender-radio-1"]',
  gender_female_radio_button: 'label[for="gender-radio-2"]',
  gender_other_radio_button: 'label[for="gender-radio-3"]',

  // Date Picker
  date_of_birth_input: '#dateOfBirthInput',
  date_picker: '.react-datepicker',
  date_picker_month_select: '.react-datepicker__month-select',
  date_picker_year_select: '.react-datepicker__year-select',

  // Subjects
  subjects_input_field: '#subjectsInput',

  // Hobbies
  hobbies_sports_checkbox: '//label[@for="hobbies-checkbox-1"][text()="Sports"]',
  hobbies_reading_checkbox: '//label[@for="hobbies-checkbox-2"][text()="Reading"]',
  hobbies_music_checkbox: '//label[@for="hobbies-checkbox-3"][text()="Music"]',

  // Picture Upload
  upload_picture_input: 'input#uploadPicture',

  // Current Address
  current_address_textarea: '#currentAddress',

  select_state: '#state',
  state_dropdown_option_ncr: '//div[contains(@id, "react-select-3-option") and text()="NCR"]',
  state_dropdown_option_uttar: '//div[contains(@id, "react-select-3-option") and text()="Uttar Pradesh"]',
  state_dropdown_option_harayana: '//div[contains(@id, "react-select-3-option") and text()="Haryana"]',
  state_dropdown_option_rajasthan: '//div[contains(@id, "react-select-3-option") and text()="Rajasthan"]',

  city_dropdown: '#city',
  // City options under NCR
  city_dropdown_option_delhi: '//div[contains(@id, "react-select-4-option") and text()="Delhi"]',
  city_dropdown_option_gurgaon: '//div[contains(@id, "react-select-4-option") and text()="Gurgaon"]',
  city_dropdown_option_noida: '//div[contains(@id, "react-select-4-option") and text()="Noida"]',

  // City options under Uttar Pradesh
  city_dropdown_option_agra: '//div[contains(@id, "react-select-4-option") and text()="Agra"]',
  city_dropdown_option_lucknow: '//div[contains(@id, "react-select-4-option") and text()="Lucknow"]',
  city_dropdown_option_merrut: '//div[contains(@id, "react-select-4-option") and text()="Merrut"]',

  // City options under Haryana
  city_dropdown_option_karnal: '//div[contains(@id, "react-select-4-option") and text()="Karnal"]',
  city_dropdown_option_panipat: '//div[contains(@id, "react-select-4-option") and text()="Panipat"]',

  // City options under Rajasthan
  city_dropdown_option_jaipur: '//div[contains(@id, "react-select-4-option") and text()="Jaipur"]',
  city_dropdown_option_jaisalmer: '//div[contains(@id, "react-select-4-option") and text()="Jaisalmer"]',

  // Submit Button
  submit_button: '#submit',

  // Modal Dialog
  modal_dialog: '.modal-content',
  student_name_modal_field: '//td[text()="Student Name"]',
  student_name_modal_field_value: '//td[text()="Student Name"]/following-sibling::td',
  student_email_modal_field: '//td[text()="Student Email"]',
  student_email_modal_field_value: '//td[text()="Student Email"]/following-sibling::td',
  student_gender_modal_field: '//td[text()="Gender"]',
  student_gender_modal_field_value: '//td[text()="Gender"]/following-sibling::td',
  student_mobile_modal_field: '//td[text()="Mobile"]',
  student_mobile_modal_field_value: '//td[text()="Mobile"]/following-sibling::td',
  student_date_of_birth_modal_field: '//td[text()="Date of Birth"]',
  student_date_of_birth_modal_field_value: '//td[text()="Date of Birth"]/following-sibling::td',
  student_subjects_modal_field: '//td[text()="Subjects"]',
  student_subjects_modal_field_value: '//td[text()="Subjects"]/following-sibling::td',
  student_hobbies_modal_field: '//td[text()="Hobbies"]',
  student_hobbies_modal_field_value: '//td[text()="Hobbies"]/following-sibling::td',
  student_picture_modal_field: '//td[text()="Picture"]',
  student_picture_modal_field_value: '//td[text()="Picture"]/following-sibling::td',
  student_address_modal_field: '//td[text()="Address"]',
  student_address_modal_field_value: '//td[text()="Address"]/following-sibling::td',
  student_state_and_city_modal_field: '//td[text()="State and City"]',
  student_state_and_city_modal_field_value: '//td[text()="State and City"]/following-sibling::td',
  modal_close_button: '#closeLargeModal',

};
