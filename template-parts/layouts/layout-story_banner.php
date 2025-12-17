<?php
$image = get_sub_field('image');
$title = get_sub_field('title');
$sticker_text = get_sub_field('sticker_text');
$description = get_sub_field('description');
$link = get_sub_field('link');
$year = get_sub_field('year');
$background_color =  get_sub_field('background_color');
$image = wp_get_attachment_image($image, 'full');
$video = get_sub_field('video_url');
$is_video = get_sub_field('video_banner');
?>
<div class="block padding story-banner gap_2 <?php echo $background_color ?> grid grid_50">
    <div class="story-banner-content content padding_2">
        <?php if ($sticker_text && !$is_video): ?>
            <div class="sticker">
                <?php echo $sticker_text ?>
            </div>
        <?php endif; ?>
        <h2 class="bold"><?php echo $title; ?></h2>
        <?php if ($year && !$is_video): ?>
            <h3 class=""><?php echo $year; ?></h3>
        <?php endif; ?>
        <p class=""><?php echo $description; ?></p>
        <?php echo $link ? get_link_normal($link) : ''; ?>
    </div>
    <div class="container container--sixteennine">
        <?php if ($video) {
            echo get_player($video, false);
        } else {
            echo $image;
        };

        ?>
    </div>
</div>