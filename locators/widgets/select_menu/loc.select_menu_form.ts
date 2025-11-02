export const SelectMenuFormLocators = {

    // Select Menu Container
    select_menu_container: '#selectMenuContainer',

    // Select Value
    select_value_dropdown: '#withOptGroup',
    select_value_option_group_1_option_1: '//div[contains(@id, "react-select-2-option") and text()="Group 1, option 1"]',
    select_value_option_group_1_option_2: '//div[contains(@id, "react-select-2-option") and text()="Group 1, option 2"]',
    select_value_option_group_2_option_1: '//div[contains(@id, "react-select-2-option") and text()="Group 2, option 1"]',
    select_value_option_group_2_option_2: '//div[contains(@id, "react-select-2-option") and text()="Group 2, option 2"]',
    select_value_a_root_option: '//div[contains(@id, "react-select-2-option") and text()="A root option"]',
    select_value_another_root_option: '//div[contains(@id, "react-select-2-option") and text()="Another root option"]',

    // Select One
    select_value_one_dropdown: '#selectOne',
    select_value_one_option_dr: '//div[contains(@id, "react-select-3-option") and text()="Dr."]',
    select_value_one_option_mr: '//div[contains(@id, "react-select-3-option") and text()="Mr."]',
    select_value_one_option_ms: '//div[contains(@id, "react-select-3-option") and text()="Ms."]',
    select_value_one_option_mrs: '//div[contains(@id, "react-select-3-option") and text()="Mrs."]',
    select_value_one_option_prof: '//div[contains(@id, "react-select-3-option") and text()="Prof."]',  
    select_value_one_option_other: '//div[contains(@id, "react-select-3-option") and text()="Other"]',   

    // Old Style Select Menu
    old_style_select_menu_dropdown: '#oldSelectMenu',


    // Multi Select DropDown
    multi_select_dropdown: '//b[text()="Multiselect drop down"]/following::div[contains(text(),"Select...")]',


    // Multi Select Cars
    multi_select_cars: '#cars',

}