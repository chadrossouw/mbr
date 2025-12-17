<?php
$supporter_logos = get_sub_field('supporter_logos');

if ($supporter_logos): ?>
    <div class="supporter_logos grid grid_30 gap_1">
        <?php foreach ($supporter_logos as $supporter_logo):
            $id = isset($supporter_logo['logo_image'])?$supporter_logo['logo_image']:false;
                if($id):
            ?>
                <div class="supporter_logo">
                    <?php echo wp_get_attachment_image($id, 'large'); ?>
                </div>
            <?php endif;
        endforeach; ?>
    </div>
<?php endif; ?>