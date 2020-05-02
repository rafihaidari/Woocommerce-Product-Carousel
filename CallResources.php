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
        function callback_for_product_carousel_assets()
        {
            echo '
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
                <!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script> -->
                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
                ';
            wp_register_style('font-awesome', 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.csss');
            wp_enqueue_style('font-awesome');

            wp_register_style('product-carousel', plugin_dir_url(__FILE__) . 'assets/css/product-carousel.css');
            wp_enqueue_style('product-carousel');
        }
        add_action('wp_head', 'callback_for_product_carousel_assets');
    }
}
