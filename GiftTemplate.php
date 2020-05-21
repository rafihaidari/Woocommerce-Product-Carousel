<?php
/*
* @package wooCommerce-product-carousel
*/

if (!defined('ABSPATH')) {
    die;
}

?>
<!-- Add gift row -->
<div class="row" id="gifts-block" style="display:none">
    <div class="col-md-12">
        <h2 style="margin: 35px">Add Gift</h2>

        <div id="giftCarousel" class="carousel slide" data-ride="gift-carousel" data-interval="0">

            <!-- Wrapper for carousel items -->
            <div class="carousel-inner" id="gift-items-inner">
                <input type="hidden" id="send_button_name" value="<?php echo get_option('woo_product_carousel')['button_name']; ?>">
                <!-- Items will be added here by Ajax-load.js -->

            </div>
            <!-- Carousel controls -->
            <a class="carousel-control left carousel-control-prev" id="gift-control-prev" href="#giftCarousel" data-slide="prev">
                <i class="fa fa-angle-left"></i>
            </a>
            <a class="carousel-control right carousel-control-next" id="gift-control-next" href="#giftCarousel" data-slide="next">
                <i class="fa fa-angle-right"></i>
            </a>
        </div>

        <textarea name="card-message" id="card-message" placeholder="Card Message"></textarea>
        <button href="#" id="orderDetails">Calculate Order Details</button>
        <div class="text-center totalOrderBlock" style="display: none">
            <p>
                <span class="totalLabel">Delivery On: </span> <span id="deliveryDate"></span>
            </p>
            <p>
                <span class="totalLabel">Tax: </span> <span id="taxTotal"></span>
            </p>
            <p>
                <span class="payeble-price">Payeble Price</span>
                <h4 id="totalOrder"></h4>
            </p>
        </div>
        <button id="to_payment_btn" class="woocommerce-Button button my-account-forms-btn" type="button" style="padding: 15px;" name="for_delivery_on_btn"><?php esc_html_e('Continue to Payment', 'woocommerce'); ?></button>
    </div>
</div>