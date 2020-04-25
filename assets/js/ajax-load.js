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
            var perChunk = 4 // items per chunk    

            var result = return_result.reduce((resultArray, item, index) => {
                const chunkIndex = Math.floor(index / perChunk)

                if (!resultArray[chunkIndex]) {
                    resultArray[chunkIndex] = [] // start a new chunk
                }
                resultArray[chunkIndex].push(item)
                return resultArray
            }, [])

            // console.log(result);
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
            for (i = 0; i < result.length; i++) {
                if (counter == 1) {
                    active = 'active';
                }
                else {
                    active = '';
                }
                itemList = '<div class="item carousel-item ' + active + '"> <div class="row">';
                for (j = 0; j < result[i].length; j++) {
                    
                    var getImageGallery = result[i][j]['product_image_gallery'][1];

                    if(getImageGallery !== undefined){
                        getImageGallery = '<img src="' + result[i][j]['product_image_gallery'][1] + '" class="img-responsive img-fluid" alt="">';
                    }
                    else{
                        getImageGallery = '<img src="' + result[i][j]['product_image_id'] + '" class="img-responsive img-fluid" alt="">';
                    }

                    itemList += '<div class="col-sm-3"><div class="thumb-wrapper"> <div class="img-box fader"> <button class="productinfo" data-id="' + result[i][j]['product_id'] + '" style="position:absolute;z-index:100"> <i class="fa fa-info"></i> </button> <img src="' + result[i][j]['product_image_id'] + '" class="img-responsive img-fluid" alt="">'+getImageGallery+'</div> <div class="thumb-content"> <h4>' + result[i][j]['product_name'] + '</h4> <p class="item-price"><span>' + result[i][j]['product_currency_symbol'] + result[i][j]['product_price'] + '</span></p> <div class="star-rating"> <ul class="list-inline"> <li class="list-inline-item"><i class="fa fa-star"></i></li> <li class="list-inline-item"><i class="fa fa-star"></i></li> <li class="list-inline-item"><i class="fa fa-star"></i></li> <li class="list-inline-item"><i class="fa fa-star"></i></li> <li class="list-inline-item"><i class="fa fa-star-o"></i></li> </ul> </div> <a href="#" class="btn btn-primary">Send</a> </div> </div> </div>';
                }
                itemList += '</div>';

                getItemInner.append(itemList);
                counter++;
            }
        }
        appendItem();

        $('.fader').hover(function() {
            $(this).find("img").fadeToggle();
        });

        jQuery('.productinfo').click(function () {
            var userid = $(this).data('id');

            function findId(return_result, item) {
                var itemArray = return_result;
                for (var i = 0; i < return_result.length; i++) {
                    if (itemArray[i]['product_id'] == item) {
                        return (itemArray[i]);
                    }
                }
            }

            var res = findId(return_result, userid);

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

                    SlideItem.append('<div data-target="#carousel" data-slide-to="' + i + '" class="thumb"><img src="' + res['product_image_gallery'][i] + '"></div>');
                }
            }
            else{
                MainSlideBox.append('<div class="item active"> <img src="https://via.placeholder.com/500/?text=Add%20Gallery"> </div>');
            }


            // Display Modal
            jQuery('#myModal').modal('show');
        });
    }

})