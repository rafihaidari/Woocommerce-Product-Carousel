jQuery(document).ready(function ($) {

    var getPage = $('#product-page');
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

        function appendItem() {
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
                }, [])
                console.log(result);
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

                        var productAverageRating = result[i][j]['product_average_rating'];
                        var TotalReviews = result[i][j]['product_review_count'];

                        if (productAverageRating == 0) {
                            starRating = '<li class="list-inline-item"><i class="fa fa-star-o"></i></li> <li class="list-inline-item"><i class="fa fa-star-o"></i></li> <li class="list-inline-item"><i class="fa fa-star-o"></i></li> <li class="list-inline-item"><i class="fa fa-star-o"></i></li> <li class="list-inline-item"><i class="fa fa-star-o"></i></li> <span class"total-reviews">' + TotalReviews + '</span> Reviews';
                        }
                        else if (productAverageRating > 0 && productAverageRating <= 0.5) {
                            starRating = '<li class="list-inline-item"><i class="fa fa-star-half-o"></i></li> <li class="list-inline-item"><i class="fa fa-star-o"></i></li> <li class="list-inline-item"><i class="fa fa-star-o"></i></li> <li class="list-inline-item"><i class="fa fa-star-o"></i></li> <li class="list-inline-item"><i class="fa fa-star-o"></i></li> <span class"total-reviews">' + TotalReviews + '</span> Reviews';
                        }
                        else if (productAverageRating > 0 && productAverageRating <= 1) {
                            starRating = '<li class="list-inline-item"><i class="fa fa-star"></i></li> <li class="list-inline-item"><i class="fa fa-star-o"></i></li> <li class="list-inline-item"><i class="fa fa-star-o"></i></li> <li class="list-inline-item"><i class="fa fa-star-o"></i></li> <li class="list-inline-item"><i class="fa fa-star-o"></i></li> <span class"total-reviews">' + TotalReviews + '</span> Reviews';
                        }
                        else if (productAverageRating > 1 && productAverageRating <= 1.5) {
                            starRating = '<li class="list-inline-item"><i class="fa fa-star"></i></li> <li class="list-inline-item"><i class="fa fa-star-half-o"></i></li> <li class="list-inline-item"><i class="fa fa-star-o"></i></li> <li class="list-inline-item"><i class="fa fa-star-o"></i></li> <li class="list-inline-item"><i class="fa fa-star-o"></i></li> <span class"total-reviews">' + TotalReviews + '</span> Reviews';
                        }
                        else if (productAverageRating > 1.5 && productAverageRating <= 2) {
                            starRating = '<li class="list-inline-item"><i class="fa fa-star"></i></li> <li class="list-inline-item"><i class="fa fa-star"></i></li> <li class="list-inline-item"><i class="fa fa-star-o"></i></li> <li class="list-inline-item"><i class="fa fa-star-o"></i></li> <li class="list-inline-item"><i class="fa fa-star-o"></i></li> <span class"total-reviews">' + TotalReviews + '</span> Reviews';
                        }
                        else if (productAverageRating > 2 && productAverageRating <= 2.5) {
                            starRating = '<li class="list-inline-item"><i class="fa fa-star"></i></li> <li class="list-inline-item"><i class="fa fa-star"></i></li> <li class="list-inline-item"><i class="fa fa-star-half-o"></i></li> <li class="list-inline-item"><i class="fa fa-star-o"></i></li> <li class="list-inline-item"><i class="fa fa-star-o"></i></li> <span class"total-reviews">' + TotalReviews + '</span> Reviews';
                        }
                        else if (productAverageRating > 2.5 && productAverageRating <= 3) {
                            starRating = '<li class="list-inline-item"><i class="fa fa-star"></i></li> <li class="list-inline-item"><i class="fa fa-star"></i></li> <li class="list-inline-item"><i class="fa fa-star"></i></li> <li class="list-inline-item"><i class="fa fa-star-o"></i></li> <li class="list-inline-item"><i class="fa fa-star-o"></i></li> <span class"total-reviews">' + TotalReviews + '</span> Reviews';
                        }
                        else if (productAverageRating > 3 && productAverageRating <= 3.5) {
                            starRating = '<li class="list-inline-item"><i class="fa fa-star"></i></li> <li class="list-inline-item"><i class="fa fa-star"></i></li> <li class="list-inline-item"><i class="fa fa-star"></i></li> <li class="list-inline-item"><i class="fa fa-star-half-o"></i></li> <li class="list-inline-item"><i class="fa fa-star-o"></i></li> <span class"total-reviews">' + TotalReviews + '</span> Reviews';
                        }
                        else if (productAverageRating > 3.5 && productAverageRating <= 4) {
                            starRating = '<li class="list-inline-item"><i class="fa fa-star"></i></li> <li class="list-inline-item"><i class="fa fa-star"></i></li> <li class="list-inline-item"><i class="fa fa-star"></i></li> <li class="list-inline-item"><i class="fa fa-star"></i></li> <li class="list-inline-item"><i class="fa fa-star-o"></i></li> <span class"total-reviews">' + TotalReviews + '</span> Reviews';
                        }
                        else if (productAverageRating > 4 && productAverageRating <= 4.5) {
                            starRating = '<li class="list-inline-item"><i class="fa fa-star"></i></li> <li class="list-inline-item"><i class="fa fa-star"></i></li> <li class="list-inline-item"><i class="fa fa-star"></i></li> <li class="list-inline-item"><i class="fa fa-star"></i></li> <li class="list-inline-item"><i class="fa fa-star-half-o"></i></li> <span class"total-reviews">' + TotalReviews + ' </span> Reviews';
                        }
                        else if (productAverageRating > 4.5 && productAverageRating <= 5) {
                            starRating = '<li class="list-inline-item"><i class="fa fa-star"></i></li> <li class="list-inline-item"><i class="fa fa-star"></i></li> <li class="list-inline-item"><i class="fa fa-star"></i></li> <li class="list-inline-item"><i class="fa fa-star"></i></li> <li class="list-inline-item"><i class="fa fa-star"></i></li> <span class"total-reviews">' + TotalReviews + '</span> Reviews';
                        }

                        var getImageGallery = result[i][j]['product_image_gallery'][1];

                        if (getImageGallery !== undefined) {
                            getImageGallery = '<img src="' + result[i][j]['product_image_gallery'][1] + '" class="img-responsive img-fluid" alt="">';
                        }
                        else {
                            getImageGallery = '<img src="' + result[i][j]['product_image_id'] + '" class="img-responsive img-fluid" alt="">';
                        }

                        itemList += '<div class="col-sm-3"><div class="thumb-wrapper"> <div class="img-box fader itemClick" data-id="' + result[i][j]['product_id'] + '"> <button class="productinfo itemClick" data-id="' + result[i][j]['product_id'] + '" style="position:absolute;z-index:100"> <i class="fa fa-info"></i> </button> <img src="' + result[i][j]['product_image_id'] + '" class="img-responsive img-fluid" alt="">' + getImageGallery + '</div> <div class="thumb-content"> <h4>' + result[i][j]['product_name'] + '</h4> <p class="item-price"><span>' + result[i][j]['product_currency_symbol'] + result[i][j]['product_price'] + '</span></p> <div class="star-rating"> <ul class="list-inline"> ' + starRating + '</ul> </div> <a href="#" id="" class="btn btn-primary addToCart phoen-login-signup-popup-open" data-id="' + result[i][j]['product_id'] + '">' + $('#send_button_name').val() + '</a> </div> </div> </div>';
                    }
                    itemList += '</div>';

                    getItemInner.append(itemList);
                    counter++;
                }
            }


        }
        appendItem();


        $('.addToCart').click(function () {
            var ProductID = $(this).data('id');

            var data = {
                action: 'is_user_logged_in'
            };

            jQuery.post(ajax_object.ajax_url, data, function (response) {
                if (response == 'yes') {
                    $('addToCart').removeClass('phoen-login-signup-popup-open');
                    addToCart(ProductID);
                    function refresh_fragments() {
                        console.log('fragments refreshed!');
                        $( document.body ).trigger( 'wc_fragment_refresh' );
                    }
                    
                    refresh_fragments();
                    setInterval(refresh_fragments, 10000);
                    
                }
            });

            function addToCart(p_id) {
                $.get('http://localhost/mamazon/?post_type=product&add-to-cart=' + p_id, function () {
                    // call back
                });
            }
        });

        $('.fader').hover(function () {
            $(this).find("img").fadeToggle();
        });

        jQuery('.itemClick').click(function () {
            var ProductID = $(this).data('id');
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
    }


    $('#save_location_address').click(function () {
        var account_first_name = $('#account_first_name').val();
        var account_last_name = $('#account_last_name').val();
        var account_address = $('#account_address').val();
        var account_phone = $('#account_phone').val();

        if (account_first_name == '' || account_address == '' || account_phone == '') {
            $('#error').show();
        }
        else {
            $('#error').hide();
            var base_url = window.location.origin + '/mamazon';
            var loading = '<img src="' + base_url + '/wp-content/plugins/woocommerce-product-carousel/assets/images/loading.gif" style="width: 15px;position: relative;right: -10px" id="loading-image">';
            var location_data = {
                "account_first_name": account_first_name,
                "account_last_name": account_last_name,
                "account_address": account_address,
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
                    $('#loading-image').hide();
                    $('#billing-address-block').show();
                    $([document.documentElement, document.body]).animate({
                        scrollTop: $("#billing-address-block").offset().top
                    }, 2000);

                },
                error: function (error) {
                    console.log(error); // For testing (to be removed)
                },
                complete: function () {
                    $('#loading-image').hide();
                },
            });
        }

    });

    $('#save_billing_address').click(function () {
        $('#loading-image').hide();
        var billing_first_name = $('#billing_first_name').val();
        var billing_address = $('#billing_address').val();
        var billing_phone = $('#billing_phone').val();
        if (billing_first_name == '' || billing_address == '' || billing_phone == '') {
            $('#error-2').show();
        }
        else {
            $('#error-2').hide();
            var base_url = window.location.origin + '/mamazon';
            var loading = '<img src="' + base_url + '/wp-content/plugins/woocommerce-product-carousel/assets/images/loading.gif" style="width: 15px;position: relative;right: -10px" id="loading-image">';
            var location_data = {
                "billing_first_name": billing_first_name,
                "billing_address": billing_address,
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
                    console.log(result);
                    // window.location.reload();

                },
                error: function (error) {
                    console.log(error); // For testing (to be removed)
                },
                complete: function () {
                    $('#loading-image').hide();
                },
            });
        }


    });

})