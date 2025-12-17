<?php
$object = get_post($block);
$title = get_the_title($block);
$image = get_the_post_thumbnail($block);
$link = get_permalink($block);
$full_description = apply_filters('the_content', (get_field('description', $block)));
?>
<div class="card grid gap_2 swiper-slide card-event-slide bg_white padding_2">
    <div class="container container--threetwo card-image">
        <?php echo $image; ?>
    </div>
    <h4 class="regular"><?php echo $title; ?></h4>
    <p>
        <?php
        $words = explode(' ', strip_tags($full_description)); // strip_tags to avoid breaking HTML

        if (count($words) > 20) {
            $short_description = implode(' ', array_slice($words, 0, 20)) . '...';
            echo $short_description;
        } else {
            echo $full_description;
        }
        ?>
    </p>
    <a href="<?php echo $link; ?>" class="arrowed bold">Read full story</a>
</div>