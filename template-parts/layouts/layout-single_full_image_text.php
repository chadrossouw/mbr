<?php

$use_artworks = get_sub_field('use_artwork_product');
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
    $artists = get_field('artists', $product_id);

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
    $image = $image?wp_get_attachment_image_url($image, 'large'):null;
} ?>


<div class="essay-layout card single-full-image-text padding">

    <?php if ($link) : ?> <a class="three-col-card" href="<?php echo esc_url($link); ?>"> <?php else : ?> <div class="three-col-card"> <?php endif; ?>
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

            <?php if ($artist_output) : ?>
                <p class="artwork-artist">
                    <?php if ($link) : ?>
                        <?php echo esc_html($artist_output); ?>
                    <?php else : ?>
                        <?php echo esc_html($artist_output); ?>
                    <?php endif; ?>
                </p>
            <?php endif; ?>

        </div>
    <?php if ($link) : ?> </a> <?php else : ?> </div> <?php endif; ?>

</div>