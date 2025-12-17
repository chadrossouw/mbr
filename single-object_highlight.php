<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
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
			<article id="post-<?php the_ID(); ?>" <?php post_class('grid gap_3'); ?>>
				<?php include get_template_directory().'/template-parts/header-news.php'; ?>
				<?php include get_template_directory(). '/template-parts/content-news.php';  ?>
				<?php include get_template_directory().'/template-parts/layouts/layout-news.php'; ?>
			</article><!-- #post-<?php the_ID(); ?> -->
			</div>


		<?php endwhile; // End of the loop.
		?>

	</main><!-- #main -->
	</div>
<?php
get_footer();