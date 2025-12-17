<?php
$id = get_the_ID();
$title = get_sub_field('title');
$images = get_sub_field('images', $id);
$link_label = get_sub_field('link_label', $id);
$file = get_sub_field('document', $id);
?>
<div class="block cafe_menu padding <?php echo $with_title ? 'bg_teal' : 'bg_white' ?>">
    <div class="flex cafe_menu_header">
        <h2 class="black"><?php echo $title; ?></h2>
        <?php if ($file) :
            echo get_link_file($file, $file_label, 'arrowed uc');
        endif; ?>
    </div>
    <div class="images grid grid_30 gap_3">
        <?php foreach ($images as $image_id) {
            $image = isset($image_id['image']) ? $image_id['image'] : null;
            echo wp_get_attachment_image($image, 'full');
        } ?>
    </div>
</div>