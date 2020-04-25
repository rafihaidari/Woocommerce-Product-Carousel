<?php
/*
* @package wooCommerce-product-carousel
*/

if(! defined('ABSPATH')){
    die;
}

class Dashboard
{
    function __construct()
    {
        add_action('admin_menu', 'my_plugin_menu');

        function my_plugin_menu()
        {
            add_menu_page(
                __('Woo Product Carousel', 'wooCommerce-product-carousel'),
                __('Woo Product Carousel', 'wooCommerce-product-carousel'),
                'manage_options',
                'wooCommerce-product-carousel',
                'my_plugin_options',
                'dashicons-slides',
                56
            );
        }

        function my_plugin_options()
        {
            if (!current_user_can('manage_options')) {
                wp_die(__('You do not have sufficient permissions to access this page.'));
            }
            echo '<h1>WooCommerce Product Carousel Admin Page!</h1>';
        }
    }
}
