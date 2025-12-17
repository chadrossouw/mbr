<?php
/**
 * Carousels. Uses swiper, in js swiper.js and swiper-init.js, and in scss swiper.scss and carousels.scss
 */

function get_carousel($slides){ ?>
    <div class="carousel carousel--highlights">
        <div class="swiper-wrapper">
            <?php foreach($slides as $slide): ?>
                <div class="swiper-slide">
                    <?php echo $slide; ?>
                </div>
            <?php endforeach; ?>
        </div>
        <div class="button--prev"><span class="screen-reader-text">Previous Slide</span><?php echo file_get_contents(get_template_directory() . '/assets/prev.svg'); ?></div>
        <div class="button--next"><span class="screen-reader-text">Next Slide</span><?php echo file_get_contents(get_template_directory() . '/assets/prev.svg'); ?></div>
    </div>
<?php }

function get_carousel_highlights_with_zoom($slides, $zoom_slides){
    if($slides): ?>
        <div class="carousel carousel--highlights">
            <div class="swiper-wrapper">
                <?php foreach($slides as $i=>$slide): 
                    ?>
                    <div class="swiper-slide" data-index="<?php echo $i; ?>">
                        <?php echo $slide; ?>
                    </div>
                <?php endforeach; ?>
            </div>
            <div class="button--prev fill_black"><span class="screen-reader-text">Previous Slide</span><?php echo file_get_contents(get_template_directory() . '/assets/prev.svg'); ?></div>
            <div class="button--next fill_black"><span class="screen-reader-text">Next Slide</span><?php echo file_get_contents(get_template_directory() . '/assets/prev.svg'); ?></div>
        </div>
        <div class="carousel carousel--zoomer">
            <div class="slide_index"></div>
            <button class="close_zoomer"><?php echo file_get_contents(get_template_directory().'/assets/close.svg'); ?><span class="screen-reader-text">Close the highlights overlay</span></button>
            <div class="swiper-wrapper">
                <?php foreach($zoom_slides as $slide): ?>
                    <div class="swiper-slide">
                        <div class="slide-inner">
                            <?php echo $slide; ?>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
            <div class="button--prev zoomer-button"><span class="screen-reader-text">Previous Slide</span><?php echo file_get_contents(get_template_directory() . '/assets/prev.svg'); ?></div>
            <div class="button--next zoomer-button"><span class="screen-reader-text">Next Slide</span><?php echo file_get_contents(get_template_directory() . '/assets/prev.svg'); ?></div>
        </div>
    <?php endif; 
}