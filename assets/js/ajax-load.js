jQuery(document).ready(function ($) {

    var getPage = $('#product-page');
    //For localhost
    // let base_url = window.location.origin + '/mamazon';

    //For live site
    let base_url = window.location.origin + '';

    if (getPage.length > 0) {
        // AJAX request
        let return_result = function () {
            let tmp = null;
            jQuery.ajax({
                'async': false,
                url: ajax_object.ajax_url,
                type: 'post',
                dataType: "json",
                data: { action: 'load_products_list' },
                success: function (response) {
                    console.log('Rafi Success!');
                    console.log(response);
                    tmp = response;
                },
                error: function (xhr, errorThrown) {
                    var err = xhr.responseText;
                    console.log('Rafi Error!');
                    console.log(errorThrown);
                }
            });
            return tmp;
        }();

        function appendItemToSlider() {
            var getItemInner = $('#items-inner');

            if (return_result.length < 5) {
                var alertMessage = "<div class='alert alert-warning'>At least 5 products needed!</div>";
                $('.carousel-control-prev').hide();
                $('.carousel-control-next').hide();

                getItemInner.append(alertMessage);
            }
            else {

                var perChunk = 4 // items per chunk    

                var result = return_result.reduce((resultArray, item, index) => {
                    const chunkIndex = Math.floor(index / perChunk)

                    if (!resultArray[chunkIndex]) {
                        resultArray[chunkIndex] = [] // start a new chunk
                    }
                    resultArray[chunkIndex].push(item)
                    return resultArray
                }, []);

                // console.log(result);

                localStorage.setItem('currency_symbol', result[0][0]['product_currency_symbol']);

                active = null;
                var counter = 0;

                for (var i = 0; i < result.length; i++) {
                    if (counter == 0) {
                        active = 'active';
                    }
                    else {
                        active = '';
                    }
                    $('.carousel-indicators').append('<li data-target="#myCarousel" data-slide-to="' + i + '" class="' + active + '"></li>');
                    counter++;
                }

                var itemList, active = null;
                var counter = 0;
                var starRating = null;
                for (i = 0; i < result.length; i++) {
                    if (counter == 0) {
                        active = 'active';
                    }
                    else {
                        active = '';
                    }
                    itemList = '<div class="item carousel-item ' + active + '"> <div class="row">';
                    for (j = 0; j < result[i].length; j++) {

                        // var productAverageRating = result[i][j]['product_average_rating'];
                        // var TotalReviews = result[i][j]['product_review_count'];

                        // if (productAverageRating == 0) {
                        //     starRating = '<li class="list-inline-item"><i class="fa fa-star-o"></i></li> <li class="list-inline-item"><i class="fa fa-star-o"></i></li> <li class="list-inline-item"><i class="fa fa-star-o"></i></li> <li class="list-inline-item"><i class="fa fa-star-o"></i></li> <li class="list-inline-item"><i class="fa fa-star-o"></i></li> <span class"total-reviews">' + TotalReviews + '</span> Reviews';
                        // }
                        // else if (productAverageRating > 0 && productAverageRating <= 0.5) {
                        //     starRating = '<li class="list-inline-item"><i class="fa fa-star-half-o"></i></li> <li class="list-inline-item"><i class="fa fa-star-o"></i></li> <li class="list-inline-item"><i class="fa fa-star-o"></i></li> <li class="list-inline-item"><i class="fa fa-star-o"></i></li> <li class="list-inline-item"><i class="fa fa-star-o"></i></li> <span class"total-reviews">' + TotalReviews + '</span> Reviews';
                        // }
                        // else if (productAverageRating > 0 && productAverageRating <= 1) {
                        //     starRating = '<li class="list-inline-item"><i class="fa fa-star"></i></li> <li class="list-inline-item"><i class="fa fa-star-o"></i></li> <li class="list-inline-item"><i class="fa fa-star-o"></i></li> <li class="list-inline-item"><i class="fa fa-star-o"></i></li> <li class="list-inline-item"><i class="fa fa-star-o"></i></li> <span class"total-reviews">' + TotalReviews + '</span> Reviews';
                        // }
                        // else if (productAverageRating > 1 && productAverageRating <= 1.5) {
                        //     starRating = '<li class="list-inline-item"><i class="fa fa-star"></i></li> <li class="list-inline-item"><i class="fa fa-star-half-o"></i></li> <li class="list-inline-item"><i class="fa fa-star-o"></i></li> <li class="list-inline-item"><i class="fa fa-star-o"></i></li> <li class="list-inline-item"><i class="fa fa-star-o"></i></li> <span class"total-reviews">' + TotalReviews + '</span> Reviews';
                        // }
                        // else if (productAverageRating > 1.5 && productAverageRating <= 2) {
                        //     starRating = '<li class="list-inline-item"><i class="fa fa-star"></i></li> <li class="list-inline-item"><i class="fa fa-star"></i></li> <li class="list-inline-item"><i class="fa fa-star-o"></i></li> <li class="list-inline-item"><i class="fa fa-star-o"></i></li> <li class="list-inline-item"><i class="fa fa-star-o"></i></li> <span class"total-reviews">' + TotalReviews + '</span> Reviews';
                        // }
                        // else if (productAverageRating > 2 && productAverageRating <= 2.5) {
                        //     starRating = '<li class="list-inline-item"><i class="fa fa-star"></i></li> <li class="list-inline-item"><i class="fa fa-star"></i></li> <li class="list-inline-item"><i class="fa fa-star-half-o"></i></li> <li class="list-inline-item"><i class="fa fa-star-o"></i></li> <li class="list-inline-item"><i class="fa fa-star-o"></i></li> <span class"total-reviews">' + TotalReviews + '</span> Reviews';
                        // }
                        // else if (productAverageRating > 2.5 && productAverageRating <= 3) {
                        //     starRating = '<li class="list-inline-item"><i class="fa fa-star"></i></li> <li class="list-inline-item"><i class="fa fa-star"></i></li> <li class="list-inline-item"><i class="fa fa-star"></i></li> <li class="list-inline-item"><i class="fa fa-star-o"></i></li> <li class="list-inline-item"><i class="fa fa-star-o"></i></li> <span class"total-reviews">' + TotalReviews + '</span> Reviews';
                        // }
                        // else if (productAverageRating > 3 && productAverageRating <= 3.5) {
                        //     starRating = '<li class="list-inline-item"><i class="fa fa-star"></i></li> <li class="list-inline-item"><i class="fa fa-star"></i></li> <li class="list-inline-item"><i class="fa fa-star"></i></li> <li class="list-inline-item"><i class="fa fa-star-half-o"></i></li> <li class="list-inline-item"><i class="fa fa-star-o"></i></li> <span class"total-reviews">' + TotalReviews + '</span> Reviews';
                        // }
                        // else if (productAverageRating > 3.5 && productAverageRating <= 4) {
                        //     starRating = '<li class="list-inline-item"><i class="fa fa-star"></i></li> <li class="list-inline-item"><i class="fa fa-star"></i></li> <li class="list-inline-item"><i class="fa fa-star"></i></li> <li class="list-inline-item"><i class="fa fa-star"></i></li> <li class="list-inline-item"><i class="fa fa-star-o"></i></li> <span class"total-reviews">' + TotalReviews + '</span> Reviews';
                        // }
                        // else if (productAverageRating > 4 && productAverageRating <= 4.5) {
                        //     starRating = '<li class="list-inline-item"><i class="fa fa-star"></i></li> <li class="list-inline-item"><i class="fa fa-star"></i></li> <li class="list-inline-item"><i class="fa fa-star"></i></li> <li class="list-inline-item"><i class="fa fa-star"></i></li> <li class="list-inline-item"><i class="fa fa-star-half-o"></i></li> <span class"total-reviews">' + TotalReviews + ' </span> Reviews';
                        // }
                        // else if (productAverageRating > 4.5 && productAverageRating <= 5) {
                        //     starRating = '<li class="list-inline-item"><i class="fa fa-star"></i></li> <li class="list-inline-item"><i class="fa fa-star"></i></li> <li class="list-inline-item"><i class="fa fa-star"></i></li> <li class="list-inline-item"><i class="fa fa-star"></i></li> <li class="list-inline-item"><i class="fa fa-star"></i></li> <span class"total-reviews">' + TotalReviews + '</span> Reviews';
                        // }

                        var getImageGallery = result[i][j]['product_image_gallery'][1];

                        if (getImageGallery !== undefined) {
                            getImageGallery = '<img src="' + result[i][j]['product_image_gallery'][1] + '" class="img-responsive img-fluid" alt="">';
                        }
                        else {
                            getImageGallery = '<img src="' + result[i][j]['product_image_id'] + '" class="img-responsive img-fluid" alt="">';
                        }

                        itemList += '<div class="col-sm-12 col-md-4"><div class="thumb-wrapper"> <div class="img-box fader itemClick" data-id="' + result[i][j]['product_id'] + '"><span style="position: absolute;bottom: -25px;left: 10px;">More info...</span> <button class="productinfo itemClick" data-id="' + result[i][j]['product_id'] + '" style="position:absolute;z-index:100;    right:10px;top: 10px;"> <i class="fa fa-info"></i> </button> <img src="' + result[i][j]['product_image_id'] + '" class="img-responsive img-fluid" alt="">' + getImageGallery + '</div> <div class="thumb-content"> <h4>' + result[i][j]['product_name'] + '</h4> <p class="item-price"><span>' + result[i][j]['product_currency_symbol'] + result[i][j]['product_price'] + '</span></p> <div class="star-rating"> <ul class="list-inline"> ' + starRating + '</ul> </div> <button id="addToCart_' + result[i][j]['product_id'] + '" class="btn btn-primary addToCart phoen-login-signup-popup-open" data-id="' + result[i][j]['product_id'] + '" add-to-type="main-products">' + $('#send_button_name').val() + '</button> </div> </div> </div>';
                    }
                    itemList += '</div>';

                    getItemInner.append(itemList);
                    counter++;
                }
            }


        }
        appendItemToSlider();

        function appendItemToGift() {

            let return_gifts = function () {
                let tmp = null;
                jQuery.ajax({
                    'async': false,
                    url: ajax_object.ajax_url,
                    type: 'post',
                    dataType: "json",
                    data: {
                        action: 'load_products_list',
                        param: 'giftsList'
                    },
                    success: function (response) {
                        console.log('Rafi Success!');
                        console.log(response);
                        tmp = response;
                    },
                    error: function (xhr, errorThrown) {
                        var err = xhr.responseText;
                        console.log('Rafi Error!');
                        console.log(errorThrown);
                    }
                });
                return tmp;
            }();

            var getItemInner = $('#gift-items-inner');

            if (return_gifts.length < 3) {
                var alertMessage = "<div class='alert alert-warning'>At least 3 products needed!</div>";
                $('#gift-control-prev').hide();
                $('#gift-control-next').hide();

                getItemInner.append(alertMessage);
            }
            else {

                var perChunk = 3 // items per chunk    

                var result = return_gifts.reduce((resultArray, item, index) => {
                    const chunkIndex = Math.floor(index / perChunk)

                    if (!resultArray[chunkIndex]) {
                        resultArray[chunkIndex] = [] // start a new chunk
                    }
                    resultArray[chunkIndex].push(item)
                    return resultArray
                }, [])
                console.log(result);
                active = null;
                var counter = 0;

                var itemList, active, col_1_5 = null;
                var counter = 0;

                for (i = 0; i < result.length; i++) {
                    if (counter == 0) {
                        active = 'active';
                        col_1_5 = 'col-md-offset-1-5';
                    }
                    else {
                        active = '';
                    }
                    itemList = '<div class="item carousel-item ' + active + '"> <div class="row">';
                    for (j = 0; j < result[i].length; j++) {
                        if (j == 0) {
                            col_1_5 = 'col-md-offset-1-5';
                        }
                        else {
                            col_1_5 = '';
                        }
                        itemList += '<div class="col-sm-3 giftItems ' + col_1_5 + '"><div class="thumb-wrapper"> <div class="img-box" data-id="' + result[i][j]['product_id'] + '" style="height: 160px;"> <img src="' + result[i][j]['product_image_id'] + '" class="img-responsive img-fluid" alt=""></div> <div class="thumb-content"> <h4 style="font-size: 14px;">' + result[i][j]['product_name'] + '</h4> <p class="item-price gift-item-price"><span>' + result[i][j]['product_currency_symbol'] + result[i][j]['product_price'] + '</span></p> <button id="addToCart_' + result[i][j]['product_id'] + '" class="btn btn-primary addToCart giftAddToCart" data-id="' + result[i][j]['product_id'] + '" add-to-type="gift">Add</button> </div> </div> </div>';
                    }
                    itemList += '</div>';

                    getItemInner.append(itemList);
                    counter++;
                }
            }

        }
        appendItemToGift();

        $('.addToCart').click(function () {
            $('.carousel-control-next').css({ "position": "absolute", "right": "-20px" });
            $('.carousel-control-prev').css({ "position": "absolute", "left": "-20px" });
            ProdID = $(this).data('id');
            var getParameter = $(this).attr('add-to-type');

            var loading = '<img src="' + base_url + '/wp-content/plugins/woocommerce-product-carousel/assets/images/loading.gif" id="loading-image" class="addToLoading">';

            $('#addToCart_' + ProdID).append(loading);
            $('.modalAddToCart').append(loading);

            if (getParameter === 'main-products') {
                function addProduct() {
                    addToCart(ProdID);
                    $('#for-delivery-block').show();
                    $([document.documentElement, document.body]).animate({
                        scrollTop: $("#for-delivery-block").offset().top
                    }, 2000);
                }
            }
            else if (getParameter === 'main-products-popup') {
                ProdID = localStorage.getItem('ProductID');
                function addProduct() {
                    addToCart(ProdID);

                    $('#myModal').modal('hide');
                    $('#for-delivery-block').show();
                    $([document.documentElement, document.body]).animate({
                        scrollTop: $("#for-delivery-block").offset().top
                    }, 2000);
                }
            }
            else if (getParameter === 'gift') {
                $('.addToLoading').remove();
                $(this).append(loading);
                $(this).addClass('giftClicked');
                function addProduct() {
                    addToCart(ProdID);
                    $('#deliveryDate').empty().append('');
                    $('#deliveryDate').append(localStorage.getItem('storDeliveryDate'));

                    $([document.documentElement, document.body]).animate({
                        scrollTop: $("#card-message").offset().top
                    }, 2000);
                }
            }

            $.ajax({
                type: 'POST',
                url: ajax_object.ajax_url,
                data: {
                    action: 'is_user_logged_in',
                    param: getParameter,
                },
                beforeSend: function () {
                    // $('#addToCart_' + ProdID).append(loading);
                },
                success: function (response) {
                    // console.log(response);
                    addProduct();
                    $('.addToLoading').remove();
                    $('.check-mark').remove();
                    $('.giftClicked').append("<span class='check-mark'></span>");

                    if (response == 'yes') {
                        //This class is belongs to Woocommerce Login / Signup Lite plugin
                        // $('.addToCart').removeClass('phoen-login-signup-popup-open');
                        localStorage.setItem('login', 'yes');
                    }
                    else {
                        localStorage.setItem('login', 'no');
                    }
                },
                error: function (error) {
                    console.log(error); // For testing (to be removed)
                },
                complete: function () {
                    $('.addToLoading').remove();
                },
            });


            function addToCart(p_id) {
                $.get(base_url + '/?post_type=product&add-to-cart=' + p_id, function () {
                    // call back
                });
            }

        });

        $('.fader').hover(function () {
            $(this).find("img").fadeToggle();
        });

        function getCartTotal() {
            $.ajax({
                'async': true,
                type: 'POST',
                dataType: "json",
                url: ajax_object.ajax_url,
                data: {
                    action: 'get_cart_total',
                },
                beforeSend: function () {

                },
                success: function (response) {
                    console.log(response);
                    console.log(response[1]);

                    $('#totalOrder').empty().append('');
                    $('#taxTotal').empty().append('');

                    $('#totalOrder').append(localStorage.getItem('currency_symbol') + response[0]);
                    $('#taxTotal').append(localStorage.getItem('currency_symbol') + response[1])

                    $('.totalOrderBlock').show();
                    $('.addToLoading').remove();

                },
                error: function (error) {
                    console.log(error);
                },
            });
        }

        jQuery('.itemClick').click(function () {
            var ProductID = $(this).data('id');
            localStorage.setItem('ProductID', ProductID);
            console.log(ProductID);

            function findId(return_result, item) {
                var itemArray = return_result;
                for (var i = 0; i < return_result.length; i++) {
                    if (itemArray[i]['product_id'] == item) {
                        return (itemArray[i]);
                    }
                }
            }

            var res = findId(return_result, ProductID);

            // Add response in Modal body
            jQuery('.modal-body').empty().append('');
            jQuery('.modal-body').append(res['product_name']);

            jQuery('#modal-title').empty().append('');
            jQuery('#modal-title').append(res['product_name']);

            jQuery('.modal-body').empty().append('');
            jQuery('.modal-body').append(res['product_description']);

            jQuery('#btn-price').empty().append('');
            jQuery('#btn-price').append(res['product_currency_symbol'] + res['product_price']);

            $('.modalAddToCart').attr('id', 'addToCart_' + res['product_id']);
            $('.modalAddToCart').attr('data-proid', res['product_id']);


            var getGallery = res['product_image_gallery'];
            var getGallerySize = getGallery.length;

            var SlideItem = jQuery('#gallery-slide-item');
            var MainSlideBox = jQuery('#main-slider-box');
            var active = null;

            MainSlideBox.empty().append('');
            SlideItem.empty().append('');

            if (getGallerySize > 0) {

                for (var i = 0; i < 4; i++) {
                    if (i == 0) {
                        active = 'active';
                    }
                    else {
                        active = '';
                    }

                    MainSlideBox.append('<div class="item ' + active + '"> <img src="' + res['product_image_gallery'][i] + '"></div>');

                    SlideItem.append('<div data-target="#carousel" data-slide-to="' + i + '" class="thumb  ' + active + '"><img src="' + res['product_image_gallery'][i] + '"></div>');
                }
            }
            else {
                MainSlideBox.append('<div class="item active"> <img src="https://via.placeholder.com/500/?text=Add%20Gallery"> </div><div class="item"> <img src="https://via.placeholder.com/500/?text=Add%20Gallery"> </div>');
            }

            $("#carousel").addClass("carousel slide");
            $("#thumbcarousel").addClass("carousel slide");

            // Display Modal
            jQuery('#myModal').modal('show');
        });

        $('#for_delivery_on_btn').click(function () {
            var datePicker = $('#flatpickr').val();
            if (datePicker == '') {
                $('#error-0').show();
            }
            else {
                // var base_url = window.location.origin + '/mamazon';
                var loading = '<img src="' + base_url + '/wp-content/plugins/woocommerce-product-carousel/assets/images/loading.gif" style="width: 15px;position: relative;right: -5px" id="loading-image">';
                $('#for_delivery_on_btn').append(loading)

                setTimeout(function () {
                    $('#loading-image').remove();
                }, 1000);


                $('#error-0').hide();
                var storDeliveryDate = $('#flatpickr').val();
                localStorage.setItem('storDeliveryDate', storDeliveryDate);

                $('#shipping-address-block').show();
                $([document.documentElement, document.body]).animate({
                    scrollTop: $("#shipping-address-block").offset().top
                }, 2000);
            }

        })


        $('#save_location_address').click(function () {

            var loading = '<img src="' + base_url + '/wp-content/plugins/woocommerce-product-carousel/assets/images/loading.gif" style="width: 15px;position: relative;right: -10px" id="loading-image">';
            $('#loading-image').remove();

            var account_first_name = $('#account_first_name').val();
            var account_last_name = $('#account_last_name').val();
            var account_address = $('#account_address').val();
            var account_shipping_city = $('#account_shipping_city').val();
            var account_shipping_state = $('#shipping_state').val();
            var account_shipping_country = $('#shipping_country').val();
            var account_phone = $('#account_phone').val();

            var checkLogin = localStorage.getItem('login');
            if (checkLogin === 'no') {
                if (account_first_name == '' || account_address == '' || account_phone == '') {
                    $('#error').show();
                }
                else {
                    $('#error').hide();
                    $('#save_location_address').append(loading);
                    localStorage.setItem('account_first_name', account_first_name);
                    localStorage.setItem('account_last_name', account_last_name);
                    localStorage.setItem('account_address', account_address);
                    localStorage.setItem('account_shipping_city', account_shipping_city);
                    localStorage.setItem('account_shipping_state', account_shipping_state);
                    localStorage.setItem('account_shipping_country', account_shipping_country);
                    localStorage.setItem('account_phone', account_phone);

                    setTimeout(function () {
                        $('#loading-image').remove();
                    }, 2000);
                    $('#billing-address-block').show();
                    $([document.documentElement, document.body]).animate({
                        scrollTop: $("#billing-address-block").offset().top
                    }, 2000);
                }
            }
            else if (checkLogin === 'yes') {
                if (account_first_name == '' || account_address == '' || account_phone == '') {
                    $('#error').show();
                }
                else {
                    $('#error').hide();
                    var location_data = {
                        "account_first_name": account_first_name,
                        "account_last_name": account_last_name,
                        "account_address": account_address,
                        // "account_address2": account_address2,
                        "account_shipping_city": account_shipping_city,
                        "account_shipping_state": account_shipping_state,
                        "account_shipping_country": account_shipping_country,
                        "account_phone": account_phone,
                    }
                    console.log(location_data);
                    $.ajax({
                        type: 'POST',
                        url: ajax_object.ajax_url,
                        data: {
                            action: "save_location_data",
                            data: location_data
                        },
                        beforeSend: function () {
                            $('#save_location_address').append(loading)
                        },
                        success: function (result) {
                            console.log(result);
                            // window.location.reload();
                            $('#loading-image').remove();
                            $('#billing-address-block').show();
                            $([document.documentElement, document.body]).animate({
                                scrollTop: $("#billing-address-block").offset().top
                            }, 2000);

                        },
                        error: function (error) {
                            console.log(error); // For testing (to be removed)
                        },
                        complete: function () {
                            $('#loading-image').remove();
                        },
                    });
                }
            }

        });

        function phonenumber(inputtxt) {
            var phoneno = /^\(?(\d{3})\)?[-\. ]?(\d{3})[-\. ]?(\d{4})$/;
            if (inputtxt.match(phoneno)) {
                return true;
            } else {
                return false;
            }
        }

        $('#billing_phone').keyup(function () {
            if (!phonenumber($('#billing_phone').val())) {
                $('#billing_phone_alert').show();
                $('#save_billing_address').attr('disabled', 'disabled');
            }
            else {
                $('#save_billing_address').removeAttr('disabled');
                $('#billing_phone_alert').hide();

            }
        });

        $('#account_phone').keyup(function () {
            if (!phonenumber($('#account_phone').val())) {
                $('#shipping_phone_alert').show();
                $('#save_location_address').attr('disabled', 'disabled');
            }
            else {
                $('#save_location_address').removeAttr('disabled');
                $('#shipping_phone_alert').hide();

            }
        });


        $('#save_billing_address').click(function () {
            var loading = '<img src="' + base_url + '/wp-content/plugins/woocommerce-product-carousel/assets/images/loading.gif" style="width: 15px;position: relative;right: -10px" id="loading-image">';

            $('#loading-image').remove();
            var billing_first_name = $('#billing_first_name').val();
            var billing_last_name = $('#billing_last_name').val();
            var billing_address = $('#billing_address').val();
            var billing_city = $('#billing_city').val();
            var billing_state = $('#billing_state').val();
            var billing_country = $('#billing_country').val();
            var billing_phone = $('#billing_phone').val();

            var checkLogin = localStorage.getItem('login');
            if (checkLogin === 'no') {
                if (billing_first_name == '' || billing_address == '' || billing_phone == '') {
                    $('#error-2').show();
                }
                else {
                    $('#error-2').hide();
                    $('#save_billing_address').append(loading);

                    localStorage.setItem('billing_first_name', billing_first_name);
                    localStorage.setItem('billing_last_name', billing_last_name);
                    localStorage.setItem('billing_address', billing_address);
                    localStorage.setItem('billing_city', billing_city);
                    localStorage.setItem('billing_state', billing_state);
                    localStorage.setItem('billing_country', billing_country);
                    localStorage.setItem('billing_phone', billing_phone);

                    setTimeout(function () {
                        $('#loading-image').remove();
                    }, 2000);
                    $('#gifts-block').show();
                    $([document.documentElement, document.body]).animate({
                        scrollTop: $("#gifts-block").offset().top
                    }, 2000);
                }
            }
            else if (checkLogin === 'yes') {

                if (billing_first_name == '' || billing_address == '' || billing_phone == '') {
                    $('#error-2').show();
                }
                else {
                    $('#error-2').hide();
                    var location_data = {
                        "billing_first_name": billing_first_name,
                        "billing_last_name": billing_last_name,
                        "billing_address": billing_address,
                        "billing_city": billing_city,
                        "billing_state": billing_state,
                        "billing_country": billing_country,
                        "billing_phone": billing_phone,
                    }
                    console.log(location_data);
                    $.ajax({
                        type: 'POST',
                        url: ajax_object.ajax_url,
                        data: {
                            action: "save_billing_address",
                            data: location_data
                        },
                        beforeSend: function () {
                            $('#save_billing_address').append(loading)
                        },
                        success: function (result) {
                            $('#loading-image').hide();
                            $('#gifts-block').show();
                            $([document.documentElement, document.body]).animate({
                                scrollTop: $("#gifts-block").offset().top
                            }, 2000);

                        },
                        error: function (error) {
                            console.log(error); // For testing (to be removed)
                        },
                        complete: function () {
                            $('#loading-image').remove();
                        },
                    });
                }
            }

        });

        $('#to_payment_btn').click(function () {
            localStorage.setItem('card-note', $('#card-message').val());
            var loading = '<img src="' + base_url + '/wp-content/plugins/woocommerce-product-carousel/assets/images/loading.gif" style="width: 15px;position: relative;right: -5px" id="loading-image">';

            $('#to_payment_btn').append(loading);
            console.log(localStorage.getItem('card-note'));

            window.location.href = base_url + '/checkout/';
        })

        $('#orderDetails').click(function () {
            var loading = '<img src="' + base_url + '/wp-content/plugins/woocommerce-product-carousel/assets/images/loading.gif" id="loading-image" class="addToLoading" style="filter: invert(1);">';
            $('.addToLoading').remove();
            $('#orderDetails').append(loading);

            getCartTotal();

        })

        if ($('#account_address').length > 0) {
            $('#shipping_state').attr('data-placeholder', 'Select State');
            var deliveryAutocomplete = {
                appId: 'plMW47ZWCG5S',
                apiKey: '6b4bcf20bb2b20c418b5718ad15e9eb0',
                container: document.querySelector('#account_address')
            };
            var billingAutocomplete = places({
                appId: 'plMW47ZWCG5S',
                apiKey: '6b4bcf20bb2b20c418b5718ad15e9eb0',
                container: document.querySelector('#billing_address')
            });

            const reconfigurableOptions = {
                language: 'en',
                countries: ['us'], // Search in the United States of America and in the Russian Federation
                administrative: ['Texas'],
                type: 'address',
                aroundLatLngViaIP: false // disable the extra search/boost around the source IP
            };
            const placesInstance = places(deliveryAutocomplete).configure(reconfigurableOptions);
            // placesInstance.configure({
            //     countries: ['us'] // only search in the United States, the rest of the settings are unchanged: we're still searching for cities in German.
            //   })
            // deliveryAutocomplete.on('change', function resultSelected(e) {
            //     // document.querySelector('#account_address2').value = e.suggestion.administrative || '';
            //     document.querySelector('#account_shipping_city').value = e.suggestion.city || '';
            //     // document.querySelector('#account_shipping_state').value = e.suggestion.administrative || '';
            //     document.querySelector('#account_shipping_postcode').value = e.suggestion.postcode || '';
            // });
        }

        // flatpickr('selector', options);
        flatpickr('#flatpickr', {

            // A string of characters which are used to define how the date will be displayed in the input box. 
            dateFormat: 'M d, Y',

            // A reference to another input element. 
            // This can be useful if you want to show the user a readable date, but return something totally different to the server.
            altFormat: "F j, Y",

            // Exactly the same as date format, but for the altInput field
            altInput: false,

            // This class will be added to the input element created by the altInput option.  
            // Note that altInput already inherits classes from the original input.
            altInputClass: "",

            // Allows the user to enter a date directly input the input field. By default, direct entry is disabled.
            allowInput: false,

            // Instead of body, appends the calendar to the specified node instead.
            appendTo: null,

            // Defines how the date will be formatted in the aria-label for calendar days, using the same tokens as dateFormat. 
            // If you change this, you should choose a value that will make sense if a screen reader reads it out loud.
            ariaDateFormat: "F j, Y",

            // Whether clicking on the input should open the picker. You could disable this if you wish to open the calendar manually with.open()
            clickOpens: true,

            // Sets the initial selected date(s).
            // If you're using mode: "multiple" or a range calendar supply an Array of Date objects or an Array of date strings which follow your dateFormat.
            // Otherwise, you can supply a single Date object or a date string.
            defaultDate: null,

            // Initial value of the hour element.
            defaultHour: 12,

            // Initial value of the minute element.  
            defaultMinute: 0,

            // The minimum date that a user can start picking from, as a JavaScript Date.
            minDate: new Date(),

            // The maximum date that a user can pick to, as a JavaScript Date. 
            maxDate: null,

            // Dates to disable, using intervals
            // disable: [ { 'from': '2015-09-02', 'to': '2015-10-02' } ]
            disable: [],

            // Set disableMobile to true to always use the non-native picker.
            // By default, flatpickr utilizes native datetime widgets unless certain options (e.g. disable) are used.
            disableMobile: false,

            // See Enabling dates
            enabl: [],

            // Enables time picker
            enableTime: false,

            // Enables seconds in the time picker.
            enableSeconds: false,

            // Allows using a custom date formatting function instead of the built-in handling for date formats using dateFormat, altFormat, etc.
            formatDate: null,

            // Adjusts the step for the hour input (incl. scrolling)
            hourIncrement: 1,

            // Displays the calendar inline
            inline: false,

            // Show the month using the shorthand version.
            shorthandCurrentMonth: false,

            // Adjusts the step for the minute input (incl. scrolling)
            minuteIncrement: 5,

            // "single"  "single", "multiple", or "range"
            mode: "single",

            // next/prev arrows
            prevArrow: '&lt;',
            nextArrow: '&gt;',

            // Function that expects a date string and must return a Date object
            parseDate: false,

            // Show the month using the shorthand version (ie, Sep instead of September).
            shorthandCurrentMonth: false,

            // Position the calendar inside the wrapper and next to the input element. (Leave false unless you know what you're doing.
            static: false,

            // Displays time picker in 24 hour mode without AM/PM selection when enabled. 
            time_24hr: false,

            // Enables display of week numbers in calendar.
            weekNumbers: false,

            // Hides the day selection in calendar.
            // Use it along with enableTime to create a time picker.
            noCalendar: false

        });

        $('.col-set').addClass('col-sm-12');
        $('.col').addClass('col-sm-12');
        $('#cboxWrapper').addClass('col-sm-12');
        $('#colorbox').addClass('col-sm-12');

    }

    if (localStorage.getItem('storDeliveryDate') !== null) {
        $('#datepicker').val(localStorage.getItem('storDeliveryDate'));
        var checkLogin = localStorage.getItem('login');

        if (checkLogin === 'no') {
            $('#shipping_first_name').val(localStorage.getItem('account_first_name'));
            $('#shipping_last_name').val(localStorage.getItem('account_last_name'));
            $('#shipping_address_1').val(localStorage.getItem('account_address'));
            $('#shipping_city').val(localStorage.getItem('account_shipping_city'));
            $('#shipping_state').val(localStorage.getItem('account_shipping_state'));
            $('#shipping_country').val(localStorage.getItem('account_shipping_country'));
            $('#shipping_phone').val(localStorage.getItem('account_phone'));


            $('#billing_first_name').val(localStorage.getItem('billing_first_name'));
            $('#billing_last_name').val(localStorage.getItem('billing_last_name'));
            $('#billing_address_1').val(localStorage.getItem('billing_address'));
            $('#billing_city').val(localStorage.getItem('billing_city'));
            $('#billing_state').val(localStorage.getItem('billing_state'));
            $('#billing_country').val(localStorage.getItem('billing_country'));
            $('#billing_phone').val(localStorage.getItem('billing_phone'));
        }
    }

    if (localStorage.getItem('card-note') !== null) {
        $('#order_comments').val(localStorage.getItem('card-note'));
    }
    var checkLogin = localStorage.getItem('login');
    if (checkLogin === 'yes') {
        $('#billing_email_field').hide();
    }
})