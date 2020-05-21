<?php
/*
* @package wooCommerce-product-carousel
*/

if (!defined('ABSPATH')) {
    die;
}

// get the user meta
// $userMeta = get_user_meta(get_current_user_id());

// get the form fields
$countries = new WC_Countries();

$shipping_fields = $countries->get_address_fields('', 'shipping_');
// echo "<pre>";
// print_r($shipping_fields);
// echo "</pre>";
$u_id = get_current_user_id();
$u_data = get_user_meta($u_id);
// echo "<pre>";
// print_r($u_data);
// echo "</pre>";

?>

<!-- For Delivery form -->
<div class="row" id="for-delivery-block" style="display:none">
    <div class="col-md-12 text-center">
        <h2 style="margin: 35px">For Delivery On</h2>
        <div class="alert alert-danger" id="error-0" style="display: none; text-align:center;text-align: center;width: 500px;margin: 0 auto;">Please Select Your Delivery Date!</div>
        <!-- <input type="search" id="address-input" placeholder="Where are we going?" /> -->

        <input type="text" class="flatpickr" id="flatpickr" style="padding: 0px 10px;margin: 10px;border: 1px solid rgb(174, 206, 137);width: 350px;" placeholder="Delivery Date" />
        <!-- <p>
            <span class="deliver-lable">Delivery On:</span> <span id="delivery-date"></span>
        </p>
        <p>
            <span class="deliver-lable">Tax:</span> <span id="order-tax"></span>
        </p>
        <p>
            <span class="deliver-lable">Payeble Price:</span> <span id="payeble-price"></span>
        </p> -->
        <button id="for_delivery_on_btn" class="woocommerce-Button button my-account-forms-btn" type="button" style="padding: 15px;" name="for_delivery_on_btn"><?php esc_html_e('Continue to Recipient Details', 'woocommerce'); ?></button>
    </div>
</div>


<!-- Shipping Addresss form -->
<div class="row" id="shipping-address-block" style="display:none">
    <div class="col-md-12">
        <form class="edit-account" method="post" style="margin: 0 auto;
    display: table;">
            <div class="alert alert-danger" id="error" style="text-align: center;position: relative;top: 25px;display:none">Please fill out the fields!</div>
            <h2 style="margin: 35px">Recipient Details</h2>
            <!-- <?php print_r($u_data); ?> -->
            <table>
                <tr>
                    <td>
                        <!-- <label for="account_first_name"><?php esc_html_e('Recipient name', 'woocommerce'); ?></label> -->
                    </td>
                    <td>
                        <input type="text" class="shipping-form-input" name="account_first_name" id="account_first_name" style="padding: 0px 10px;margin-left: 10px;border: 1px solid rgb(174, 206, 137);width: 170px;" placeholder="First Name" value="<?php echo $u_data['shipping_first_name'][0]; ?>" />

                        <input type="text" class="shipping-form-input" name="account_last_name" id="account_last_name" style="padding: 0px 10px;margin: 5px;border: 1px solid rgb(174, 206, 137);width: 170px;" placeholder="Last Name" value="<?php echo $u_data['shipping_last_name'][0]; ?>" />
                    </td>
                </tr>

                <tr>
                    <td>
                        <!-- <label for="account_address"><?php esc_html_e('Recipient address', 'woocommerce'); ?></label> -->
                    </td>
                    <td>
                        <input type="text" class="shipping-form-input address-input" style="padding: 0px 10px;margin: 10px;border: 1px solid rgb(174, 206, 137);width: 350px;" name="account_address" id="account_address" placeholder="Recipient Address" value="<?php echo $u_data['shipping_address_1'][0]; ?>" />

                        <input type="hidden" class="shipping-form-input address-input" style="padding: 0px 10px;margin: 10px;border: 1px solid rgb(174, 206, 137);width: 350px;" name="account_shipping_city" id="account_shipping_city" placeholder="Recipient city" value="<?php echo $u_data['shipping_city'][0]; ?>" />

                        <input type="hidden" class="shipping-form-input address-input" style="padding: 0px 10px;margin: 10px;border: 1px solid rgb(174, 206, 137);width: 350px;" name="account_shipping_city" id="account_shipping_postcode" placeholder="Recipient shipping postcode" value="<?php echo $u_data['shipping_postcode'][0]; ?>" />
                        <div class="addressFields">
                            <?php
                            include_once('addressFields.php');
                            // callAddressFields('shipping', $u_data['shipping_country'][0], $u_data['shipping_state'][0]);
                            callAddressFields('shipping', $u_data['shipping_country'][0], 'TX');
                            ?>
                        </div>
                    </td>
                </tr>

                <tr>
                    <td>
                        <!-- <label for="account_phone"><?php esc_html_e('Recipient Phone', 'woocommerce'); ?></label> -->
                    </td>
                    <td>
                        <input type="text" class="shipping-form-input" style="padding: 0px 10px;margin: 0 0 15px 10px;border: 1px solid rgb(174, 206, 137);width: 350px;" name="account_phone" id="account_phone" placeholder="Recipient Phone" value="<?php echo $u_data['shipping_phone'][0]; ?>" />
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td style="text-align: center">
                        <button id="save_location_address" class="woocommerce-Button button my-account-forms-btn" type="button" name="save_account_details" value=""><?php esc_html_e('Continue to Your Details', 'woocommerce'); ?></button>
                    </td>
                </tr>

            </table>
            <div class="clear"></div>

        </form>
    </div>
