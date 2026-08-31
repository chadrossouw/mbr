<?php
$use_artworks = get_sub_field('use_artwork_product');
$contain = get_sub_field('contain');
$anchor = get_sub_field('anchor');
$link = null;
if($use_artworks){
// Relationship field returns array (max 1)
    $artwork = get_sub_field('artwork');
    $artwork_post = $artwork[0];
    $artwork_id = $artwork_post->ID;

    $product_id = is_object( $artwork_post ) ? $artwork_post->ID : $artwork_post;
    $image  = get_the_post_thumbnail_url( $product_id, 'large' );
    $title           = get_the_title( $product_id );
    $link            = get_permalink($product_id);

    $artists = get_field( 'artists', $product_id );

    $artist_names = [];

    if ( ! empty( $artists ) ) {

        foreach ( $artists as $artist ) {

            $artist_names[] = is_object( $artist )
                ? get_the_title( $artist->ID )
                : get_the_title( $artist );
        }
    }

    if ( count( $artist_names ) > 1 ) {

        $last_artist = array_pop( $artist_names );

        $artist_output = implode( ', ', $artist_names ) . ' & ' . $last_artist;

    } else {

        $artist_output = $artist_names[0] ?? '';
    }
}
else{
    $title = get_sub_field('caption');
    $image = get_sub_field('image');
    $image = $image?wp_get_attachment_image_url($image, 'full'):null;
} ?>

<div class="essay-layout parallax-effect-block parallax card">

    <div class="essay-artwork-image <?php echo $contain ? 'contain' : ''; ?> <?php echo $anchor ?: ''; ?>" style="background-image: url('<?php echo esc_url($image); ?>');" >
        <span class="screen-reader-text">
            <?php echo esc_html($title); ?>
            <?php if (!empty($artist_output)) : ?>
                <?php echo esc_html($artist_output); ?>
            <?php endif; ?>
        </span>
    </div>

    <div class="essay-artwork-meta white card-meta-padding">

        <?php if ($title) : ?>

                <div class="caption">
                    <?php echo apply_filters('the_content', $title); ?>
                </div>
            

        <?php endif; ?>

        <?php if (!empty($artist_output)) : ?>
            <p class="artwork-artist">
                <?php echo esc_html($artist_output); ?>
            </p>
        <?php endif; ?>

       <?php if($link): ?>
            <a class="artwork-link" href="<?php echo esc_url($link); ?>">
                <?php echo esc_html__('View Artwork', 'mbr'); ?>
            </a>
        <?php endif; ?>

    </div>

</div>