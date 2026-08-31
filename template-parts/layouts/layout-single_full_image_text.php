<?php

$use_artworks = get_sub_field('use_artworks');
if($use_artworks){
// Relationship field returns array (max 1)
    $artwork = get_sub_field('artwork');
    $artwork_post = $artwork[0];
    $artwork_id = $artwork_post->ID;

    $image = get_field('artwork_image', $artwork_id);
    $title = get_field('artwork_caption', $artwork_id);
    $date  = get_field('art_date', $artwork_id);

    // artist relationship
    $artist = get_field('artist_name', $artwork_id);

    if (is_array($artist)) {
        $artist = $artist[0];
    }

    $artist_name = $artist ? get_the_title($artist->ID) : null;
    $artist_link = $artist ? get_permalink($artist->ID) : null;
}
else{
    $title = get_sub_field('image_caption');
    $image = get_sub_field('image');
    $image = $image?wp_get_attachment_image_url($image, 'full'):null;
} ?>


<div class="essay-layout card">

    <div class="essay-artwork-image">

        <?php if ($image) : ?>
            <img class="" src="<?php echo esc_url($image); ?>" alt="<?php echo esc_attr($title); ?>" oncontextmenu="return false;">
        <?php endif; ?>

    </div>

    <div class="essay-artwork-meta white card-meta-padding">

        <?php if ($title) : ?>

                <div class="caption">
                    <?php echo apply_filters('the_content', $title); ?>
                </div>
        <?php endif; ?>

        <?php if ($artist_name) : ?>
            <p class="artwork-artist">
                <?php if ($artist_link) : ?>
                    <a class="artwork-title card_target" href="<?php echo esc_url($artist_link); ?>"><?php echo esc_html($artist_name); ?></a>
                <?php else : ?>
                    <?php echo esc_html($artist_name); ?>
                <?php endif; ?>
            </p>
        <?php endif; ?>

        <?php if ($date) : ?>
            <p class="artwork-date">
                <?php echo esc_html($date); ?>
            </p>
        <?php endif; ?>

    </div>

</div>