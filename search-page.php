<?php
/**
 * Template Name: Search
 * 
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package soul
 */

get_header();
$search_query = isset($_GET['_search'])?$_GET['_search']:'';
?>

	<main id="primary" class="site-main no-featured-image">
		<article id="post-<?php the_ID(); ?>" <?php post_class('bg_white'); ?>>
			<div class="search_header padding bg_green white">
				<?php get_breadcrumb('search',true); ?>
				<h1>
					<?php echo __('Search','soul'); ?>
				</h1>
				<?php echo get_search_form(); ?>
				<?php 
				$terms = get_field('popular_searches');
				if(!$search_query && $terms): ?>
					<div class="popular_searches">
						<h3 class="uc semibold white">
							<?php echo __('Popular searches','soul'); ?>
						</h3>
						<div class="flex gap_2">
							<?php foreach($terms as $term): 
								if(!isset($term['search_term'])) continue; ?>
								<a href="/search?_search=<?php echo $term['search_term']; ?>" class="bg_green white semibold pill">
									<?php echo $term['search_term']; ?>
								</a>
							<?php endforeach; ?>
						</div>
					</div>
				<?php endif; ?>
			</div>
			<?php if($search_query): 
				$args = array(
					'post_type' => array('competition','page','news','event','object'),
					's' => $search_query,
					'posts_per_page' => 12,
				);
				$query = new WP_Query($args);
				if($query->have_posts()): ?>
					<section class="margins bg_white events_listing">
						<p><?php echo $query->found_posts; ?> <?php echo $query->found_posts==1?__('result found','soul'):__('results found','soul'); ?></p>
						<ul class="grid gap_1">
							<?php
							/* Start the Loop */
							while ( $query->have_posts() ) :
								$query->the_post();
									include get_template_directory().'/template-parts/cards/card-search.php';
							endwhile; ?>
							</div>
						<?php the_posts_navigation(['prev_text'=>'More results', 'next_text'=>'Previous results']); ?>
					</section>
				<?php else: ?>
					<section class="margins bg_white events_listing">
						<p><?php echo __('Sorry, but nothing matched your search terms. Please try again with some different keywords.','soul'); ?></p>
					</section>
				<?php endif; ?>
			<?php else: ?>
			<?php include get_template_directory().'/template-parts/content-page.php'; ?>
			<?php endif; ?>
		</article><!-- #post-<?php the_ID(); ?> -->
	</main><!-- #main -->

<?php
get_footer();
