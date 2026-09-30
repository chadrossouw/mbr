<?php
/*
Template Name: News Page
*/
get_header();
?>

<main id="primary" class="site-main news-page">

<?php while (have_posts()) : the_post(); ?>

    <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

        <section class="page-content">

            <h1><?php the_title(); ?></h1>

            <section class="three-col-no-form">

                <?php
                $args = [
                    'post_type'      => 'news',
                    'post_status'    => 'publish',
                    'posts_per_page' => -1,
                    'orderby'        => 'menu_order',
                    'order'          => 'ASC',
                ];

                $news = new WP_Query($args);
                ?>

                <?php if ($news->have_posts()) : ?>

                    <div class="three-col-grid">

                        <?php while ($news->have_posts()) : $news->the_post();

                            $news_image = get_field('news_image');
                            $news_image = $news_image
                                ? wp_get_attachment_image_url($news_image, 'large')
                                : null;

                            $title  = get_the_title();
                            $author = get_the_author();
                            $link   = get_permalink();

                            // Skip completely empty cards
                            if (empty($news_image) && empty($author) && empty($title)) {
                                continue;
                            }
                        ?>

                            <a class="three-col-card" href="<?php echo esc_url($link); ?>">

                                <?php if (!empty($news_image)) : ?>
                                    <div class="card-image">
                                        <img
                                            src="<?php echo esc_url($news_image); ?>"
                                            alt="<?php echo esc_attr($title); ?>"
                                        >
                                    </div>
                                <?php endif; ?>

                                <div class="card-text">

                                    <?php if (!empty($title)) : ?>
                                        <p class="card-title">
                                            <?php echo esc_html($title); ?>
                                        </p>
                                    <?php endif; ?>

                                </div>

                            </a>

                        <?php endwhile; ?>

                    </div>

                    <?php wp_reset_postdata(); ?>

                <?php endif; ?>

            </section>

        </section>

    </article>

<?php endwhile; ?>

</main>

<?php get_footer(); ?>