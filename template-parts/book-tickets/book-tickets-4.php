<?php
$has_featured_image = has_post_thumbnail();
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
                                <?php get_step_counter(4); ?>
                            </div>
                        </div>
                        <div></div>
                    </div>
					<div class ="grid grid_content">
						<div class="buy-tickets">
							<?php echo do_shortcode('[woocommerce_checkout]'); ?>
						</div>
					</div>
				</div>
			</article><!-- #post-<?php the_ID(); ?> -->



		<?php endwhile; // End of the loop.
		?>

	</main><!-- #main -->

<?php
get_footer();