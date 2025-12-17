<?php

$file_label = 'Download job description pdf';
$file = isset($block['file']) ? $block['file'] : null;
$title = $block['title'];
$image = isset($block['image']) ? $block['image'] : null;
$image = wp_get_attachment_image($image, 'full');
$description = $block['description'];
$description = apply_filters('the_content', $description);
$background_color = isset($block['background_color']) ? $block['background_color'] : null;
?>
<div class="card volunteer_vacancy grid gap_1 padding_2 <?php echo $background_color ?>">

    <div class="container container--threetwo">
        <?php echo $image; ?>
    </div>
    <div class="">
        <h3 class="black bold"><?php echo $title; ?></h3>
        <?php
        echo $description;
        if ($file) {
            echo get_link_file($file, $file_label);
        }

        ?>
    </div>
    <div class="empty"></div>
</div>