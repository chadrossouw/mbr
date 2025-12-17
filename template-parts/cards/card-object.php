<?php
$title = get_the_title($object);
$image = get_the_post_thumbnail($object, 'object_card');
if ($image) {

?>
    <div class="card card-object">
        <div class="card-object--image" data-index="<?php echo $index; ?>">
            <?php echo $image; ?>
            <button class="image_zoomer" data-index="<?php echo $index; ?>"><span aria-hidden="true"><?php echo file_get_contents(get_template_directory() . '/assets/zoom.svg'); ?></span><span class="screen-reader-text"><?php echo __('Open a zoomed image'); ?></span></button>
        </div>
    </div>
<?php }
