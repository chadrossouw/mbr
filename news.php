<?php
/**
 * Template Name: News
 * 
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package soul
 */
$_type = isset($_GET['type'])?$_GET['type']:'all';
$paged = (get_query_var('paged')) ? get_query_var('paged') : 1;
$news = get_field('featured_news','option');
if(!$news){
	$news = get_posts([
		'post_type' => ['news','object_highlight'],
		'posts_per_page' => 1,
		'orderby' => 'date',
	]);
	if($news){
		$news = $news[0];
	}
}

get_header();
?>
	<main id="primary" class="site-main no-featured-image">
				<?php
		while ( have_posts() ) :
			the_post();
			?>
			<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                
                <h1 class="screen-reader-text"><?php the_title(); ?></h1>
				<?php if($news): ?>
					<div class="event-header">
                        <?php $id = $news->ID; ?>
						<?php include get_template_directory() . '/template-parts/cards/card-news-highlight.php'; ?>
					</div>
				<?php endif; ?>
				<div class="margins body">
                    <?php echo get_breadcrumb(get_the_ID()); ?>
                </div>
                <div class="events_filter margins">
					<?php echo get_blog_filter($_type); ?>
				</div>
				<div class="events_listing margins">
					<ul class="grid grid_25 gap_3" id="response">
						<?php echo get_blog_listing($_type,$paged); ?>
					</ul>
				</div>
			</article><!-- #post-<?php the_ID(); ?> -->



		<?php endwhile; // End of the loop.
		
		include get_template_directory() . '/template-parts/content-page.php'; ?>
	</main><!-- #main -->

<?php
get_footer();