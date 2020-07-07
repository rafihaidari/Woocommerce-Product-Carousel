<?php
/*
* @package wooCommerce-product-carousel
*/
if (!defined('ABSPATH')) {
    die;
}

class MiscFunctions
{
    function __construct()
    {

        add_filter('woocommerce_ship_to_different_address_checked', '__return_true');

        function ajax_check_user_logged_in()
        {
            if ($_POST['param'] !== 'gift') {
                global $woocommerce;
                $woocommerce->cart->empty_cart();
            }

            if (is_user_logged_in()) {
                echo 'yes';
            } else {
                echo 'no';
            }
            die();
        }
        add_action('wp_ajax_is_user_logged_in', 'ajax_check_user_logged_in');
        add_action('wp_ajax_nopriv_is_user_logged_in', 'ajax_check_user_logged_in');

        function get_cart_total()
        {
            $result = array();
            global $woocommerce;
            array_push(
                $result,
                $woocommerce->cart->total,
                $woocommerce->cart->tax_total,
                $woocommerce->cart->cart_contents
            );
            print_r(json_encode($result));
            wp_die();
        }
        add_action('wp_ajax_get_cart_total', 'get_cart_total');
        add_action('wp_ajax_nopriv_get_cart_total', 'get_cart_total');


        add_filter('woocommerce_checkout_fields', 'wc_shippping_phone');

        // Our hooked in function - $fields is passed via the filter!
        function wc_shippping_phone($fields)
        {
            $fields['shipping']['shipping_phone'] = array(
                'label'     => __('Phone', 'woocommerce'),
                'placeholder'   => _x('Phone', 'placeholder', 'woocommerce'),
                'required'  => true,
                'class'     => array('form-row-wide'),
                'clear'     => true
            );

            return $fields;
        }

        add_action('woocommerce_admin_order_data_after_shipping_address', 'my_custom_checkout_field_display_admin_order_meta', 10, 1);

        function my_custom_checkout_field_display_admin_order_meta($order)
        {
            echo '<p><strong>' . __('Shipping Phone') . ':</strong> ' . get_post_meta($order->id, '_shipping_phone', true) . '</p>';
        }

        function shipchange($translated_text, $text, $domain)
        {
            switch ($translated_text) {
                case 'Ship to a different address?':
                    $translated_text = __('Shipping address', 'woocommerce');
                    break;
            }
            return $translated_text;
        }
        add_filter('gettext', 'shipchange', 20, 3);


        function isa_order_received_text($text, $order)
        {
            return '<div class="alert alert-success" style="font-size: 16px;text-align:center;font-weight: 500;border-radius: 0;"><b>DONE!</b> Thank you. Please check your email for order detail and receipt.</div>';
        }
        add_filter('woocommerce_thankyou_order_received_text', 'isa_order_received_text', 10, 2);
    }
}
