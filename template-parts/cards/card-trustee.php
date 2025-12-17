<?php

$name = isset($block['name']) ? $block['name'] : null;
$title = isset($block['title']) ? $block['title'] : null;
$image = isset($block['image']) ? $block['image'] : null;
$image = wp_get_attachment_image($image, 'full');
$description = $block['description'];
$description = apply_filters('the_content', $description);
?>
<div class="card trustee grid">
    <h3 class="name uc"><?php echo $name; ?></h3>
    <h5><?php echo $title; ?></h5>
    <?php if ($image) { ?>
        <div class="container container--twothree">
            <?php echo $image; ?>
        </div>
    <?php } ?>
    <?php echo $description; ?>
</div>