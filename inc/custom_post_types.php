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


	// Exhibitions
	$labels_exhibitions = array(
		'name'               => __( 'Exhibitions', 'soul' ),
		'singular_name'      => __( 'Exhibition', 'soul' ),
		'menu_name'          => __( 'Exhibitions', 'soul' ),
		'name_admin_bar'     => __( 'Exhibitions', 'soul' ),
		'add_new'            => __( 'Add New', 'soul' ),
		'add_new_item'       => __( 'Add New Exhibition', 'soul' ),
		'new_item'           => __( 'New Exhibition', 'soul' ),
		'edit_item'          => __( 'Edit Exhibition', 'soul' ),
		'view_item'          => __( 'View Exhibition', 'soul' ),
		'all_items'          => __( 'All Exhibitions', 'soul' ),
		'search_items'       => __( 'Search Exhibitions', 'soul' ),
		'not_found'          => __( 'No Exhibitions found.', 'soul' ),
		'not_found_in_trash' => __( 'No Exhibitions found in Trash.', 'soul' )
	);

	$args_exhibitions = array(
		'labels'             => $labels_exhibitions,
		'public'             => true,
		'show_ui'            => true,
		'show_in_rest'       => true,
		'has_archive'        => false,
		'rewrite'            => array('slug' => 'exhibitions', 'with_front' => false),
		'menu_icon'          => 'dashicons-art',
		'supports'           => array('title', 'thumbnail', 'editor'),
	);

	register_post_type('exhibitions', $args_exhibitions);

	//Artists
		$labels_artists = array(
		'name'               => __( 'Artists', 'soul' ),
		'singular_name'      => __( 'Artist', 'soul' ),
		'menu_name'          => __( 'Artists', 'soul' ),
		'add_new_item'       => __( 'Add New Artist', 'soul' ),
	);

	$args_artists = array(
		'labels'        => $labels_artists,
		'public'        => true,
		'show_ui'       => true,
		'show_in_rest'  => true,
		'has_archive'   => false,
		'rewrite'       => array('slug' => 'artists'),
		'menu_icon'    => 'dashicons-admin-users',
		'supports'      => array('title', 'thumbnail', 'editor'),
	);

	register_post_type('artists', $args_artists);

	// Artworks
	// $labels_artworks = array(
	// 	'name'          => __( 'Artworks', 'soul' ),
	// 	'singular_name' => __( 'Artwork', 'soul' ),
	// 	'menu_name'     => __( 'Artworks', 'soul' ),
	// );

	// $args_artworks = array(
	// 	'labels'        => $labels_artworks,
	// 	'public'        => true,
	// 	'show_ui'       => true,
	// 	'show_in_rest'  => true,
	// 	'has_archive'   => false,
	// 	'rewrite'       => array('slug' => 'artworks'),
	// 	'menu_icon'     => 'dashicons-format-image',
	// 	'supports'      => array('title', 'thumbnail', 'editor'),
	// );

	// register_post_type('artworks', $args_artworks);

	// Essays
	$labels_essays = array(
		'name'               => __( 'Essays', 'soul' ),
		'singular_name'      => __( 'Essay', 'soul' ),
		'menu_name'          => __( 'Essays', 'soul' ),
		'name_admin_bar'     => __( 'Essay', 'soul' ),
		'add_new'            => __( 'Add New', 'soul' ),
		'add_new_item'       => __( 'Add New Essay', 'soul' ),
		'new_item'           => __( 'New Essay', 'soul' ),
		'edit_item'          => __( 'Edit Essay', 'soul' ),
		'view_item'          => __( 'View Essay', 'soul' ),
		'all_items'          => __( 'All Essays', 'soul' ),
		'search_items'       => __( 'Search Essays', 'soul' ),
		'not_found'          => __( 'No Essays found.', 'soul' ),
		'not_found_in_trash' => __( 'No Essays found in Trash.', 'soul' )
	);

	$args_essays = array(
		'labels'        => $labels_essays,
		'public'        => true,
		'show_ui'       => true,
		'show_in_rest'  => true,
		'has_archive'   => false,
		'rewrite'       => array(
			'slug'       => 'essays',
			'with_front' => false
		),
		'menu_icon'     => 'dashicons-edit-page',
		'supports'      => array( 'title', 'thumbnail', 'editor' ),
	);

	register_post_type( 'essays', $args_essays );

}
add_action('init', 'soul_init');
