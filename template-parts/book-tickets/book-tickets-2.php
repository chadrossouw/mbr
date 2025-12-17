<?php

$_event = isset($_GET['admission'])?$_GET['admission']:null;

if(!$_event){
    include get_template_directory().'/template-parts/book-tickets/book-tickets-1.php';
    die();  
}
$event = new HdKEventsAdmission($_event);
$date = $event->get_date();
$event->enqueue_scripts();
$has_featured_image = has_post_thumbnail();
$intro = get_field('step_2_intro');
$additional_products = get_field('additional_products_to_include');
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
                                <?php get_step_counter(2); ?>
                            </div>
                        </div>
                        <div></div>
                    </div>
					<div class ="grid grid_content grid_cross_sell">
						<div class="buy-tickets">
							<?php echo $intro?apply_filters('the_content',$intro):''; ?>
							<?php $date_format = date('Y')==date('Y',strtotime($event->get_date()))?'j F':'j F Y'; ?>
							<h3><span aria-hidden="true"><?php echo file_get_contents(get_template_directory().'/assets/calendar.svg');?></span><?php echo date($date_format,strtotime($event->get_date())); ?></h3>
							<?php
								echo $event->get_admission_markup($additional_products);
							?>
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