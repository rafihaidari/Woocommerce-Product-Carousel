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
        function ajax_check_user_logged_in() {
            echo is_user_logged_in()?'yes':'no';
            die();
        }
        add_action('wp_ajax_is_user_logged_in', 'ajax_check_user_logged_in');
        add_action('wp_ajax_nopriv_is_user_logged_in', 'ajax_check_user_logged_in');
        
    }
}