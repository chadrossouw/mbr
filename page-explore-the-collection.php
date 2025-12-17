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
 * @package WilliamMorris
 */

get_header();
?>

	<main id="primary" class="site-main">
<?php get_hero_carousel(get_the_ID()); ?>


		<?php
		while ( have_posts() ) :
			the_post();
			?>
			<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
			<?php get_template_part( 'template-parts/page', 'header' ); ?>
			<?php echo get_collection_search($id); ?>
			<?php get_template_part( 'template-parts/page', 'layouts' ); ?>
			<?php echo get_collection_by_theme(get_the_ID()); ?>
			
		</article><!-- #post-<?php the_ID(); ?> -->



		<?php endwhile; // End of the loop.
		?>

	</main><!-- #main -->

<?php
get_footer();
