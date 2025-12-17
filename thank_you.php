<?php
/**
 * Template Name: Thank you (for donations)
 * 
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package soul
 */

get_header();
?>
	<main id="primary" class="site-main no-featured-image">
		<?php
		while ( have_posts() ) :
			the_post();
			?>
			<article id="post-<?php the_ID(); ?>" <?php post_class('bg_white'); ?>>
				<?php
					include get_template_directory().'/template-parts/header-page-thank-you.php';
						
					include get_template_directory().'/template-parts/content-page.php'; ?>
			</article><!-- #post-<?php the_ID(); ?> -->
		<?php endwhile; // End of the loop.
		?>

	</main><!-- #main -->

<?php
get_footer();
