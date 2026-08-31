<?php if ( ! have_rows('column') ) { return; } ?>

<div class="essay-layout three-column-layout">

<?php while ( have_rows('column') ) : the_row();

    $use_artworks = get_sub_field('use_artwork_product');

    $image = null;
    $title = '';
    $link = null;
    $artist_output = '';

    /*
     * Artwork/product selected
     */
    if ($use_artworks) {

        $artwork = get_sub_field('artwork');

        if ( ! empty($artwork) ) {

            // Relationship field returns an array (max 1)
            $artwork_post = is_array($artwork) ? $artwork[0] : $artwork;

            $product_id = is_object($artwork_post)
                ? $artwork_post->ID
                : $artwork_post;

            $image = get_the_post_thumbnail_url(
                $product_id,
                'large'
            );

            $title = get_the_title($product_id);

            $link = get_permalink($product_id);

            /*
             * Artist relationship
             */
            $artists = get_field('artists', $product_id);

            $artist_names = [];

            if ( ! empty($artists) ) {

                foreach ( $artists as $artist ) {

                    $artist_names[] = is_object($artist)
                        ? get_the_title($artist->ID)
                        : get_the_title($artist);
                }
            }

            if ( count($artist_names) > 1 ) {

                $last_artist = array_pop($artist_names);

                $artist_output =
                    implode(', ', $artist_names) .
                    ' & ' .
                    $last_artist;

            } else {

                $artist_output = $artist_names[0] ?? '';
            }
        }

    /*
     * Standalone image selected
     */
    } else {

        $title = get_sub_field('caption');

        $image = get_sub_field('image');

        if ( $image ) {
            $image = wp_get_attachment_image_url(
                $image,
                'full'
            );
        }
    }

?>

    <a class="three-col-card" href="<?php echo esc_url($link); ?>">
        <div class="essay-artwork card">
            <div class="essay-artwork-image">

                <?php if ( $image ) : ?>

                    <img
                        src="<?php echo esc_url($image); ?>"
                        alt="<?php echo esc_attr(wp_strip_all_tags($title)); ?>"
                        oncontextmenu="return false;"
                    >

                <?php endif; ?>

            </div>

            <div class="essay-artwork-meta inside-grid white card-meta-padding">

                <?php if ( ! empty($artist_output) ) : ?>

                    <h2 class="artwork-artist card-artists">
                        <?php echo esc_html($artist_output); ?>
                    </h2>

                <?php endif; ?>

                <?php if ( $title ) : ?>

                    <div class="caption card-title">
                        <?php echo apply_filters('the_content', $title); ?>
                    </div>

                <?php endif; ?>


            </div>
        </div>
    </a>

<?php endwhile; ?>