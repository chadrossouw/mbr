<?php
/* 
Template Name: Exhibitions Page 
*/
get_header();
?>

<main id="primary" class="site-main exhibitions-page">

<?php while (have_posts()) : the_post(); ?>

    <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

        <section class="page-content">
            <h1><?php the_title(); ?></h1>

        <section class="three-col-no-form">

            <?php
            $args = [
                'post_type'      => 'exhibitions',
                'post_status'    => 'publish',
                'posts_per_page' => -1,
                'orderby'        => 'menu_order',
                'order'          => 'ASC',
            ];

            $exhibitions = new WP_Query($args);
            ?>

            <?php if ($exhibitions->have_posts()) : ?>

                <div class="three-col-grid">

                    <?php while ($exhibitions->have_posts()) : $exhibitions->the_post();

                        // ACF image field returns the image URL.
                        $featured_image = get_field('single_exhibition_image');

                        $artists        = get_field('artists');
                        $title          = get_the_title();
                        $link           = get_permalink();

                        // Build artist names
                        $artist_names = [];

                        if (!empty($artists)) {
                            foreach ($artists as $artist) {

                                // Handles Post Object or ID return format
                                $artist_names[] = is_object($artist)
                                    ? get_the_title($artist->ID)
                                    : get_the_title($artist);
                            }
                        }

                        if (count($artist_names) > 1) {
                            $last_artist = array_pop($artist_names);
                            $artist_output = strtoupper(implode(', ', $artist_names) . ' & ' . $last_artist);
                        } else {
                            $artist_output = strtoupper($artist_names[0] ?? '');
                        }

                        // Skip completely empty cards
                        if (empty($featured_image) && empty($artist_output) && empty($title)) {
                            continue;
                        }
                    ?>

                        <a class="three-col-card" href="<?php echo esc_url($link); ?>">

                            <?php if (!empty($featured_image)) : ?>
                                <div class="card-image">
                                    <img 
                                        src="<?php echo esc_url($featured_image); ?>"
                                        alt="<?php echo esc_attr($title); ?>"
                                    >
                                </div>
                            <?php endif; ?>

                            <div class="card-text">

                                <?php if (!empty($artist_output)) : ?>
                                    <h2 class="card-artists"><?php echo esc_html($artist_output); ?></h2>
                                <?php endif; ?>

                                <?php if (!empty($title)) : ?>
                                    <p class="card-title"><?php echo esc_html($title); ?></p>
                                <?php endif; ?>

                            </div>

                        </a>

                    <?php endwhile; ?>

                </div>

                <?php wp_reset_postdata(); ?>

            <?php endif; ?>

        </section>

    </article>

<?php endwhile; ?>

</main>

<?php get_footer(); ?>