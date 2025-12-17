<?php
if ($block['add_link']) {
    $link = isset($block['link']) ? $block['link'] : null;
} else {
    $link = null;
}

if ($block['add_email']) {
    $email_label = isset($block['email_label']) ? $block['email_label'] : null;
    $email = isset($block['email']) ? $block['email'] : null;
} else {
    $email = null;
}

if ($block['add_file']) {
    $file_label = isset($block['file_label']) ? $block['file_label'] : null;
    $file = isset($block['file']) ? $block['file'] : null;
} else {
    $file = null;
}

$background_color = isset($block['background_color']) ? $block['background_color'] : null;
$title = $block['title'];
$link_title = isset($link['title']) ? $link['title'] : null;
$icon = isset($block['icon']) ? $block['icon'] : '';
$image = isset($block['image']) ? $block['image'] : null;
$image = wp_get_attachment_image($image['ID'], 'card_image');
$description = $block['description'];
$description = apply_filters('the_content', $description);
?>
<div class="card card--page-links card--page-links-stack grid grid_50 gap_5 <?php echo $align_image == 'right' ? ($i % 2 !== 0 ? '' : 'grid_invert') : ($i % 2 !== 0 ? 'grid_invert' : ''); ?> padding <?php echo $background_color; ?>">


    <?php echo $image; ?>

    <div class="padding_2">
        <h3 class="bold"><?php echo $title; ?></h3>
        <div class="links">
            <?php
            echo $description;
            if ($link) {
                echo get_link_normal($link);
            }
            if ($email) {
                echo get_link_email($email, $email_label);
            }
            if ($file) {
                echo get_link_file($file, $file_label);
            }

            ?>
        </div>

    </div>
</div>