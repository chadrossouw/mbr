<?php

add_action( 'rest_api_init', function () {

  register_rest_route( 'soul/v1', '/filter_blog', array(
    'methods' => 'GET',
    'callback' => 'filter_blog',
    'permission_callback' => '__return_true',
    
  ) ); 

  register_rest_route( 'soul/v1', '/filter_events', array(
    'methods' => 'GET',
    'callback' => 'filter_events',
    'permission_callback' => '__return_true',
    
  ) ); 
  
  register_rest_route( 'soul/v1', '/filter_events_get_date_selector', array(
    'methods' => 'GET',
    'callback' => 'filter_get_date_selector',
    'permission_callback' => '__return_true',
    
  ) );

  register_rest_route( 'soul/v1', '/filter_news', array(
    'methods' => 'GET',
    'callback' => 'filter_news',
    'permission_callback' => '__return_true',
    
  ) ); 

} );


function filter_blog($data){
  $filter = $data->get_param('category');
  return get_blog_list($filter);
}

function filter_events($data){
  $type = $data->get_param('filter_event_type')?:[];
  $theme = $data->get_param('filter_audience')?:[];
  $date = $data->get_param('filter_date')?:false;
  $date_type = $data->get_param('filter_date_type')?:false;
  return get_event_list($type,$theme,$date,$date_type);
}

function filter_news($data){
  $date = $data->get_param('filter_date')?:[];
  return get_blog_listing($date);
}

function filter_get_date_selector($data){
  $type = $data->get_param('filter_date_type')?:[];
  $date = $data->get_param('filter_date')?:false;
  return get_date_selector($type,$date);
}
