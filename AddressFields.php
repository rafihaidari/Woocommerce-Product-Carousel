<?php
$handle = 'wc-country-select';
wp_enqueue_script($handle, get_site_url() . '/wp-content/plugins/woocommerce/assets/js/frontend/country-select.min.js', array('jquery'), true);

function callAddressFields($type, $selectedCountry, $selectedState)
{
    $countries_obj = new WC_Countries();
    $countries = $countries_obj->get_allowed_countries();

    $field = [
        'type' => 'country',
        // 'label' => 'Country',
        'required' => 1,
        'class' => ['address-field'],
    ];
    // woocommerce_form_field($type.'_country', $field, $selectedCountry);
    woocommerce_form_field($type . '_country', $field, 'US');

    $field = [
        'type' => 'state',
        // 'label' => 'State',
        'required' => 1,
        'class' => ['address-field'],
        'validate' => ['state']
    ];
    // woocommerce_form_field($type.'_state', $field, $selectedState);
    woocommerce_form_field($type . '_state', $field, 'TX');


    
}
