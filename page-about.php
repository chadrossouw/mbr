<?php
get_header();
?>

<main id="primary" class="site-main about-page">

    <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
        <!-- <header class="page-header">
            <h1><?php the_title(); ?></h1>
        </header> -->

        <section class="page-content">
            <?php the_field('about_us'); ?>
        </section>
    </article>

</main>

<?php
get_footer();