</div>

<!-- Billing Addresss form -->
<div class="row" id="billing-address-block" style="display:none">
    <div class="col-md-12" id="shipping-address-block">
        <form class="edit-account" method="post" style="margin: 0 auto;
    display: table;">
            <div class="alert alert-danger" id="error-2" style="text-align: center;position: relative;top: 25px;display:none">Please fill out the fields!</div>
            <h2 style="margin: 35px">Sender Details</h2>
            <!-- <?php print_r($u_data); ?> -->
            <table>
                <tr>
                    <td>
                        <!-- <label for="billing_first_name"><?php esc_html_e('Sender name', 'woocommerce'); ?></label> -->
                    </td>
                    <td>
                        <input type="text" class="billing-form-input" name="billing_first_name" id="billing_first_name" style="padding: 0px 10px;margin-left: 10px;border: 1px solid rgb(174, 206, 137);width: 170px;" placeholder="First Name" value="<?php echo $u_data['billing_first_name'][0]; ?>" />

                        <input type="text" class="billing-form-input" name="billing_last_name" id="billing_last_name" style="padding: 0px 10px;margin: 5px;border: 1px solid rgb(174, 206, 137);width: 170px;" placeholder="Last Name" value="<?php echo $u_data['billing_last_name'][0]; ?>" />
                    </td>
                </tr>

                <tr>
                    <td>
                        <!-- <label for="billing_address"><?php esc_html_e('Sender address', 'woocommerce'); ?></label> -->
                    </td>
                    <td>
                        <input type="text" class="billing-form-input address-input" style="padding: 0px 10px;margin: 10px;border: 1px solid rgb(174, 206, 137);width: 350px;" name="billing_address" id="billing_address" placeholder="Sender address" value="<?php echo $u_data['billing_address_1'][0]; ?>" />
                        <div class="addressFields">
                            <?php
                            include_once('AddressFields.php');
                            // callAddressFields('billing', $u_data['billing_country'][0], $u_data['billing_state'][0]);
                            callAddressFields('billing', 'US', 'TX');
                            ?>
                        </div>
                    </td>
                </tr>

                <tr>
                    <td>
                        <!-- <label for="billing_phone"><?php esc_html_e('Sender Phone', 'woocommerce'); ?></label> -->
                    </td>
                    <td>
                        <input type="text" class="billingform-input" style="padding: 0px 10px;margin: 10px;border: 1px solid rgb(174, 206, 137);width: 350px;" name="billing_phone" id="billing_phone" placeholder="Sender Phone" value="<?php echo $u_data['billing_phone'][0]; ?>" />
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td style="text-align: center">
                        <button id="save_billing_address" class="woocommerce-Button button my-account-forms-btn" type="button" name="save_billing_details"><?php esc_html_e('Continue to Gift', 'woocommerce'); ?></button>
                    </td>
                </tr>

            </table>
            <div class="clear"></div>

        </form>

    </div>
</div>