<?php

$scroll_text = get_sub_field('scroll_over_text');
$use_artworks = get_sub_field('use_artworks');
$text_left = get_sub_field('text_on_the_left');
$contain = get_sub_field('contain');
$anchor = get_sub_field('anchor');
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


<div class="essay-layout scroll-detect scroll-over-block card">
    <div class="essay-artwork-image <?php echo $contain ? 'contain' : ''; ?> <?php echo $anchor ?: ''; ?>" style="background-image: url('<?php echo esc_url($image); ?>');" >
        <span class="screen-reader-text">
            <?php echo esc_html($title); ?>
            <?php if ($artist_name) : ?>
                <?php echo esc_html($artist_name); ?>
            <?php endif; ?>
            <?php if ($date) : ?>
                <?php echo esc_html($date); ?>
            <?php endif; ?>
        </span>
    </div>
    <div class="scroll-over-block__overlay-text white bg-brown scroll-detect <?php echo $text_left ? 'text-left' : ''; ?>">
        <?php echo apply_filters('the_content', $scroll_text); ?>
    </div>
    <div class="scroll-over-block__meta essay-artwork-meta white card-meta-padding">
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
            <p class="artwork-date"><?php echo esc_html($date); ?></p>
        <?php endif; ?>

    </div>

</div>