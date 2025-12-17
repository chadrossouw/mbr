<?php



function get_fixed_link($id, $items)
{
    foreach ($items as $item) {
        if ($item->id == $id) {
?>
            <div class="fixed_page_link <?php echo $item->background_color ?> padding_2 card">
                <div class="flex">
                    <h3 class="book"><?php echo $item->title ?></h3>
                    <?php echo file_get_contents(get_template_directory() . '/' . 'assets/' . $item->icon); ?>
                </div>
                <div class="container container--threetwo">
                    <img src="<?php echo $item->image ?>" alt="" class="image">
                </div>
                <p><?php echo $item->description ?></p>
                <a href="<?php echo $item->link ?>" class="bold card_target"><?php echo $item->link_label ?></a>
            </div>
    <?php
        }
    }
}

function get_icon_page_icon($id, $items)
{
    foreach ($items as $item) {
        if ($item->id == $id) {
            return '/' .  'assets/' . $item->icon;
        }
    }
}

function get_icon_page_color($id, $items)
{
    foreach ($items as $item) {
        if ($item->id == $id) {
            return $item->background_color;
        }
    }
}



function get_player($url, $autoplay = false)
{

    if (strpos($url, 'vimeo') !== false) {
        return get_vimeo_player($url, $autoplay);
    } else {
        return get_youtube_player($url, $autoplay);
    }
}
function get_youtube_id($url)
{
    $parts = parse_url($url);
    if (isset($parts['host'])) {
        $host = $parts['host'];
        if (
            false === strpos($host, 'youtube') &&
            false === strpos($host, 'youtu.be')
        ) {
            return false;
        }
    }
    if (isset($parts['query'])) {
        parse_str($parts['query'], $qs);
        if (isset($qs['v'])) {
            return $qs['v'];
        } else if (isset($qs['vi'])) {
            return $qs['vi'];
        }
    }
    if (isset($parts['path'])) {
        $path = explode('/', trim($parts['path'], '/'));
        return $path[count($path) - 1];
    }
    return false;
}

//Youutube player in a modal, uses modal functions in modal.js and youtube functions in media.js

function get_youtube_player($url, $autoplay = false, $image = false, $rand_id = false)
{
    $id = get_youtube_id($url);
    if (!$id) {
        return false;
    }
    if (!$image) {
        $thumbnail_url = 'https://i1.ytimg.com/vi/' . $id . '/maxresdefault.jpg';
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => $thumbnail_url,
            CURLOPT_HEADER => true,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_NOBODY => true
        ));

        $header = explode("\n", curl_exec($curl));
        curl_close($curl);
        if (strpos($header[0], '200') !== false) {
            $image = '<img src="' . $thumbnail_url . '">';
        } else {
            $image = '<img src="https://i1.ytimg.com/vi/' . $id . '/hqdefault.jpg">';
        }
    } else {
        $image = '<img src="' . $image . '">';
    }
    if ($autoplay) {
        $output = '
        <img src="' . $image . '" class="video_bg__image">
       <iframe class="video_bg__video player youtube" data-src="https://www.youtube.com/embed/' . $id . '?autoplay=1&mute=1&playlist=' . $id . '&loop=1&enablejsapi=1" aria-labelledby="video_' . $id . '" frameborder="0"></iframe>
        <button class="video_bg__play" aria-label="Play video">
            ' . file_get_contents(get_template_directory_uri() . '/assets/play.svg') .
            file_get_contents(get_template_directory_uri() . '/assets/pause.svg') . '
            <span class="screen-reader-text">Play video</span>
        </button>';
        return $output;
    }

    $rand_id = 'video_' . rand(0, 99);
    $svg = file_get_contents(get_template_directory() . '/assets/play.svg');
    $output = '<div class="video"><div class="video_modal" id="' . $rand_id . '"><div class="player youtube" data-id="' . $id . '"></div><button class="close close_video" aria-controls="' . $rand_id . '" aria-expanded="false"><span class="screen-reader-text">Close Video</span>' . file_get_contents(get_template_directory() . '/assets/close_modal.svg') . 'Close</button></div>' . $image . '<button class="video_toggle" aria-controls="' . $rand_id . '" aria-expanded="false"><span class="screen-reader-text">Open Video</span>' . $svg . '</button></div>';
    return $output;
}

