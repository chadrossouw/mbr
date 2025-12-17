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

	<main id="primary" class="site-main">
		<?php
		while ( have_posts() ) :
			the_post(); ?>
			<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
				<?php $type = get_post_type();
				get_template_part( 'template-parts/header', $type );
				get_template_part( 'template-parts/content', $type );  
				the_content(); ?>
			</article> 
		<?php endwhile; // End of the loop.
		?>
	</main><!-- #main -->

<?php
get_footer();