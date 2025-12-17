<?php
$title = get_sub_field('title');
$description = get_sub_field('description');
$image = get_sub_field('image');
$image = wp_get_attachment_image($image, 'full');
$inverted = get_sub_field('invert_layout');
$_id = get_sub_field('section_id');
?>

<div class="card card-image-and-text grid grid_50 gap_5 <?php echo $inverted ? 'grid_invert' : ''; ?> padding" id="<?php echo $_id; ?>">
    <div class="container container--threetwo">
        <?php echo $image; ?>
    </div>
    <div class="padding_2">
        <h2 class="black bold"><?php echo $title; ?></h2>
        <div class="links">
            <?php
            echo $description?apply_filters('the_content', $description): '';
            ?>
        </div>

    </div>
</div>