<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package soul
 */


get_header();
?>

	<main id="primary" class="site-main no-featured-image">
		<?php
		while ( have_posts() ) :
			the_post(); ?>
			<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
				<?php
				include get_template_directory(). '/template-parts/header-event.php';
				include get_template_directory(). '/template-parts/content-event.php';  
				 ?>
			</article> 
		<?php endwhile; // End of the loop.
		?>
	</main><!-- #main -->

<?php
get_footer();