<?php
$images = get_sub_field('images');
if($images): ?>
    <div class="content_image_gallery grid grid_30 gap_1">
        <?php foreach($images as $image): ?>
            <div class="content_image_gallery__image">
                <?php echo wp_get_attachment_image($image, 'large'); ?>
            </div>
        <?php endforeach; ?>
    </div>
<?php endif; ?>