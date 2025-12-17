<?php $image = get_sub_field('image');
if($image): ?>
    <div class="full_width container container--twentyonenine">
        <?php echo wp_get_attachment_image($image, 'full'); ?>
    </div>
<?php endif; ?>