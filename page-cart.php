<?php
/* Template Name: Cart */
get_header();
?>

<main id="primary" class="site-main cart-page">

<?php while ( have_posts() ) : the_post(); ?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

<section class="page-content three-col-grid with-1-col-2-col">

    <!-- LEFT EMPTY COLUMN -->
    <div class="three-col-card"></div>

    <!-- RIGHT TWO COLUMNS -->
    <div class="two-column-span">

        <h1>Cart</h1>

        <?php woocommerce_output_all_notices(); ?>

        <?php echo do_shortcode('[woocommerce_cart]'); ?>

    </div>

</section>

</article>

<?php endwhile; ?>

</main>

<?php get_footer(); ?>