<?php
$id = get_the_ID();
$title = get_sub_field('title');
$objects = get_sub_field('event_types', $id);
?>
<div class="block event_carousel padding bg_white">
    <div class="flex whats_on_block_header">
        <h2 class="black"><?php echo $title; ?></h2>
    </div>
    <div class="carousel carousel--event_types">
        <div class="swiper-wrapper">
            <?php foreach ($objects as $block) {
                include get_template_directory() . '/template-parts/cards/card-carousel-event.php';
            } ?>
        </div>
        <div class="button--prev"><span class="screen-reader-text">Previous Slide</span><?php echo file_get_contents(get_template_directory() . '/assets/prev.svg'); ?></div>
        <div class="button--next"><span class="screen-reader-text">Next Slide</span><?php echo file_get_contents(get_template_directory() . '/assets/prev.svg'); ?></div>

    </div>
</div>