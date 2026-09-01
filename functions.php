<?php
if (! defined('SOUL_VERSION')) {
	// Replsoul the version number of the theme on each release.
	if (isset($_ENV['ENVIRONMENT']) && $_ENV['ENVIRONMENT'] == "develop") {
		define('SOUL_VERSION', time());
	} else {
		define('SOUL_VERSION', "1.0.08");
	}
}
if (! function_exists('soul_setup')) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function soul_setup()
	{
		/*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 * If you're building a theme based on soul, use a find and replsoul
		 * to change 'soul' to the name of your theme in all the template files.
		 */
		load_theme_textdomain('soul', get_template_directory() . '/languages');

		add_theme_support('title-tag');

		add_theme_support('post-thumbnails');

		// This theme uses wp_nav_menu() in one location.
		register_nav_menus(
			array(
				'menu-1' => esc_html__('Header Primary', 'soul'),
				'menu-2' => esc_html__('Header Secondary', 'soul'),
				'menu-3' => esc_html__('Footer About', 'soul'),
				'menu-4' => esc_html__('Footer Plan Your Visit', 'soul'),
				'menu-5' => esc_html__('Footer Policies', 'soul'),
			)
		);

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support(
			'html5',
			array(
				'search-form',
				'gallery',
				'caption',
				'style',
				'script',
			)
		);

		add_image_size('collection_square', 255, 255, true);
		add_image_size('event', 500, 333, true);
		add_image_size('object_card', 0, 380);
	}
endif;
add_action('after_setup_theme', 'soul_setup');



/**
 * Enqueue scripts and styles.
 */
function soul_scripts()
{
	wp_enqueue_style('soul-style', get_template_directory_uri() . '/build/style.css', array(), SOUL_VERSION);
	wp_enqueue_script('soul-script', get_template_directory_uri() . '/build/scripts.js', array(), SOUL_VERSION, true);
}
add_action('wp_enqueue_scripts', 'soul_scripts');

add_action('admin_enqueue_scripts', 'soul_admin_styles', 5);
function soul_admin_styles()
{
	wp_enqueue_style('soul-editor-styles', get_template_directory_uri() . '/build/editor-style.css', array(), SOUL_VERSION);
}

/*Styling the login page*/
function soul_login_scripts()
{
	wp_enqueue_style('soul-style', get_template_directory_uri() . '/style.css', array(), SOUL_VERSION);
}
add_action('login_enqueue_scripts', 'soul_login_scripts');

function soul_login_logo_url()
{
	return home_url();
}
add_filter('login_headerurl', 'soul_login_logo_url');

function soul_login_logo_url_title()
{
	return get_bloginfo('name');
}
add_filter('login_headertext', 'soul_login_logo_url_title');


/**
 * Adding CPTs
 */
require get_template_directory() . '/inc/custom_post_types.php';
require get_template_directory() . '/inc/custom_taxonomies.php';

/**
 * Functions for Content Blocks
 */
require get_template_directory() . '/inc/get_blocks.php';
require get_template_directory() . '/inc/get_layouts.php';
/**
 * Functions for Accessibility*/

/**
 * REST API functions
 */

require get_template_directory() . '/inc/rest.php';

//Woo
require get_template_directory() . '/inc/woocommerce.php';

/**
 * Date functions
 */


/**
 * Utilities
 */
require get_template_directory() . '/inc/utilities.php';

/**
 * Events
 */


/**
 * Template stuff
 */



require get_template_directory() . '/inc/nav.php';

/**
 * Tiny MCE functions. Uncomment if using classic editor/acf and want to add the fancy buttons
 */
//require get_template_directory() . '/inc/tiny_mce.php';

/*removing global styles and svg noise introduced in 5.9*/
remove_action('wp_enqueue_scripts', 'wp_enqueue_global_styles');
remove_action('wp_body_open', 'wp_global_styles_render_svg_filters');

/*Disabling comments*/

//removes from admin menu
add_action('admin_menu', 'soul_remove_admin_menus');
function soul_remove_admin_menus()
{
	remove_menu_page('edit-comments.php');
}

// Removes from post and pages and all CPTs

add_action('init', 'remove_comment_support', 100);

function remove_comment_support()
{
	foreach (get_post_types() as $post_type) {
		remove_post_type_support($post_type, 'comments');
		remove_post_type_support($post_type, 'trackbacks');
	}
}

//Disables comments open, this is particularly for when you use theme on an existing site which may have had comments open
add_filter('comments_open', '__return_false', 20, 2);
add_filter('pings_open', '__return_false', 20, 2);
add_filter('comments_array', '__return_empty_array', 10, 2);

//No comments in the admin bar
function soul_admin_bar_render()
{
	global $wp_admin_bar;
	$wp_admin_bar->remove_menu('comments');
}
add_action('wp_before_admin_bar_render', 'soul_admin_bar_render');

/*No pretty links for paged, so that we can use ajax for pagination*/
add_filter('redirect_canonical', function ($redirect_url) {

	if (is_paged()) {
		return false;
	}

	return $redirect_url;
}, 10, 1);

