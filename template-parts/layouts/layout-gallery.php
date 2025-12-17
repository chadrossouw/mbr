<?php
$id = get_the_ID();
$images = get_sub_field('images', $id);
$show_captions = get_sub_field('show_captions', $id);
$layout = get_sub_field('layout', $id);
if (!$images) {
    return;
}
if($layout == 'grid' || !$layout){

?>
<div class="block image_gallery grid margins gap_2" id="image_grid">
    <?php
    $index = 0;

    foreach ($images as $image_id) {
        $cycle = $index % 7;

        if ($cycle === 0 || $cycle === 3 || $cycle === 4 || $cycle === 7 % 7) {
            $orientation = 'landscape';
        } else {
            $orientation = 'portrait';
        }
    ?>
        <div class="image-wrapper <?php echo $orientation; ?>">
            <?php echo wp_get_attachment_image($image_id, 'full');
            if ($show_captions) {
            ?>
                <p class="caption small"><?php echo wp_get_attachment_caption($image_id); ?></p>
            <?php } ?>
        </div>
    <?php
        $index++;
    }
    ?>
</div>
<?php }
else{
    $title = get_sub_field('title');
    $slides = array_map(function ($object, $index) {
       $image = wp_get_attachment_image($object, 'object_card');
       ob_start();?>
       <div class="card card-object">
            <div class="card-object--image" data-index="<?php echo $index; ?>">
                <?php echo $image; ?>
                <button class="image_zoomer" data-index="<?php echo $index; ?>"><span aria-hidden="true"><?php echo file_get_contents(get_template_directory() . '/assets/zoom.svg'); ?></span><span class="screen-reader-text"><?php echo __('Open a zoomed image'); ?></span></button>
            </div>
        </div>
        <?php return ob_get_clean();
    }, $images, array_keys($images));
    $zoom_slides = array_map(function ($object, $index) use ($show_captions) {
        $image = wp_get_attachment_image($object, 'full'); 
        ob_start(); ?>
        <div class="card card-object card-object--zoom">
            <div class="card-object--image">
                <?php echo $image; ?>
            </div>
            <div class="card-object--text">
                <?php if ($show_captions) {
                    ?>
                        <p class="caption small"><?php echo wp_get_attachment_caption($object); ?></p>
                <?php } ?>
            </div>
        </div>
        <?php return ob_get_clean();
    }, $images, array_keys($objects));
    $slides = array_filter($slides);
    $zoom_slides = array_filter($zoom_slides);
    ?>
    <div class="gallery_carousel padding-left bg_beige">
        <h3 class="uc black centra semibold"><?php echo $title; ?></h3>
        <?php get_carousel_highlights_with_zoom($slides, $zoom_slides); ?>
    </div>
<?php }