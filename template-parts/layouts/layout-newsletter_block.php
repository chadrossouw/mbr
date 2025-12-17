<div class="bg_beige double_padding">
	<div class="grid grid_35_65">
		<div class="newsletter_description">
			<h2>
				<?php echo get_sub_field('title')?:get_field('newsletter_sign_up_title','option'); ?>
			</h2>
			<?php $description = get_sub_field('description')?:get_field('newsletter_sign_up_description','option');
			if($description){
				echo apply_filters('the_content', $description);
			} ?>
		</div>
		<div class="newsletter_form">
			<?php if( function_exists('mc4wp_show_form') ) {
				mc4wp_show_form();
			} ?>
		</div>
	</div>
</div>