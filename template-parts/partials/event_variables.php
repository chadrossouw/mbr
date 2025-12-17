<?php


$image = get_field('card_image', $event);
if ($image) {
    $image = wp_get_attachment_image($image, 'event_card');
} else {
    $image = get_the_post_thumbnail($event, 'event_card');
}
$title = get_the_title($event);
$strapline = get_field('strapline', $event);
$strapline_background = get_field('strapline_background', $event);
$date_str = get_event_date_string($event);
$time_str = get_event_time_string($event);
$sold_out = get_field('ticketing_sold_out', $event);
if ($sold_out) {
    $strapline = 'Sold Out';
}
$type = get_the_terms($event, 'event_type');
if ($type) {
    $type = array_map(function ($t) {
        return $t->name;
    }, $type);
    $type = '<h4 class="book uc">' . implode(' | ', preg_replace('/[^A-Za-z0-9]/', ' ', $type)) . '</h4>';
} else {
    $type = '';
}
$background_colour = get_field('background_colour', $event) ?: 'green';
$card_link_text = get_field('card_link_text', $event)?:'More info and book tickets';
