<?php
/**
 * Template Name: What's On
 * 
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package soul
 */

get_header();
$_type = isset($_GET['filter_event_type'])?$_GET['filter_event_type']:[];
$date = isset($_GET['filter_date'])?$_GET['filter_date']:false;
$date_type = isset($_GET['filter_date_type'])?$_GET['filter_date_type']:'all';
$audience = isset($_GET['filter_audience'])?$_GET['filter_audience']:[];
$event = get_field('featured_event','option');
$event_date = get_field('end_date',$event);
if($event_date&&$event_date<date('Ymd')){
	$event = get_posts([
		'post_type' => 'event',
		'posts_per_page' => 1,
		'orderby' => 'meta_value',
		'post_status' => 'publish',
		'order' => 'ASC',
		'meta_key'=>'start_date',
		'meta_query' => [
			[
				'key' => 'end_date',
				'value' => date('Ymd'),
				'compare' => '>'
			]
		]
	]);
	if($event){
		$event = $event[0]->ID;
	}
	else{
		$event = false;
	}
}
?>

	<main id="primary" class="site-main no-featured-image whats-on">
		
		<?php
		while ( have_posts() ) :
			the_post();
			?>
			<article id="post-<?php the_ID(); ?>" <?php post_class('bg_bg'); ?>>
				
				<h1 class="screen-reader-text"><?php the_title(); ?></h1>
				<?php if($event): ?>
					<?php include get_template_directory() . '/template-parts/cards/card-event-highlight.php'; ?>
				<?php endif; ?>
				<div class="margins body">
					<?php echo get_breadcrumb(get_the_ID()); ?>
				</div>
				<div class="events_filter margins">
					<?php echo get_event_listing_filter($_type,$audience,$date,$date_type); ?>
				</div>
				<div class="events_listing margins">
					<ul class="grid grid_30 gap_3" id="response">
						<?php echo get_event_list($_type,$audience,$date,$date_type); ?>
					</ul>
				</div>
			</article><!-- #post-<?php the_ID(); ?> -->



		<?php endwhile; // End of the loop.
		?>

	</main><!-- #main -->

<?php
get_footer();
