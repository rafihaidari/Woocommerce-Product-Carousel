<?php
/*
* @package wooCommerce-product-carousel
*/


defined('ABSPATH') or die('Hey, you can\'t access this page!');

class CustomizeCheckout
{

    function __construct()
    {
        // add_action('wp_head', 'get_wordpress_ajaxurl');
        // function get_wordpress_ajaxurl()
        // {

        //     echo '<script type="text/javascript">
        //    var ajaxurl = "' . admin_url('admin-ajax.php') . '";
        //    var currentUserID = "' . get_current_user_id() . '";
        //    var Site_url = "' . site_url() . '";
        //  </script>';
        // }

        add_action('wp_ajax_nopriv_save_location_data', 'save_location_data');
        add_action('wp_ajax_save_location_data', 'save_location_data');
        function save_location_data()
        {
            $user_id = get_current_user_id();
            $first_name = $_POST['data']['account_first_name'];
            $last_name = $_POST['data']['account_last_name'];
            $address = $_POST['data']['account_address'];
            $shipping_city = $_POST['data']['account_shipping_city'];
            $shipping_country = $_POST['data']['account_shipping_country'];
            $shipping_state = $_POST['data']['account_shipping_state'];
            $phone = $_POST['data']['account_phone'];

            update_user_meta($user_id, 'shipping_first_name', sanitize_text_field($first_name));
            update_user_meta($user_id, 'shipping_last_name', sanitize_text_field($last_name));
            update_user_meta($user_id, 'shipping_address_1', sanitize_text_field($address));
            update_user_meta($user_id, 'shipping_city', sanitize_text_field($shipping_city));
            update_user_meta($user_id, 'shipping_country', sanitize_text_field($shipping_country));
            update_user_meta($user_id, 'shipping_state', sanitize_text_field($shipping_state));
            update_user_meta($user_id, 'shipping_phone', sanitize_text_field($phone));
        }

        add_action('wp_ajax_nopriv_save_billing_address', 'save_billing_address');
        add_action('wp_ajax_save_billing_address', 'save_billing_address');
        function save_billing_address()
        {
            $user_id = get_current_user_id();
            $first_name = $_POST['data']['billing_first_name'];
            $last_name = $_POST['data']['billing_last_name'];
            $address = $_POST['data']['billing_address'];
            $billing_city = $_POST['data']['billing_city'];
            $billing_country = $_POST['data']['billing_country'];
            $billing_state = $_POST['data']['billing_state'];
            $phone = $_POST['data']['billing_phone'];

            update_user_meta($user_id, 'billing_first_name', sanitize_text_field($first_name));
            update_user_meta($user_id, 'billing_last_name', sanitize_text_field($last_name));
            update_user_meta($user_id, 'billing_address_1', sanitize_text_field($address));
            update_user_meta($user_id, 'billing_city', sanitize_text_field($billing_city));
            update_user_meta($user_id, 'billing_country', sanitize_text_field($billing_country));
            update_user_meta($user_id, 'billing_state', sanitize_text_field($billing_state));
            update_user_meta($user_id, 'billing_phone', sanitize_text_field($phone));
        }


        add_filter('woocommerce_checkout_fields', 'custom_override_checkout_fields');

        function custom_override_checkout_fields($fields)
        {
            // unset($fields['billing']['billing_first_name']);
            // unset($fields['billing']['billing_last_name']);
            unset($fields['billing']['billing_company']);
            // unset($fields['billing']['billing_address_1']);
            unset($fields['billing']['billing_address_2']);
            unset($fields['billing']['billing_city']);
            unset($fields['billing']['billing_postcode']);
            unset($fields['billing']['billing_country']);
            // unset($fields['billing']['billing_state']);
            // unset($fields['billing']['billing_phone']);
            // unset($fields['billing']['billing_email']);

            unset($fields['shipping']['shipping_company']);
            unset($fields['shipping']['shipping_address_2']);
            unset($fields['shipping']['shipping_postcode']);
            unset($fields['shipping']['shipping_country']);
            // unset($fields['shipping']['shipping_state']);
            unset($fields['shipping']['shipping_city']);

            return $fields;
        }
    }
}
