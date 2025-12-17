<?php
$title = get_sub_field('title');
$objects = get_sub_field('objects');
$slides = array_map(function ($object, $index) {
    ob_start();
    include get_template_directory() . '/template-parts/cards/card-object.php';
    return ob_get_clean();
}, $objects, array_keys($objects));
$zoom_slides = array_map(function ($object, $index) {
    ob_start();
    include get_template_directory() . '/template-parts/cards/card-object-zoom.php';
    return ob_get_clean();
}, $objects, array_keys($objects));
$slides = array_filter($slides);
$zoom_slides = array_filter($zoom_slides);
?>
<div class="collection_objects padding-left">
    <h3 class="uc black centra semibold"><?php echo $title; ?></h3>
    <?php get_carousel_highlights_with_zoom($slides, $zoom_slides); ?>
</div>