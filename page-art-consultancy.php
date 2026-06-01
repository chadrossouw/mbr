<?php
/*
Template Name: Art Consultancy
*/
get_header();
?>

<main id="primary" class="site-main about-page art-consultancy">

<?php while ( have_posts() ) : the_post(); ?>

	<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

		<section class="page-content about-page-content">

			<section class="three-col-grid with-1-col-2-col about-layout">

				<!-- LEFT COLUMN -->
				<div class="three-col-card about-image-column">

					<?php
					$about_image = get_field( 'about_image' );

					if ( ! empty( $about_image ) ) :
					?>

						<div class="about-image-wrapper">

							<img
								src="<?php echo esc_url( $about_image ); ?>"
								alt="<?php the_title_attribute(); ?>"
							>

						</div>

					<?php endif; ?>

				</div>

				<!-- RIGHT 2 COLUMNS -->
				<div class="two-column-span about-content-column">

					<?php the_field( 'about_us' ); ?>

				</div>

			</section>

		</section>

	</article>

<?php endwhile; ?>

</main>

<?php get_footer(); ?>