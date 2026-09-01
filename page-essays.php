<?php
/*
Template Name: Essays Page
*/
get_header();
?>

<main id="primary" class="site-main essays-page">

<?php while (have_posts()) : the_post(); ?>

    <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

        <section class="page-content">
            <h1><?php the_title(); ?></h1>

        <section class="three-col-no-form">

            <?php
            $args = [
                'post_type'      => 'essays',
                'post_status'    => 'publish',
                'posts_per_page' => -1,
                'orderby'        => 'menu_order',
                'order'          => 'ASC',
            ];

            $essays = new WP_Query($args);
            ?>

            <?php if ($essays->have_posts()) : ?>

                <div class="three-col-grid">

                    <?php while ($essays->have_posts()) : $essays->the_post();

                        $featured_image = get_field('single_essay_image');
                        $featured_image = $featured_image ? wp_get_attachment_image_url($featured_image, 'large') : null;

                        $title = get_the_title();
                        $link  = get_permalink();

                        // Build artist names if the essay has an artists field
                        $artists = get_field('artists');
                        $artist_names = [];

                        if (!empty($artists)) {
                            foreach ($artists as $artist) {

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