function get_vimeo_player($url, $autoplay = false)
{
    $queries = '';
    if ($autoplay) {
        $queries = '?autoplay=1&loop=1&background=1&dnt=1&api=true&responsive=1';
    } else {
        $queries = '&dnt=1';
    }
    $svg = file_get_contents(get_template_directory() . '/assets/play.svg');
    $oembed_str = 'https://vimeo.com/api/oembed.json?url=' . urlencode($url) . '&api=true' . $queries;
    /* if ($autoplay) {
        $output = '
        
        <button class="video_bg__play" aria-label="Play video">
            '.file_get_contents(get_template_directory_uri() . '/assets/play.svg').
            file_get_contents(get_template_directory_uri() . '/assets/pause.svg').'
            <span class="screen-reader-text">Play video</span>
        </button>';
        return $output;
    }
     */
    $request = wp_remote_get($oembed_str);
    if ($request && !is_wp_error($request)) {
        $body = json_decode($request['body']);
        $hires_thumbnail = preg_replace('/_[0-9]+x[0-9]+/', '', $body->thumbnail_url);
        $rand_id = 'video_' . rand(0, 99);
        if ($autoplay) {
            $html = '
            <img src="' . $hires_thumbnail . '" class="video_bg__image">
            <iframe class="video_bg__video player vimeo" src="https://player.vimeo.com/video/' . $body->video_id . $queries . '" data-id="' . $body->video_id . '" data-video_id="' . $body->video_id . '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen allow="autoplay"></iframe>            <button class="video_bg__play" aria-label="Play video">
            ' . file_get_contents(get_template_directory_uri() . '/assets/play.svg') .
                file_get_contents(get_template_directory_uri() . '/assets/pause.svg') . '
            <span class="screen-reader-text">Play video</span>
            </button>';
            return $html . '<script src="https://player.vimeo.com/api/player.js"></script>';
        } else {
            $html = '<div class="video"><div class="video_modal" id="' . $rand_id . '">';
            $html .= substr_replace($body->html, ' class="player vimeo" ', 7, 0);

            return $html . '<script src="https://player.vimeo.com/api/player.js"></script><button class="close close_video" aria-controls="' . $rand_id . '" aria-expanded="false"><span class="screen-reader-text">Close Video</span>' . file_get_contents(get_template_directory() . '/assets/close_modal.svg') . 'Close</button></div><img src="' . $hires_thumbnail . '"><button class="video_toggle" aria-controls="' . $rand_id . '" aria-expanded="false"><span class="screen-reader-text">Open Video</span>' . $svg . '</button></div>';
        }
    } else {
        return '<p>Could not load video</p>';
    }
}

/**
 * Social Media
 */

//Uses an ACF repeater and icons in /assets
function get_social_buttons()
{
    $social_media = get_field('social_media', 'option');
    $social_media_array = ['linkedin', 'facebook', 'instagram', 'X_(formerly_twitter)', 'youtube', 'vimeo', 'bluesky']; ?>
    <div class="flex flex-20 so-me">
        <?php foreach ($social_media_array as $item) { ?>
            <?php if (isset($social_media[$item]) && $social_media[$item]) { ?>
                <a href="<?php echo $social_media[$item]; ?>" target="_blank"><span class="screen-reader-text"><?php echo str_replace('_', ' ', $item); ?></span><?php echo file_get_contents(get_template_directory() . '/assets/' . $item . '.svg'); ?></a>
            <?php } ?>
        <?php } ?>
    </div>
<?php
}

/**
 * Share buttons. Opens share modal on desktop, OS share on mobile. Uses JS in social.js
 */
function get_social_share_buttons()
{
    global $wp;
    $current_url = home_url(add_query_arg(array(), $wp->request));
?>
    <div class="social_share">
        <a href="javascript: void(0)" class="share--button" id="share">
            <span class="screen-reader-text"><?php echo __('Share by OS', 'soul'); ?></span>
            <?php echo file_get_contents(get_template_directory() . '/assets/share.svg'); ?>
        </a>
        <div class="soul_share--icons">
            <a href="https://twitter.com/intent/tweet?url=<?php echo $current_url; ?>&text=" class="soul_share--icon flex_item" target="_blank">
                <span class="screen-reader-text"><?php echo __('Share on Twitter', 'soul'); ?></span>
                <?php echo file_get_contents(get_template_directory() . '/assets/twitter.svg'); ?>
            </a>
            <a href="https://www.facebook.com/sharer/sharer.php?u=<?php echo $current_url; ?>" class="soul_share--icon flex_item" target="_blank">
                <span class="screen-reader-text"><?php echo __('Share on Facebook', 'soul'); ?></span>
                <?php echo file_get_contents(get_template_directory() . '/assets/facebook.svg'); ?>
            </a>
            <a href="https://www.linkedin.com/shareArticle?mini=true&url=<?php echo $current_url; ?>" class="soul_share--icon flex_item" target="_blank">
                <span class="screen-reader-text"><?php echo __('Share on Linked In', 'soul'); ?></span>
                <?php echo file_get_contents(get_template_directory() . '/assets/linked_in.svg'); ?>
            </a>
        </div>
    </div>
    <?php
}
function get_supporter_logos()
{
    $supporters = get_field('supporters_repeater', 'option');
    if ($supporters) { ?>
        <div class="flex supporters_flex">
            <?php
            foreach ($supporters as $supporter) {
                $logo = $supporter['supporter_logo'];
                $name = $supporter['supporter_name'];
                $url = $supporter['supporter_website']; ?>

                <a class="supporter_entry" href="<?php echo $url; ?>" target="_blank"><span class="screen-reader-text"><?php echo $name; ?></span><?php echo wp_get_attachment_image($logo, 'medium'); ?></a>
            <?php
            } ?>
        </div>
    <?php
    }
}
/**
 * Recursive function to get the parent of a page
 */
