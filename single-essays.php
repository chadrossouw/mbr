<?php
get_header();
?>

<main id="primary" class="site-main single-essay-page">

<?php while (have_posts()) : the_post(); ?>

    <?php
    $essay_image = get_field('single_essay_image');
    $featured_image = $essay_image ? wp_get_attachment_image_url($essay_image, 'large') : null;
    $artists = get_field('artists');
    $description = get_field('essay_description');
    $long_description = get_field('essay_long_content');
    $exhibition_link = get_field('exhibition_link');

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
        $last_artist = array_pop($artist_names);
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
            <section class="single-essay-top three-col-grid with-1-col-2-col">

                <div class="essay-meta three-col-card">

                    <h1>Essay</h1>

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

                    <!-- <div class="description-content two-column-span">

                        <?php if (!empty($description)) : ?>
                            <?php echo wp_kses_post($description); ?>
                        <?php endif; ?>

                    </div> -->

                    <?php if (!empty($exhibition_link)) : ?>
                        <div class="exhibition-link-wrapper">
                            <a class="exhibition-link bg_white" href="<?php echo esc_url($exhibition_link['url']); ?>"<?php echo !empty($exhibition_link['target']) ? ' target="' . esc_attr($exhibition_link['target']) . '"' : ''; ?>>
                                <?php echo esc_html($exhibition_link['title']); ?>
                            </a>
                        </div>
                    <?php endif; ?>

                </div>

                <div class="essay-image two-column-span">
                    <?php if (!empty($featured_image)) : ?>
                        <img
                            src="<?php echo esc_url($featured_image); ?>"
                            alt="<?php echo esc_attr(get_the_title()); ?>"
                        >
                    <?php endif; ?>
                </div>

                <?php if (!empty($essay_link)) : ?>
                    <div class="essay-link-wrapper">
                        <a class="essay-link bg_white" href="<?php echo esc_url($essay_link['url']); ?>"<?php echo !empty($essay_link['target']) ? ' target="' . esc_attr($essay_link['target']) . '"' : ''; ?>>
                            <?php echo esc_html($essay_link['title']); ?>
                        </a>
                    </div>
                <?php endif; ?>

            </section>

            <!-- LONG DESCRIPTION SECTION -->
            <!-- <section class="single-essay-description long three-col-grid">

                <div class="empty-column three-col-card"></div>

                <div class="description-content two-column-span">

                    <?php if (!empty($long_description)) : ?>
                        <?php echo wp_kses_post($long_description); ?>
                    <?php endif; ?>

                </div>

            </section> -->

            <!-- DESCRIPTION SECTION -->
            <section class="single-essay-description long three-col-grid">

                <div class="empty-column three-col-card"></div>

                <div class="description-content two-column-span">

                    <?php if (!empty($description)) : ?>
                        <?php echo wp_kses_post($description); ?>
                    <?php endif; ?>

                </div>

            </section>

            <!-- ESSAY CONTENT -->
            <section class="essay-content">
                <?php get_essays_content_layouts(get_the_ID()); ?>
            </section>

        </section>

    </article>

<?php endwhile; ?>

</main>

<?php get_footer(); ?>