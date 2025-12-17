<?php
$url = get_sub_field('url') ?: get_sub_field('video_url') ?: get_sub_field('youtube_url');
$title = '<h4>' . get_sub_field('video_title') . '</h4>' ? get_sub_field('title') : '';
$caption = get_sub_field('caption') ?: get_sub_field('video_caption');
if ($url): ?>
    <div class="content_video card grid gap">
        <div class="container container--sixteennine">
            <?php echo get_player($url); ?>
        </div>
        <p class="bold"><?php echo $title; ?></p>
        <div class="caption"><?php echo apply_filters('the_content', $caption); ?></div>
    </div>
<?php endif;
