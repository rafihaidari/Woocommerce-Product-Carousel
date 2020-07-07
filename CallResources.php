<?php
/*
* @package wooCommerce-product-carousel
*/
if (!defined('ABSPATH')) {
    die;
}

class CallResources
{
    function __construct()
    {

        add_action('wp_enqueue_scripts', 'enqueue_date_picker');
        function enqueue_date_picker()
        {
            wp_enqueue_script('date_picker', plugin_dir_url(__FILE__) . 'assets/js/flatpickr.min.js', array('jquery'));
        }

        function callback_for_product_carousel_assets()
        {
            echo '
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
                <!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script> -->
                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
                <script src="https://cdn.jsdelivr.net/npm/places.js@1.18.2"></script>
                <script src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.11.1/jquery.validate.min.js"></script>
                <script src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.10.0/additional-methods.js"></script>
                
                ';
            wp_register_style('font-awesome', 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.csss');
            wp_enqueue_style('font-awesome');

            wp_register_style('product-carousel', plugin_dir_url(__FILE__) . 'assets/css/product-carousel.css');
            wp_enqueue_style('product-carousel');

            wp_register_style('flatpickr', plugin_dir_url(__FILE__) . 'assets/css/flatpickr.min.css');
            wp_enqueue_style('flatpickr');
        }
        add_action('wp_head', 'callback_for_product_carousel_assets');
    }
}
