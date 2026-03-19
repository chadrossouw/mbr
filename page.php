<?php
get_header();
?>

<main id="primary" class="site-main">

<?php
while (have_posts()) :
    the_post();
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

    <?php include get_template_directory() . '/template-parts/header-page.php'; ?>

    <section class="page-content">
        <!-- <?php the_content(); ?> -->
    </section>

</article>

<?php endwhile; ?>

</main>

<?php
get_footer();