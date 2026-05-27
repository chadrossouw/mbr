<?php
/*
Template Name: Product Enquiry
*/

get_header();
?>

<main id="primary" class="site-main enquiry-form-page">

<?php while (have_posts()) : the_post(); ?>

	<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

		<?php
		$form_text = get_field('form_text');
		$form_shortcode = get_field('form_shortcode');
		?>

		<section class="page-content enquiry-page-content">

			<section class="enquiry-top three-col-grid with-1-col-2-col">

				<!-- LEFT COLUMN -->
				 <div class="empty-column three-col-card"></div>
				<!-- <div class="form-meta three-col-card">

					

				</div> -->

				<!-- RIGHT 2 COLUMNS -->
				<div class="form-content two-column-span">
					<div class="card-text">

						<?php if (!empty($form_text)) : ?>

							<div class="form-text">
								<?php echo wp_kses_post($form_text); ?>
							</div>

						<?php endif; ?>

					</div>

					<?php if (!empty($form_shortcode)) : ?>

						<div class="form-shortcode" id="inquire-form">
							<?php echo do_shortcode($form_shortcode); ?>
						</div>

					<?php endif; ?>

				</div>

			</section>

		</section>

	</article>

<?php endwhile; ?>

</main>

<?php get_footer(); ?>