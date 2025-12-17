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
$params=[
	'general_search'=>isset($_GET['general_search'])?$_GET['general_search']:'',
	'title'=>isset($_GET['title'])?$_GET['title']:'',
	'catalogue_no'=>isset($_GET['catalogue_no'])?$_GET['catalogue_no']:'',
	'object_type'=>isset($_GET['object_type'])?$_GET['object_type']:'',
	'material'=>isset($_GET['material'])?$_GET['material']:'',
	'maker'=>isset($_GET['maker'])?$_GET['maker']:'',
	'technique'=>isset($_GET['technique'])?$_GET['technique']:'',
	'results_per_page'=>isset($_GET['results_per_page'])?$_GET['results_per_page']:''
];
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
			<?php echo get_collection_search($id,$params); ?>
			<?php get_collection_search_results($params); ?>
		</article><!-- #post-<?php the_ID(); ?> -->



		<?php endwhile; // End of the loop.
		?>

	</main><!-- #main -->

<?php
get_footer();
