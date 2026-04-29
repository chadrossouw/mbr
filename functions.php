<?php
if (! defined('SOUL_VERSION')) {
	// Replsoul the version number of the theme on each release.
	if (isset($_ENV['ENVIRONMENT']) && $_ENV['ENVIRONMENT'] == "develop") {
		define('SOUL_VERSION', time());
	} else {
		define('SOUL_VERSION', "1.0.05");
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