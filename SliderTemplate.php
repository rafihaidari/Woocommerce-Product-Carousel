<?php
/*
* @package wooCommerce-product-carousel
*/

if (!defined('ABSPATH')) {
    die;
}

?>
</head>

<body>
    <div class="container" id="product-page">
        <div class="row">
            <div class="col-md-12">
                <h2>Our full <b>collection</b></h2>
                <div id="myCarousel" class="carousel slide" data-ride="carousel" data-interval="0">
                    <!-- Carousel indicators -->
                    <ol class="carousel-indicators">
                        <!-- Carousel inidcators be added here by Ajax-load.js -->
                    </ol>
                    <!-- Wrapper for carousel items -->
                    <div class="carousel-inner" id="items-inner">
                        <!-- Items will be added here by Ajax-load.js -->

                    </div>
                    <!-- Carousel controls -->
                    <a class="carousel-control left carousel-control-prev" href="#myCarousel" data-slide="prev">
                        <i class="fa fa-angle-left"></i>
                    </a>
                    <a class="carousel-control right carousel-control-next" href="#myCarousel" data-slide="next">
                        <i class="fa fa-angle-right"></i>
                    </a>
                </div>
            </div>
        </div>

    </div>

    <div id="myModal" class="modal fade" role="dialog" style="padding-right: 0!important;">
        <div class="modal-dialog" style="width: 65%;">

            <!-- Modal content-->
            <div class="modal-content" style="border-radius: 0;">
                <div class="row" style="margin: 0; padding:0">
                    <div class="col-md-5" style="background:#84976f30;min-height: 630px;">

                        <div class="product-slider">
                            <div id="carousel" class="carousel slide" data-ride="carousel">
                                <div class="carousel-inner" id="main-slider-box">
                                    
                                </div>
                            </div>
                            <div class="clearfix">
                                <div id="thumbcarousel" class="carousel slide" data-interval="false">
                                    <div class="carousel-inner">
                                        <div class="item active" id="gallery-slide-item">
                                            <!-- Data will be added here by Ajax-load.js -->
                                        </div>
                                    </div>
                                </div>
                                <!-- /thumbcarousel -->

                            </div>
                        </div>

                    </div>

                    <div class="col-md-7">
                        <div class="modal-header">
                            <img src="<?php echo plugin_dir_url(__FILE__); ?>/assets/images/x.svg" style="position:inherit;" class="close" data-dismiss="modal">
                            <h4 class="modal-title" id="modal-title" style="display: inline-block;color: #000;font-size:25px;">
                                <!-- Data will be added here by Ajax-load.js -->
                            </h4>
                            <a href="#" class="btn btn-primary send-btn">Send Now <span id="btn-price"></span></a>
                        </div>
                        <div class="modal-body">
                            <!-- Data will be added here by Ajax-load.js -->
                        </div>
                        <!-- <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        </div> -->
                    </div>
                </div>

            </div>
        </div>
    </div>