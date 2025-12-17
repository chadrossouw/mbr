<?php
$has_featured_image = has_post_thumbnail();
$_event = isset($_GET['admission'])?$_GET['admission']:null;
$event = new HdKEventsAdmission($_event);
$date = $event->get_date();
get_header();
?>
	<main id="primary" class="site-main <?php echo !$has_featured_image?'no-featured-image':''; ?>">

	<?php
		while ( have_posts() ) :
			the_post();
			?>
			<article id="post-<?php the_ID(); ?>" <?php post_class('bg_white'); ?>>
				<?php
					if($has_featured_image){
						include get_template_directory().'/template-parts/header-page.php';
					}
					else{
						include get_template_directory().'/template-parts/header-page-simple.php';
					}
				?>
				<div class="margins book-ticket-content">
                    <div class="grid grid_content">
                        <div>
                            <div class="step-counter">
                                <?php get_step_counter(3); ?>
                            </div>
                        </div>
                        <div></div>
                    </div>
					<div class ="grid grid_content grid_cross_sell">
						<div class="buy-tickets">
							<?php echo do_shortcode('[woocommerce_cart]'); ?>
						</div>
						<div class="cross-sell">
						<?php get_cross_sells($date,home_url($_SERVER['REQUEST_URI'])); ?> 
						</div>
					</div>
				</div>
			</article><!-- #post-<?php the_ID(); ?> -->



		<?php endwhile; // End of the loop.
		?>

	</main><!-- #main -->

<?php
get_footer();