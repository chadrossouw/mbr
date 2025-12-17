<?php 
$image = get_sub_field('image');
if($image): ?>
    <div class="content_image">
        <?php echo wp_get_attachment_image($image, 'large'); ?>
    </div>
<?php else: 
   $image = get_sub_field('image-block');
   if($image&&count($image) ==2): ?>
        <div class="content_image pair">
            <?php foreach($image as $img): ?>
                <div class="content_image__image">
                    <?php echo wp_get_attachment_image($img['ID'], 'large'); ?>
                </div>
            <?php endforeach; ?>
        </div>
    <?php
    elseif($image): ?>
        <div class="content_image">
            <?php echo wp_get_attachment_image($image[0]['ID'], 'large'); ?>
        </div>
    <?php endif; 
endif; ?>