function get_parent_for_nav($id)
{
    $parent = wp_get_post_parent_id($id);
    if ($parent == 0) {
        return $id;
    } else {
        return get_parent_for_nav($parent);
    }
}

/**
 * Breadcrumbs, always needs some customisation
 */
function get_breadcrumb($id)
{
    $parent = false;
    $grandparent = false;

    if ('search' == $id) {
        $post_type = 'search';
        $link = '/?s';
        $title = 'Search';
    } else {
        $post_type = get_post_type($id);
        $link = get_the_permalink($id);
        $title = get_the_title($id);
    }
    if ('page' == $post_type) {
        $page = get_post_field('post_parent', $id);
        if (!$page) {
            $parent = false;
        } else {
            $parent = '<li class="crumb"><a href="' . get_the_permalink($page) . '">' . get_the_title($page) . '</a></li>';
        }
    } elseif ('news' == $post_type) {
        $grandparent_id = get_id_from_slug('about-us');
        $parent_id = get_id_from_slug('/about-us/whats-new');
        $grandparent = '<li class="crumb"><a href="' . get_the_permalink($grandparent_id) . '">' . get_the_title($grandparent_id) . '</a></li>';
        $parent = '<li class="crumb"><a href="' . get_the_permalink($parent_id) . '">' . get_the_title($parent_id) . '</a></li>';
    } elseif ('event' == $post_type) {
        $parent_id = get_id_from_slug('whats-on');
        $parent = '<li class="crumb"><a href="' . get_the_permalink($parent_id) . '">' . get_the_title($parent_id) . '</a></li>';
    } elseif ('object' == $post_type) {
        $parent_id = get_id_from_slug('collections');
        $parent = '<li class="crumb"><a href="' . get_the_permalink($parent_id) . '">' . get_the_title($parent_id) . '</a></li>';
    } elseif ('collection' == $post_type) {
        $grandparent_id = get_id_from_slug('collections');
        $parent_id = get_id_from_slug('collections/in-the-archive');
        $parent = '<li class="crumb"><a href="' . get_the_permalink($parent_id) . '">' . get_the_title($parent_id) . '</a></li>';
        $grandparent = '<li class="crumb"><a href="' . get_the_permalink($grandparent_id) . '">' . get_the_title($grandparent_id) . '</a></li>';
        if (isset($_GET['gallery'])) {
            $parent .= '<li class="crumb"><a href="' . get_the_permalink() . '">' . $title . '</a></li>';
            $title = $title . ' gallery';
        }
    }
    ?>
    <nav aria-label="Breadcrumb" class="breadcrumbs">
        <ol>
            <li class="crumb">
                <a href="<?php echo get_home_url(); ?>"><?php echo __('Home', 'ace'); ?></a>
            </li>
            <?php echo $grandparent ? $grandparent : ''; ?>
            <?php echo $parent ? $parent : ''; ?>
            <li class="crumb--current">
                <span aria-current="page"><?php echo $title; ?></span>
            </li>
        </ol>
    </nav>
<?php }

function formatSizeUnits($bytes)
{
    if ($bytes >= 1073741824) {
        $bytes = number_format($bytes / 1073741824, 2) . ' GB';
    } elseif ($bytes >= 1048576) {
        $bytes = number_format($bytes / 1048576, 2) . ' MB';
    } elseif ($bytes >= 1024) {
        $bytes = number_format($bytes / 1024, 2) . ' KB';
    } elseif ($bytes > 1) {
        $bytes = $bytes . ' bytes';
    } elseif ($bytes == 1) {
        $bytes = $bytes . ' byte';
    } else {
        $bytes = '0 bytes';
    }

    return $bytes;
}