/*Use Classic Editor*/

add_filter('use_block_editor_for_post', '__return_false', 10);

/**
 *  Enable Options Page for ACF
 */
if (function_exists('acf_add_options_page')) {
}

//Remove posts from menu
function post_remove()      //creating functions post_remove for removing menu item
{
	remove_menu_page('edit.php');
}

add_action('admin_menu', 'post_remove');


function limit_upload_size($file)
{

	// Set the desired file size limit
	$file_size_limit = 2048; // 1MB in KB
	$current_size = $file['size'];
	$current_size = $current_size / 1024; //get size in KB

	if ($current_size > $file_size_limit) {
		$file['error'] = sprintf(__('ERROR: File size limit is %d KB.'), $file_size_limit);
	}

	return $file;
}
add_filter('wp_handle_upload_prefilter', 'limit_upload_size', 10, 1);

add_filter('wpseo_metabox_prio', 'lower_yoast_metabox_priority');
/**
 * Lowers the metabox priority to 'core' for Yoast SEO's metabox.
 *
 * @param string $priority The current priority.
 *
 * @return string $priority The potentially altered priority.
 */
function lower_yoast_metabox_priority($priority)
{
	return 'low';
}

add_action('init', function () {
	add_feed('news', 'custom_news_feed');
});

function custom_news_feed()
{
	get_template_part('feed', 'news'); // Looks for feed-news.php
}

// Remove the default WordPress editor for About and Contact pages
/* add_action('admin_init', function() {
    // IDs of the pages to remove editor from
    $pages_to_remove_editor = array( get_page_by_path('about')->ID, get_page_by_path('contact')->ID );

    foreach ($pages_to_remove_editor as $page_id) {
        remove_post_type_support('page', 'editor');
    }
}); */

add_filter('wp_nav_menu_objects', 'soul_blank_menu_items', 10, 2);

function soul_blank_menu_items($items, $args)
{
	foreach ($items as $item) {

		$display_as_blank = get_field(
			'display_as_blank',
			'menu_item_' . $item->ID
		);

		if ($display_as_blank) {

			// Add custom class to the <li>
			$item->classes[] = 'menu-item-blank';

			// Remove visible text
			//$item->title = '';

			// Remove link destination
			$item->url = '';
		}
	}

	return $items;
}

function atg_menu_classes($classes, $item, $args) {
  if($args->theme_location == 'menu-2') {
    $classes[] = 'menu-item-bottom';
  }
  return $classes;
}
add_filter('nav_menu_css_class', 'atg_menu_classes', 1, 3);

function atop_menu_classes($classes, $item, $args) {
  if($args->theme_location == 'menu-1') {
    $classes[] = 'menu-item-top';
  }
  return $classes;
}
add_filter('nav_menu_css_class', 'atop_menu_classes', 1, 3);

// Prepopulate enquiry subject field
add_filter('wpcf7_form_tag', function ($tag) {

	if ($tag['name'] !== 'your-subject') {
		return $tag;
	}

	// Get artwork OR book
	$item = '';

	if ( isset($_GET['artwork']) && $_GET['artwork'] !== '' ) {

		$item = wp_unslash($_GET['artwork']);

	} elseif ( isset($_GET['book']) && $_GET['book'] !== '' ) {

		$item = wp_unslash($_GET['book']);
	}

	// Get artist OR author
	$person = '';

	if ( isset($_GET['artist']) && $_GET['artist'] !== '' ) {

		$person = wp_unslash($_GET['artist']);

	} elseif ( isset($_GET['author']) && $_GET['author'] !== '' ) {

		$person = wp_unslash($_GET['author']);
	}

	if ( $item ) {

		// keep original as-is
		$subject = 'Enquiry on ' . $item;

		if ( $person ) {

			$subject .= ' by ' . $person;
		}

		$tag['values'] = [ $subject ];
	}

	return $tag;

});

//redirect to cart page 
add_filter( 'woocommerce_add_to_cart_redirect', function( $url ) {
    return wc_get_cart_url();
});

function mbr_enqueue_fonts() {

    wp_enqueue_style(
        'mbr-google-fonts',
        'https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@100;200;300;400;500;600;700&family=Tinos:ital,wght@0,400;0,700&family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700;1,800&display=swap',
        [],
        null
    );
}
add_action('wp_enqueue_scripts', 'mbr_enqueue_fonts');

//Hero animation
function mbr_enqueue_hero_animation() {

    wp_enqueue_script(
        'gsap',
        'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
        [],
        null,
        true
    );

    wp_enqueue_script(
        'gsap-scrolltrigger',
        'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
        ['gsap'],
        null,
        true
    );

    wp_enqueue_script(
        'mbr-hero',
        get_template_directory_uri() . '/assets/js/hero.js',
        ['gsap', 'gsap-scrolltrigger'],
        null,
        true
    );
}
add_action('wp_enqueue_scripts', 'mbr_enqueue_hero_animation');