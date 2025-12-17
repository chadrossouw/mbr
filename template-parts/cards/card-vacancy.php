<?php

$file_label = 'Download job description pdf';
$file = isset($block['file']) ? $block['file'] : null;
$title = $block['job_title'];
$image = isset($block['image']) ? $block['image'] : null;
$image = wp_get_attachment_image($image, 'full');
$description = $block['description'];
$description = apply_filters('the_content', $description);
?>
<div class="card vacancy grid grid_1_2 gap_2">

    <div class="container container--threetwo">
        <?php echo $image; ?>
    </div>
    <div class="description">
        <h3 class="black bold uc"><?php echo $title; ?></h3>
        <?php
        echo $description;
        if ($file) {
            echo get_link_file($file, $file_label);
        }
        ?>
    </div>
</div>