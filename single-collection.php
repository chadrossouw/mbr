<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package soul
 */
$gallery = $_GET['gallery'] ?? false;

get_header();
?>

	<main id="primary" class="site-main no-featured-image">
		<?php
		while ( have_posts() ) :
			the_post(); ?>
			<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
				<?php
				include get_template_directory() . '/template-parts/header-collection.php';
				if($gallery):
					include get_template_directory(). '/template-parts/content-collection_gallery.php';
				else:
					include get_template_directory(). '/template-parts/content-collection.php';  
				endif;
				 ?>
			</article> 
		<?php endwhile; // End of the loop.
		?>
	</main><!-- #main -->

<?php
get_footer();