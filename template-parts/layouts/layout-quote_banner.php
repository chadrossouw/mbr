<?php
$background_color = get_sub_field('background_colour');
$quote = get_sub_field('quote');
$pattern = get_sub_field('background_pattern');
$show_multiple_quotes = get_sub_field('add_multiple_quotes');
$quotes = get_sub_field('quotes');
$attribution = get_sub_field('attribution');
$slide_count = 0;
?>
<?php if ($show_multiple_quotes === false) {

?>
    <div class="banner quote_banner <?php echo $background_color; ?> pattern_<?php echo $pattern; ?>">
        <div class="big_text playfair white single_quote">
            <q><?php echo $quote; ?></q>
        </div>
        <?php echo $attribution ? '<p class="centre center white uc bold">' . $attribution . '</p>' : ''; ?>
    </div>
<?php } else { ?>
    <div class="banner quote_banner <?php echo $background_color; ?> pattern_<?php echo $pattern; ?> swiper carousel quote-carousel-carousel">
        <div class="swiper-wrapper quote-carousel-wrapper">
            <?php
            foreach ($quotes as $quote):
                $slide_count++
            ?>
                <div class="swiper-slide quote-carousel-slide">
                    <div class="big_text playfair white ">
                        <q><?php echo $quote['quote']; ?></q>
                    </div>
                    <?php echo $quote['attribution'] ? '<p class="centre center white uc bold">' . $quote['attribution'] . '</p>' : ''; ?>
                </div>
            <?php endforeach;

            ?>
        </div>
        <?php
        if ($slide_count > 1) { ?>
            <div class="swiper-button-prev button--prev quote-carousel-prev"><span class="screen-reader-text">Previous Slide</span><?php echo file_get_contents(get_template_directory() . '/assets/carousel-prev.svg'); ?></div>
            <div class="swiper-button-next button--next quote-carousel-next"><span class="screen-reader-text">Next Slide</span><?php echo file_get_contents(get_template_directory() . '/assets/carousel-prev.svg'); ?></div>
            <div class="swiper-pagination"></div>
        <?php
        } ?>
    </div>

<?php } ?>