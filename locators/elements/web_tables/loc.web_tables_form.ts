export const WebTablesFormLocators = {

    // Web Tables Form Container
    web_tables_form_wrapper: '.web-tables-wrapper',

    // Web Tables elements
    table_rows: '.rt-tr-group',
    edit_button_by_index: (index: number) =>`#edit-record-${index}`,
    delete_button_by_index: (index: number) =>`#delete-record-${index}`,

    // Registration Form fields
    first_name_input: '#firstName',
    last_name_input: '#lastName',
    email_input: '#userEmail',
    age_input: '#age',
    salary_input: '#salary',
    department_input: '#department',
    submit_button: '#submit',
};