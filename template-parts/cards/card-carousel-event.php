<?php
$image = isset($block['event_image']) ? $block['event_image'] : null;
$image = wp_get_attachment_image($image, 'full');
$title = $block['event_title'];
$link = $block['link'];

?>
<div class="card grid gap_1 swiper-slide card-event-slide  bg_beige padding_2">
    <h4 class="regular"><?php echo $title; ?></h4>
    <div class="container container--square">
        <?php echo $image; ?>
    </div>
    <?php echo get_link_normal($link); ?>
</div>