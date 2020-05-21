<?php
/*
* @package wooCommerce-product-carousel
*/


defined('ABSPATH') or die('Hey, you can\'t access this page!');

class ProductLoad
{
    function __construct()
    {
        add_action('wp_enqueue_scripts', 'my_enqueue');
        function my_enqueue()
        {
            wp_enqueue_script('ajax-script', plugin_dir_url(__FILE__) . 'assets/js/ajax-load.js', array('jquery'));

            wp_localize_script(
                'ajax-script',
                'ajax_object',
                array('ajax_url' => admin_url('admin-ajax.php'))
            );
        }
        add_action('wp_ajax_load_products_list', 'load_products_list');
        add_action('wp_ajax_nopriv_load_products_list', 'load_products_list');
        function load_products_list()
        {
            if ($_POST['param'] === 'giftsList') {

                $getCats = get_option('woo_product_carousel')['giftchoice'];
                foreach ($getCats as $getCat) {
                    $all_cats .= $getCat . ',';
                }

                $args = array(
                    'post_type'      => 'product',
                    'posts_per_page' => -1,
                    'product_cat'    => $all_cats,
                );
            } else {

                $getCats = get_option('woo_product_carousel')['categorychoice'];
                foreach ($getCats as $getCat) {
                    $all_cats .= $getCat . ',';
                }

                $args = array(
                    'post_type'      => 'product',
                    'posts_per_page' => -1,
                    'product_cat'    => $all_cats,
                );
            }

            global $product;
            $loop = new WP_Query($args);
            $response = array();
            $index = 0;
            while ($loop->have_posts()) : $loop->the_post();
                global $product;

                $image_gallery = array();
                $attachment_ids = $product->get_gallery_image_ids();
                for ($i = 0; $i < sizeof($attachment_ids); $i++) {
                    $image_gallery[$i] = wp_get_attachment_url($attachment_ids[$i]);
                }

                $response[$index] = array(
                    "product_id"                    =>    $product->get_id(),
                    "product_type"                  =>    $product->get_type(),
                    "product_name"                  =>    $product->get_name(),
                    "product_slug"                  =>    $product->get_slug(),
                    //"product_date_created"        =>    $product->get_date_created(),
                    //"product_date_modified"       =>    $product->get_date_modified(),
                    "product_description"           =>    $product->get_description(),
                    "product_short_description"     =>    $product->get_short_description(),
                    "product_sku"                   =>    $product->get_sku(),
                    "product_price"                 =>    $product->get_price(),
                    "product_regular_price"         =>    $product->get_regular_price(),
                    "product_sale_price"            =>    $product->get_sale_price(),
                    "product_currency_symbol"       =>    get_woocommerce_currency_symbol(),
                    "product_categories"            =>    get_terms('product_cat'),
                    "product_image_id"              =>    get_the_post_thumbnail_url($product->get_id()),
                    "product_image_gallery"         =>    $image_gallery,
                    "get_reviews_allowed"           =>    $product->get_reviews_allowed(),
                    "product_review_count"          =>    $product->get_review_count(),
                    "product_rating_counts"         =>    $product->get_rating_counts(),
                    "product_average_rating"        =>    $product->get_average_rating(),

                );

                $index++;
            endwhile;

            echo json_encode($response);
            wp_die();
        }
    }
}
