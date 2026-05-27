<?php
get_header();
?>

<main id="primary" class="site-main single-exhibition-page">

<?php while (have_posts()) : the_post(); ?>

    <?php
    $featured_image = get_the_post_thumbnail_url(get_the_ID(), 'large');
    $artists        = get_field('artists');
    $description    = get_field('exhibition_description');
    $long_description = get_field('exhibition_long_content');
    $related_artworks = get_field('artworks');

    // Build artist names
    $artist_names = [];

    if (!empty($artists)) {
        foreach ($artists as $artist) {

            $artist_names[] = is_object($artist)
                ? get_the_title($artist->ID)
                : get_the_title($artist);
        }
    }

    if (count($artist_names) > 1) {
        $last_artist  = array_pop($artist_names);
        $artist_output = strtoupper(
            implode(', ', $artist_names) . ' & ' . $last_artist
        );
    } else {
        $artist_output = strtoupper($artist_names[0] ?? '');
    }
    ?>

    <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

        <section class="page-content">

            <!-- TOP SECTION -->
            <section class="single-exhibition-top three-col-grid with-1-col-2-col">

                <div class="exhibition-meta three-col-card">

                    <div class="card-text">
                        <?php if (!empty($artist_output)) : ?>
                            <h2 class="card-artists">
                                <?php echo esc_html($artist_output); ?>
                        </h2>
                        <?php endif; ?>

                        <p class="card-title">
                            <?php the_title(); ?>
                        </p>
                    </div>

                </div>

                <div class="exhibition-image two-column-span">

                    <?php if (!empty($featured_image)) : ?>
                        <img
                            src="<?php echo esc_url($featured_image); ?>"
                            alt="<?php echo esc_attr(get_the_title()); ?>"
                        >
                    <?php endif; ?>

                </div>

            </section>


            <!-- DESCRIPTION SECTION -->
            <section class="single-exhibition-description three-col-grid">

                <div class="empty-column three-col-card"></div>

                <div class="description-content two-column-span">

                    <?php if (!empty($description)) : ?>
                        <?php echo wp_kses_post($description); ?>
                    <?php endif; ?>

                </div>

            </section>


            <!-- RELATED ARTWORKS -->
            <?php if (!empty($related_artworks)) : ?>

                <section class="related-artworks">

                    <div class="three-col-grid">

                        <?php foreach ($related_artworks as $artwork) :

                            $artwork_id = is_object($artwork)
                                ? $artwork->ID
                                : $artwork;

                            $artwork_title = get_the_title($artwork_id);
                            $artwork_link  = get_permalink($artwork_id);
                            $artwork_image = get_the_post_thumbnail_url($artwork_id, 'large');

                            $related_artists = get_field('artists', $artwork_id);

                            // Build related artist names
                            $related_artist_names = [];

                            if (!empty($related_artists)) {

                                foreach ($related_artists as $artist) {

                                    $related_artist_names[] = is_object($artist)
                                        ? get_the_title($artist->ID)
                                        : get_the_title($artist);
                                }
                            }

                            if (count($related_artist_names) > 1) {

                                $last_artist = array_pop($related_artist_names);

                                $related_artist_output = strtoupper(
                                    implode(', ', $related_artist_names)
                                    . ' & '
                                    . $last_artist
                                );

                            } else {

                                $related_artist_output = strtoupper(
                                    $related_artist_names[0] ?? ''
                                );
                            }
                        ?>

                            <a
                                class="three-col-card"
                                href="<?php echo esc_url($artwork_link); ?>"
                            >

                                <?php if (!empty($artwork_image)) : ?>

                                    <div class="card-image">
                                        <img
                                            src="<?php echo esc_url($artwork_image); ?>"
                                            alt="<?php echo esc_attr($artwork_title); ?>"
                                        >
                                    </div>

                                <?php endif; ?>

                                <div class="card-text">

                                    <?php if (!empty($related_artist_output)) : ?>

                                        <div class="card-artists">
                                            <?php echo esc_html($related_artist_output); ?>
                                        </div>

                                    <?php endif; ?>

                                    <div class="card-title">
                                        <?php echo esc_html($artwork_title); ?>
                                    </div>

                                </div>

                            </a>

                        <?php endforeach; ?>

                    </div>

                </section>

            <?php endif; ?>

            <!-- LONG DESCRIPTION SECTION -->
            <section class="single-exhibition-description long three-col-grid">

                <div class="empty-column three-col-card"></div>

                <div class="description-content two-column-span">

                    <?php if (!empty($long_description)) : ?>
                        <?php echo wp_kses_post($long_description); ?>
                    <?php endif; ?>

                </div>

            </section>

        </section>

    </article>

<?php endwhile; ?>

</main>

<?php get_footer(); ?> 
