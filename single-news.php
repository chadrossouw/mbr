<?php
get_header();
?>

<main id="primary" class="site-main single-news-page single-essay-page">

<?php while (have_posts()) : the_post(); ?>

    <?php
    $news_image = get_field('news_image');
    $featured_image = $news_image
        ? wp_get_attachment_image_url($news_image, 'large')
        : null;

    $short_text = get_field('short_text');
    $long_text  = get_field('long_text');
    ?>

    <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

        <section class="page-content">

            <!-- TOP SECTION -->
            <section class="single-news-top single-essay-top three-col-grid with-1-col-2-col">

                <div class="news-meta three-col-card">

                    <h1>News</h1>

                    <div class="card-text">

                        <p class="card-title">
                            <?php the_title(); ?>
                        </p>

                        <?php if (!empty($short_text)) : ?>
                            <div class="news-short-text">
                                <?php echo wp_kses_post($short_text); ?>
                            </div>
                        <?php endif; ?>

                    </div>

                </div>

                <div class="news-image two-column-span">

                    <?php if (!empty($featured_image)) : ?>

                        <img
                            src="<?php echo esc_url($featured_image); ?>"
                            alt="<?php echo esc_attr(get_the_title()); ?>"
                        >

                    <?php endif; ?>

                </div>

            </section>


            <!-- LONG TEXT SECTION -->
            <?php if (!empty($long_text)) : ?>

                <section class="single-news-description long three-col-grid">

                    <div class="empty-column three-col-card"></div>

                    <div class="description-content two-column-span">

                        <?php echo wp_kses_post($long_text); ?>

                    </div>

                </section>

            <?php endif; ?>

        </section>

    </article>

<?php endwhile; ?>

</main>

<?php get_footer(); ?>