function getImageOrientation($imagePath)
{

    list($width, $height, $type, $attr) = getimagesize($imagePath);
    if ($width > $height) {
        return 'horizontal';
    } elseif ($width < $height) {
        return 'vertical';
    } else {
        return 'square';
    }
}


function get_id_from_slug($slug)
{
    $page = get_page_by_path($slug);
    if (!$page) {
        return false;
    }
    $page_id = $page->ID;
    return $page_id;
}


function get_readtime($blocks)
{
    // Check if $blocks is an array
    if (!is_array($blocks)) {
        return 0; // Return 0 if $blocks is not an array
    }

    $total_word_count = 0;

    foreach ($blocks as $block) {
        if ($block['acf_fc_layout'] == 'content') {
            $content = $block['content'];
            // Trim the content to remove leading and trailing whitespace
            $content = trim($content);
            // Increment the total word count by the word count of the content
            $total_word_count += str_word_count(strip_tags($content));
        }
    }

    // Set the average reading speed (words per minute)
    $words_per_minute = 200;

    // Calculate the reading time in minutes
    $reading_time_minutes = ceil($total_word_count / $words_per_minute);

    // Return the reading time
    return $reading_time_minutes;
}


function get_link_with_icon($link, $bg = "yellow")
{
    if (!$link || !isset($link['link']) || !$link['link']) {
        return '';
    }
    if (isset($link['icon']) && $link['icon'] && $link['icon'] !== 'none') {
        $icon = file_get_contents(get_template_directory() . '/assets/icons/' . $link['icon'] . '.svg');
    } else {
        $icon = '';
    }
    return '<a href="' . $link['link']['url'] . '" class="link_with_icon pill bg_' . $bg . '" target="' . $link['link']['target'] . '"><span aria-hidden="true">' . $icon . '</span>' . $link['link']['title'] . '</a>';
}

function get_link_button($link)
{
    if (!$link) {
        return '';
    }
    return '<a href="' . $link['url'] . '" class="button bold" target="' . $link['target'] . '">' . $link['title'] . '</a>';
}

function get_link_normal($link)
{
    if (!$link) {
        return '';
    }
    return '<a href="' . $link['url'] . '" class="link bold" target="' . $link['target'] . '">' . $link['title'] . '</a>';
}

function get_link_normal_light($link)
{
    if (!$link) {
        return '';
    }
    return '<a href="' . $link['url'] . '" class="link" target="' . $link['target'] . '">' . $link['title'] . '</a>';
}

function get_link_email($email, $email_label)
{
    if (!$email) {
        return '';
    }
    return '<a href="mailto:' . $email . '" class="link bold" target="_blank">' . $email_label . '</a>';
}

function get_link_file($file, $file_label, $style = '')
{
    if (!$file) {
        return '';
    }
    $file_url = wp_get_attachment_url($file);
    return '<a href="' . esc_url($file_url) . '" download class="link bold ' . $style . ' ">' . $file_label . '</a>';
}

function get_header_with_icon($title, $icon, $tag = "h2")
{
    if (!$title) {
        return '';
    }
    if ($icon && $icon !== 'none') {
        $icon = file_get_contents(get_template_directory() . '/assets/icons/' . $icon . '.svg');
    } else {
        $icon = '';
    }
    return '<' . $tag . ' class="playfair"><span aria-hidden="true">' . $icon . '</span>' . $title . '</' . $tag . '>';
}

function get_header_content($title, $tag = "h2")
{
    if (!$title) {
        return '';
    }
    return '<' . $tag . ' class="bold">' . $title . '</' . $tag . '>';
}

function get_header_span($title, $tag = "h2")
{
    if (!$title) {
        return '';
    }
    return '<' . $tag . ' class="bold padding-x">' . $title . '</' . $tag . '>';
}

function get_header_with_icon_colour($title, $icon, $title_colour, $tag = "h2")
{
    if (!$title) {
        return '';
    }
    if ($icon && $icon !== 'none') {
        $icon = file_get_contents(get_template_directory() . '/assets/icons/' . $icon . '.svg');
    } else {
        $icon = '';
    }
    return '<' . $tag . ' class="' . $title_colour . ' playfair"><span aria-hidden="true">' . $icon . '</span>' . $title . '</' . $tag . '>';
}
