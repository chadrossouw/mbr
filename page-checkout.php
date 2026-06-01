<?php
/* Template Name: Checkout */
get_header();
?>

<main id="primary" class="site-main checkout-page">

<?php while (have_posts()) : the_post(); ?>

<article <?php post_class(); ?>>

	<section class="page-content three-col-grid with-1-col-2-col">

		<!-- LEFT EMPTY COLUMN (layout consistency) -->
		<div class="three-col-card">
			<!-- intentionally empty -->
		</div>

		<!-- RIGHT TWO COLUMNS -->
		<div class="two-column-span">

			<h1>Checkout</h1>

			<?php woocommerce_output_all_notices(); ?>

			<?php echo do_shortcode('[woocommerce_checkout]'); ?>

		</div>

	</section>

</article>

<?php endwhile; ?>

</main>

<?php get_footer(); ?>