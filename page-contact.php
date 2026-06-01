<?php
/*
Template Name: Contact Page
*/

get_header();
?>

<main id="primary" class="site-main contact-page">

<?php while (have_posts()) : the_post(); ?>

	<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

		<?php
		$contact_info = get_field('contact_info');
		$form_shortcode = get_field('contact_form_shortcode');
		?>

		<section class="page-content contact-page-content">

			<section class="contact-top three-col-grid with-1-col-2-col">

				<!-- EMPTY LEFT COLUMN -->
				<div class="empty-column three-col-card"></div>

				<!-- RIGHT 2 COLUMNS -->
				<div class="contact-content two-column-span">

					<?php if (!empty($contact_info)) : ?>

						<div class="contact-info card-text">
							<?php echo wp_kses_post($contact_info); ?>
						</div>

					<?php endif; ?>

					<div class="contact-form">

						<?php
						if (!empty($form_shortcode)) {
							echo do_shortcode($form_shortcode);
						} else {
							echo do_shortcode('[contact-form-7 id="123" title="Contact form"]');
						}
						?>

					</div>

				</div>

			</section>

		</section>

	</article>

<?php endwhile; ?>

</main>

<?php get_footer(); ?>