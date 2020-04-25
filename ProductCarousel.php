<?php
/*
Plugin Name: WooCommerce Product Carousel
Plugin URI: https://haidari.co
Description: This plugin helps website owners to display WooCommerce products as carousel.
Author: Rafi Haidari
Author URI: https://haidari.co
Text Domain: wooCommerce-product-carousel
Version: 1.0.0
License: GPLv3 or Later (https://www.gnu.org/licenses/gpl-3.0.en.html)
*/
defined('ABSPATH') or die('Hey, you can\'t access this page!');

include('CallResources.php');
include('admin/dashboard.php');
include('ProductLoad.php');

class ProductCarousel
{
    function __construct()
    {
        new CallResources();
        new Dashboard();
        new ProductLoad();
    }

    public function activate_plugin()
    {
        flush_rewrite_rules();
    }

    public function deactivate_plugin()
    {
        flush_rewrite_rules();
    }

    public function uninstall()
    {
    }
}

if (class_exists('ProductCarousel')) {
    $ProductCarousel =  new ProductCarousel();
}

$ProductCarousel->activate_plugin();

//Activate plugin
register_activation_hook(__FILE__, array($ProductCarousel, 'activate_plugin'));

//Deactivate plugin
register_deactivation_hook(__FILE__, array($ProductCarousel, 'deactivate_plugin'));




function wooCommerce_product_carousel()
{
    if (!is_admin()) {
        return include('SliderTemplate.php');
    }
}
add_shortcode('product-carousel', 'wooCommerce_product_carousel');