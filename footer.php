<?php

/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package soul
 */

?>
<div class="btt">
	<a href="#primary" class="back_to_top button uc bg_white black uc">
		<?php echo __('Back to top', 'soul'); ?>
	</a>
</div>
<footer id="prefooter" class="prefooter bg_beige double_padding">
	<div class="grid grid_35_65 gap_2">
		<div class="newsletter_description">
			<h2>
				<?php echo get_field('newsletter_sign_up_title','option')?:__('Don\'t miss a thing', 'soul'); ?>
			</h2>
			<?php $description = get_field('newsletter_sign_up_description','option');
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
</footer>
<footer id="footer" class="site-footer bg_black full-width-bg color-white padding">
	<div class="grid footer_grid grid gap">
		<div class="footer_logo_socials bg_black">
			<div class="footer_grid--item logo_copy">
				<div class="footer_copy">
					<?php echo get_field('footer_copy', 'option'); ?>
				</div>
				<div class="site-branding--footer">
					<a href="<?php echo get_home_url(); ?>" class="footer_logo fill_white"><span class="screen-reader-text"><?php echo __('Shoemakers Home Page', 'soul'); ?></span><?php echo file_get_contents(get_template_directory() . '/assets/logo.svg'); ?></a>
				</div>
			</div>
			<nav class="preheader_nav desktop_only">
				<?php wp_nav_menu(
					array(
						'theme_location' => 'menu-2',
						'menu_id'        => 'secondary-menu',
						/* 'walker'         => new Custom_Menu_Walker(), */
						'items_wrap' => '<ul id="%1$s" class="%2$s">%3$s</ul>',
					)
				);
				?>
			</nav>
			<nav class="utilities desktop_only">
				<ul>
					<li>
						<a href="/?s=">
							<?php echo file_get_contents(get_template_directory() . '/assets/searchicon.svg'); ?>
							<span class="screen-reader-text"><?php echo __('Search', 'soul'); ?></span>
						</a>
					</li>
				</ul>
			</nav>
			<?php get_social_buttons(); ?>
		</div>

		<div class="separator"></div>
		<div class="footer_grid--item find_us bg_black grid grid_25">
			<div class="footer_grid--item">
				<div class="address">
					<p id="footer_address"><?php echo get_field('footer_address', 'option'); ?></p>
				</div>
				<a class="maps_link" href="https://www.google.com/maps?q=The+Grange+Street+Somerset+BA16+0BQ" target="_blank"><?php echo __('View on Google Maps', 'soul'); ?></a>

			</div>
			<div class="footer_grid--item">
				<div class="contact_us">
					<p class="bold">
						Contact us
					</p>
					<p><?php echo get_field('telephone_numbers_options', 'option'); ?></p>
					<p><?php echo get_field('email_address', 'option'); ?></p>

				</div>
				<div class="socials mobile-only">
					<?php get_social_buttons(); ?>
				</div>

				<div class="opening_times">
					<p class="bold">
						Opening times
					</p>
					<?php $times = get_field('opening_times'); ?>
					<p>
						<?php
						echo get_times_footer(); ?>
					</p>
					<?php echo get_link_normal_light($times['link']); ?>
				</div>
			</div>
			<div class="footer_logo_socials bg_black mobile-only">
				<nav class="preheader_nav">
					<?php wp_nav_menu(
						array(
							'theme_location' => 'menu-2',
							'menu_id'        => 'secondary-menu',
							/* 'walker'         => new Custom_Menu_Walker(), */
							'items_wrap' => '<ul id="%1$s" class="%2$s">%3$s</ul>',
						)
					);
					?>
				</nav>
			</div>


			<div class="footer_grid--item contact_us">
				<div class="footer_grid--item nav_menus" aria-label="<?php echo esc_attr__('Footer navigation', 'soul'); ?>">
					<div class="primary_links_footer">
						<p class="bold">
							About us
						</p>
						<?php wp_nav_menu(
							array(
								'theme_location' => 'menu-3',
								'menu_id'        => 'footer-menu',
							)
						); ?>
					</div>
				</div>
			</div>
			<div class="footer_grid--item stay_in_touch">
				<div class="footer_grid--item nav_menus" aria-label="<?php echo esc_attr__('Footer navigation', 'soul'); ?>">
					<div class="primary_links_footer">
						<p class="bold">
							Plan your visit
						</p>
						<?php wp_nav_menu(
							array(
								'theme_location' => 'menu-4',
								'menu_id'        => 'footer-menu',
							)
						); ?>
					</div>
					<div class="primary_links_footer">
						<p class="bold">
							Policies
						</p>
						<?php wp_nav_menu(
							array(
								'theme_location' => 'menu-5',
								'menu_id'        => 'footer-menu',
							)
						); ?>
					</div>
				</div>
			</div>
		</div>
		<div class="separator"></div>
		<div class="footer_grid--item bg_black flex">
			<p class="copyright_text white"><?php echo __('©', 'soul'); ?><?php echo __(' Shoemakers Museum', 'soul'); ?><?php echo date('Y'); ?>&nbsp;&nbsp;&nbsp;&nbsp;<?php echo __('Alfred Gillett Trust Charity Number: 1165528'); ?></p>
			<a class="hdk_logo" href="https://www.dekretser.com/?utm_source=rrm&utm_medium=website&utm_campaign=made_by_hdk" target="_blank">
				<span class="screen-reader-text"><?php echo __('Made by HdK'); ?></span>
				<?php echo file_get_contents(get_template_directory() . '/assets/hdk.svg'); ?>
			</a>
		</div>
	</div>
</footer>
</div><!-- #page -->


<?php wp_footer(); ?>
</body>

</html>