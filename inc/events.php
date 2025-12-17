<?php
function get_pagination($paged = 1)
{
    $now = date('Ymd');
    $args = [
        'post_type' => 'event',
        'posts_per_page' => 3,
        'meta_key' => 'start_date',
        'orderby' => 'meta_value',
        'order' => 'ASC',
        'meta_query' => [

            [
                'key' => 'end_date',
                'value' => $now,
                'compare' => '>=',
            ]
        ],
    ];
    $query = new WP_Query($args);
    $num_of_pages = $query->max_num_pages;
    $pagination_html = '';
    $i = 1;
    while ($i <= $num_of_pages) {
        if ($paged == $i) {
            $pagination_html .= '<div class="pagination_button current"><p>' . $i . '</p></div>';
        } else {
            $pagination_html .= '<div class="pagination_button"><p>' . $i . '</p></div>';
        }

        $i++;
    }
    return $pagination_html;
}
function get_all_events($paged = 1)
{
    $now = date('Ymd');
    $posts_per_page = 3;
    $args = [
        'post_type' => 'event',
        'posts_per_page' => 3,
        'paged' => $paged,
        'meta_key' => 'start_date',
        'orderby' => 'meta_value',
        'order' => 'ASC',
        'meta_query' => [

            [
                'key' => 'end_date',
                'value' => $now,
                'compare' => '>=',
            ]
        ],
    ];
    $posts = get_posts($args);
    if ($posts) {
        $posts = array_map(function ($n) {
            return $n->ID;
        }, $posts);
        $featured_events = $posts;
    }

    if ($featured_events) {
        $featured_events = array_values($featured_events);
        foreach ($featured_events as $event) {
            include get_template_directory() . '/template-parts/cards/card-event.php';
        }
    } else {
        echo '<article class="no_more">' . __('There are currently no events available', 'soul') . '</article>';
    }
}
function get_featured_events($featured_events)
{
    $now = date('Ymd');
    if ($featured_events) {
        $featured_events = array_filter($featured_events, function ($n) use ($now) {

            return get_post_meta($n, 'end_date', true) > $now;
        });
    }

    if ($featured_events) {
        $featured_events = array_values($featured_events);
        foreach ($featured_events as $event) {
            include get_template_directory() . '/template-parts/cards/card-event.php';
        }
    } else {
        echo '<article class="no_more">' . __('There are currently no events available', 'soul') . '</article>';
    }
}

//Custom validation for event dates in ACF 
add_action('acf/validate_save_post', 'check_dates_on_acf_save', 10, 0);

function check_dates_on_acf_save()
{

    $start = isset($_POST['acf']['field_65aa2eb1a596a']) ? $_POST['acf']['field_65aa2eb1a596a'] : null;
    if ($start) {
        $end = $_POST['acf']['field_65aa2ec3a596b'];
        $individual_dates = $_POST['acf']['field_65a93119f8ff1'];

        // check custom $_POST data
        if ($start > $end) {
            acf_add_validation_error('acf[field_65aa2ec3a596b]', 'End Date should be greater than or equal to Start Date');
        }

        if ($individual_dates) {
            foreach ($individual_dates as $date) {
                $date = array_values($date);
                if (date('Ymd', strtotime($date[0])) < $start || date('Ymd', strtotime($date[1])) > $end) {
                    acf_add_validation_error('acf[field_65a93119f8ff1]', 'Individual Dates should be between Start Date and End Date');
                }
            }
        }
    }
}
