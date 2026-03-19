<?php
/*
Template Name: About Page
*/
get_header();
?>

<main id="primary" class="site-main about-page">

<?php while (have_posts()) : the_post(); ?>

    <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

        <section class="page-content">
            <?php the_field('about_us'); ?>
        </section>

    </article>

<?php endwhile; ?>

</main>

<?php get_footer(); ?>