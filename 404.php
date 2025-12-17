<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package soul
 */

get_header();

?>
	<main id="primary" class="site-main no-featured-image">
	<article id="post-<?php the_ID(); ?>" <?php post_class('bg_white'); ?>>
		<header class="page-header margins">
			<h1 class="page-title center">That Page Can't Be Found</h1>
		</header>
		<div class="entry-content margins center" id="nav_trigger">
			<a href="/" class="bg_body white pill">Go home</a>
		</div><!-- .entry-content -->

	</article><!-- #post-<?php the_ID(); ?> -->
</main><!-- #main -->

<?php
get_footer(); 
