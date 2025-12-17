<?php
$title = get_sub_field('info-carousel-title', $id)?get_sub_field('info-carousel-title', $id):false;
$slides = get_sub_field('info-carousel-slides', $id);
$slide_count = count($slides);

   ?>
<section class="info-carousel info-carousel-<?php echo $slide_count; ?> padding bg_white half_bg_carousel_grey <?php echo $title?'':'no_title'; ?>">
    <?php if($title){
        ?><h3 class ="info-carousel-title title content-title uc bold teal brother"><?php echo $title;?></h3><?php
        } ?>
    <?php if($slides){?>
            <div class = "swiper carousel info-carousel-carousel">
                <div class = "swiper-wrapper info-carousel-wrapper">
                    <?php 
                    ob_start();
                    foreach($slides as $slide){
                        $slide_image = $slide['image'];
                        $slide_title = $slide['title'];
                        $slide_info = $slide['info'];?>

                        <div class = "swiper-slide info-carousel-slide">
                            <div class = "info-carousel-slide-image slide-image container container--square">
                                <?php echo wp_get_attachment_image($slide_image, 'large');?>
                            </div>
                            <div class = "info-carousel-slide-info slide-info">
                                <h4 class = "teal uc info-carousel-slide-title slide-info-title title item-title bold"><?php echo $slide_title;?></h4>
                                <p class = "black info-carousel-slide-info slide-info-info"><?php echo $slide_info;?></p>
                            </div>
                        </div>
                    <?php
                    }
                    $output = ob_get_clean();
                    if($slide_count > 4 && $slide_count<9){
                        $output .= $output;
                    }
                    echo $output;
                    ?>
                </div>
            </div>
             <?php
                if($slide_count > 4){?>
                        <div class="swiper-button-prev button--prev info-carousel-prev"><span class="screen-reader-text">Previous Slide</span><?php echo file_get_contents(get_template_directory() . '/assets/carousel-prev.svg'); ?></div>
                        <div class="swiper-button-next button--next info-carousel-next"><span class="screen-reader-text">Next Slide</span><?php echo file_get_contents(get_template_directory() . '/assets/carousel-prev.svg'); ?></div>
                    <?php
                    }?>
            <?php
    } ?>
</section>