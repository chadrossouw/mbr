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
$has_featured_image = has_post_thumbnail() || is_front_page();
$is_top_page = !(bool) get_post_parent();

?>

<main id="primary" class="site-main <?php echo !$has_featured_image ? 'no-featured-image' : ''; ?>">

	<?php
	while (have_posts()) :
		the_post();
	?>
		<article id="post-<?php the_ID(); ?>" <?php post_class('bg_white'); ?>>
			<?php
			if (!is_front_page()) {
				if ($is_top_page) {
					include get_template_directory() . '/template-parts/header-page.php';
				} else {
					include get_template_directory() . '/template-parts/header-page-simple.php';
				}
			}
			if (is_front_page()) {
				get_home_hero();
			}
			include get_template_directory() . '/template-parts/content-page.php'; ?>
		</article><!-- #post-<?php the_ID(); ?> -->



	<?php endwhile; // End of the loop.
	?>

</main><!-- #main -->

<?php
get_footer();
