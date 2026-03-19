<?php
// create new post types
//For available options see https://developer.wordpress.org/reference/functions/register_post_type/
//Menu icons are here https://developer.wordpress.org/resource/dashicons/ or use a base-64 svg https://base64.guru/converter/encode/image/svg

function soul_init()
{
	// $labels_event = array(
	// 	'name'               => __( 'Events', 'soul' ),
	// 	'singular_name'      => __( 'Event', 'soul' ),
	// 	'menu_name'          => __( 'Events', 'soul' ),
	// 	'name_admin_bar'     => __( 'Events', 'soul' ),
	// 	'add_new'            => __( 'Add New', 'soul' ),
	// 	'add_new_item'       => __( 'Add New Event', 'soul' ),
	// 	'new_item'           => __( 'New Event', 'soul' ),
	// 	'edit_item'          => __( 'Edit Event', 'soul' ),
	// 	'view_item'          => __( 'View Event', 'soul' ),
	// 	'all_items'          => __( 'All Events', 'soul' ),
	// 	'search_items'       => __( 'Search Events', 'soul' ),
	// 	'parent_item_colon'  => __( 'Parent Events:', 'soul' ),
	// 	'not_found'          => __( 'No Events found.', 'soul' ),
	// 	'not_found_in_trash' => __( 'No Events found in Trash.', 'soul' )
	// );
	// $args_event = array(
	// 	'labels'             => $labels_event,
	//     'description'        => __( 'Shoemakers Events.', 'soul' ),
	// 	'public'             => true,
	// 	'publicly_queryable' => true,
	// 	'show_ui'            => true,
	// 	'show_in_menu'       => true,
	//     'show_in_rest'       => true,
	// 	'query_var'          => true,
	// 	'rewrite'            => array( 'slug' => 'event','with_front' => false, ),
	// 	'capability_type'    => 'post',
	// 	'has_archive'        => false,
	// 	'hierarchical'       => false,
	// 	'menu_position'      => 4.5,
	//     'menu_icon'          => 'dashicons-tickets',
	//     'supports'           => array( 'title', 'thumbnail' ),
	// );

	// register_post_type('event', $args_event); 



}
add_action('init', 'soul_init');
