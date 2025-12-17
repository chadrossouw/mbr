<?php 
$title = get_sub_field('header');
$icon = get_sub_field('icon');
$description = get_sub_field('text');
$image = get_sub_field('image');
if($image):
    $image = wp_get_attachment_image($image, 'full');
endif;
?>
<div class="collection_description grid grid_50 padding gap_3">
    <div class="collection_description--text white">
        <?php echo get_header_with_icon($title, $icon); ?>
        <?php echo apply_filters('the_content',$description); ?>
    </div>
    <?php if($image): ?>
        <div class="padding-right">
            <div class="collection_description--image container container--square rounded">
                <?php echo $image; ?>
            </div>
        </div>
    <?php endif; ?>
</div>