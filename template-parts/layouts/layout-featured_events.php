<?php

$title = get_sub_field('title');
$featured_events = get_sub_field('featured_events');
if (!$featured_events) {
    $featured_events = [];
}
?>

<div class="block whats_on_block padding bg_white">
    <div class="flex whats_on_block_header">
        <h2 class="black"><?php echo $title; ?></h2>
        <a href="<?php echo get_site_url() . '/whats-on'; ?>" class="uc black semibold"><?php echo __('See all events', 'soul'); ?> </a>
    </div>
    <ul class="grid grid_30 gap_3">
        <?php
        echo get_featured_events($featured_events);
        ?>
    </ul>
</div>