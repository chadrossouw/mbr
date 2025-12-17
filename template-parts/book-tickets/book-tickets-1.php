<?php $calendar = new HdKEventsCalendar;
$instances = $calendar->get_events();
$first_date = $instances[0];
get_header();
$has_featured_image = has_post_thumbnail();

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
                            <?php $intro = get_field('step_1_intro');
                                if($intro){
                                    echo '<div class="intro">'.apply_filters('the_content',$intro).'</div>';
                                }
                            ?>
                            <div class="step-counter">
                                <?php get_step_counter(1); ?>
                            </div>
                        </div>
                        <div></div>
                    </div>
                    <div class ="grid grid_calendar">
                        <div class="calendar">
                            <?php $calendar->get_events();
                                echo $calendar->get_markup();
                            ?> 
                        </div>
                         <div class="calendar-today grid gap">
                            <h3><span class="calendar_current_date"></h3>
                            <div id= "house_status" class="house-status"></div>
                            <div id= "house" class="house grid padding_2 bg_light_green">
                                <?php $image = get_field('house_image');
                                    if($image){
                                        echo wp_get_attachment_image($image,'medium');
                                    }
                                    else{
                                        echo '<div></div>';
                                    }
                                ?>
                                <div class="calendar-today--content">
                                    <h4>House</h4>
                                    <?php echo apply_filters('the_content',get_field('house_description')); ?>
                                    <ul id="tours_available"></ul>
                                </div>
                            </div>
                            <div id= "museum_status" class="museum-status"></div>
                            <div id= "museum" class="museum grid padding_2 bg_light_green">
                                <?php $image = get_field('museum_image');
                                    if($image){
                                        echo wp_get_attachment_image($image,'medium');
                                    }
                                    else{
                                        echo '<div></div>';
                                    }
                                ?>
                                <div class="calendar-today--content">
                                    <h4>Museum</h4>
                                    <?php echo apply_filters('the_content',get_field('museum_description')); ?>
                                </div>
                            </div>
                            <a href="" class="button pill bg_green" id="calendar_next">Next: Select Ticket Type</a>
                         </div>
                    </div>
                </div>
                
                <?php include get_template_directory().'/template-parts/content-page.php'; ?>
			</article><!-- #post-<?php the_ID(); ?> -->



		<?php endwhile; // End of the loop.
		?>

	</main><!-- #main -->
    <?php $bundles = get_field('bundles','option');
    $quick_book_enabled = get_field('enable_quick_book','option');
    if($bundles&&$quick_book_enabled){ ?>
        <div class="modal quick-book popup" id="quick_book">
            <div class="modal_content bg_mid_gray">
                <button class="close" aria-controls="search-modal" aria-expanded="false" aria-label="Close modal" type="button">
                    <span aria-hidden="true"><?php echo file_get_contents(get_stylesheet_directory() . '/assets/close.svg');?></span>
                    <span class="screen-reader-text"><?php echo __('Close','soul'); ?></span>
                </button>
                <div class="grid gap_2">
                    <div class="padding_2">
                        <h3 class="uc">Quick Book</h3>
                        <?php $quick_book = get_field('quick_book_description');
                            if($quick_book){
                                echo apply_filters('the_content',$quick_book);
                            }
                        ?>
                        <form action="<?php echo rest_url('hdk-events/v1/admissions'); ?>">
                            <p>Date selected: <span class="calendar_current_date"></span></p>
                            <label for="bundle"><h4>Choose a bundle</h4></label>
                            <select name="quick_book" id="bundle" class="quick-book">
                                <?php foreach($bundles as $bundle){ 
                                    $quantity = 0;
                                    foreach($bundle['tickets'] as $ticket){
                                        $quantity += $ticket['quantity'];
                                    }
                                    ?>
                                    <option value="<?php echo $bundle['bundle_name']; ?>" data-ticket_count="<?php echo $quantity; ?>"><?php echo $bundle['bundle_name']; ?></option>
                                <?php } ?>
                            </select> 
                            <div class="tour_times">
                                <label for="tour"><h4>Choose a tour time</h4></label>
                                <select name="tour_time" id="tour" class="tour_time"></select>
                            </div>
                            <input type="hidden" name="step" value="2">
                            <input type="hidden" name="admission_id" id="qb_date" value="">
                            <button type="submit" class="button pill bg_green"><?php echo __('Proceed to basket','soul'); ?></button>
                            <div class="message"></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    <?php } ?>
<?php
get_footer();