<?php

/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package soul
 */
$id = get_the_ID();
?>
<!doctype html>
<html <?php language_attributes(); ?>>

<head>
	<meta charset="<?php bloginfo('charset'); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">
	<link rel="icon" type="image/png" href="<?php echo get_template_directory_uri(); ?>/assets/favicons/favicon-96x96.png" sizes="96x96" />
	<link rel="icon" type="image/svg+xml" href="<?php echo get_template_directory_uri(); ?>/assets/favicons/favicon.svg" />
	<link rel="shortcut icon" href="<?php echo get_template_directory_uri(); ?>/assets/favicons/favicon.ico" />
	<link rel="apple-touch-icon" sizes="180x180" href="<?php echo get_template_directory_uri(); ?>/assets/favicons/apple-touch-icon.png" />
	<meta name="apple-mobile-web-app-title" content="Shoemakers" />
	<link rel="manifest" href="<?php echo get_template_directory_uri(); ?>/assets/favicons/site.webmanifest" />
	<meta property="og:title" content="<?php echo get_the_title(); ?>" />
	<meta property="og:image" content="<?php echo get_template_directory_uri() . '/assets/OG-image.jpg'; ?>" />
	<!-- Google Tag Manager -->
	<script>
		(function(w, d, s, l, i) {
			w[l] = w[l] || [];
			w[l].push({
				'gtm.start': new Date().getTime(),
				event: 'gtm.js'
			});
			var f = d.getElementsByTagName(s)[0],
				j = d.createElement(s),
				dl = l != 'dataLayer' ? '&l=' + l : '';
			j.async = true;
			j.src =
				'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
			f.parentNode.insertBefore(j, f);
		})(window, document, 'script', 'dataLayer', 'GTM-M2CRW5PD');
	</script>
	<!-- End Google Tag Manager -->
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
	<!-- Google Tag Manager (noscript) -->
	<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M2CRW5PD"
			height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
	<!-- End Google Tag Manager (noscript) -->
	<?php wp_body_open(); ?>
	<div id="page" class="site">
		<a class="skip-link screen-reader-text" href="#primary"><?php echo file_get_contents(get_template_directory() . '/assets/logo.svg'); ?></a>
		<header id="masthead" class="site-header desktop_only">
			<div class="pre_header bg_white padding-x">
				<div class="open_times">

				</div>
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
				<nav class="utilities">
					<ul>
						<li>
							<a href="/?s">
								<?php echo file_get_contents(get_template_directory() . '/assets/searchicon.svg'); ?>
								<span class="screen-reader-text"><?php echo __('Search', 'soul'); ?></span>
							</a>
						</li>
					</ul>
				</nav>
			</div>
			<div class="header flex space-between padding-x bg_white black">
				<div class="site-branding">
					<a href="<?php echo get_home_url(); ?>" class="logo"><span class="screen-reader-text"><?php echo __('Home', 'soul'); ?></span><?php echo file_get_contents(get_template_directory() . '/assets/logo.svg'); ?></a>
				</div><!-- .site-branding -->
				<nav id="site-navigation" class="main-navigation" aria-label="<?php echo esc_attr__('Main navigation', 'soul'); ?>">
					<div class="main-navigation-inner">
						<?php
						wp_nav_menu(
							array(
								'theme_location' => 'menu-1',
								'menu_id'        => 'primary-menu',
								'items_wrap' => '<ul id="%1$s" class="%2$s">%3$s</ul>',
							)

						);
						?>
						<a href="/search"><span class="screen-reader-text"><?php echo __('Search'); ?></span><?php echo file_get_contents(get_template_directory() . '/assets/searchicon.svg'); ?></a>
						<!-- <div class="nav-search-form mobile"><?php //get_search_form(); 
																	?> -->
					</div>
				</nav>

				<div class="hamburger_container">
					<button class="hamburger hamburger--collapse" type="button" id="hamburger" aria-controls="main-navigation" aria-expanded="false">
						<span class="hamburger-box">
							<span class="hamburger-inner"></span>
						</span>
						<span class="screen-reader-text menu_closed"><?php echo __('Open Main Navigation', 'soul'); ?></span>
						<span class="screen-reader-text menu_open"><?php echo __('Close Main Navigation', 'soul'); ?></span>
					</button>
				</div>
			</div>
		</header><!-- #masthead -->
		<header id="masthead" class="site-header bg_light_gray mobile_only">
			<div class="pre_header bg-beige padding-x">
				<div class="open_times">
					<?php echo get_open_today(); ?>
				</div>
			</div>
			<div class="header bg-white padding-x black">
				<div class="site-branding">
					<a href="<?php echo get_home_url(); ?>" class="logo"><span class="screen-reader-text"><?php echo __('Home', 'soul'); ?></span><?php echo file_get_contents(get_template_directory() . '/assets/logo.svg'); ?></a>
				</div><!-- .site-branding -->
				<?php
				$book_tickets = get_field('book_tickets', 'option');
				if ($book_tickets): ?>
					<a href="<?php echo esc_url($book_tickets['url']); ?>" class="bold" target="_blank"><?php echo esc_html($book_tickets['title']); ?></a>
				<?php endif; ?>
				<div class="hamburger_container">
					<button class="hamburger hamburger--collapse" type="button" id="hamburger_mobile" aria-controls="main-navigation" aria-expanded="false">
						<span class="hamburger-box">
							<span class="hamburger-inner"></span>
						</span>
						<span class="screen-reader-text menu_closed"><?php echo __('Open Main Navigation', 'soul'); ?></span>
						<span class="screen-reader-text menu_open"><?php echo __('Close Main Navigation', 'soul'); ?></span>
					</button>
				</div>

			</div>
			<div id="mobile_nav" class="mobile_nav padding">
				<nav id="site-navigation" class="main-navigation" aria-label="<?php echo esc_attr__('Main navigation', 'soul'); ?>">
					<div class="main-navigation-inner">
						<?php
						wp_nav_menu(
							array(
								'theme_location' => 'menu-1',
								'menu_id'        => 'primary-menu',
								'items_wrap' => '<ul id="%1$s" class="%2$s">%3$s</ul>',
							)

						);
						?>
						<a href="/?s"><span class="screen-reader-text"><?php echo __('Search'); ?></span><?php echo file_get_contents(get_template_directory() . '/assets/searchicon.svg'); ?></a>
						<!-- <div class="nav-search-form mobile"><?php //get_search_form(); 
																	?> -->
					</div>
				</nav>
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
				<nav class="utilities">
					<ul>
						<li>
							<a href="/?s">
								<?php echo file_get_contents(get_template_directory() . '/assets/searchicon.svg'); ?>
								<span class="screen-reader-text"><?php echo __('Search', 'soul'); ?></span>
							</a>
						</li>
					</ul>
					<?php get_social_buttons(); ?>
				</nav>
			</div>

		</header>
		<?php
		$group = get_field('notification', 'option');
		$notice = isset($group['notice']) ? $group['notice'] : false;
		$notice_uid = isset($group['unique_notice_name']) ? sanitize_title($group['unique_notice_name']) : 'notice';
		$closed = isset($_COOKIE['notice_closed_' . $notice_uid]) ? $_COOKIE['notice_closed_' . $notice_uid] : false;
		if ($notice && is_front_page() && !$closed) {
			$notice_background_color = $group['background_color'];
		?>
			<div class="notice grid grid_7_1 padding-x <?php echo $notice_background_color ?>" id="notice" data-notice="<?php echo $notice_uid ?>">
				<?php echo $notice ?>
				<button id="close_notice" aria-controls="notice" aria-expanded="true">Close</button>
			</div>
		<?php
		}
		?>