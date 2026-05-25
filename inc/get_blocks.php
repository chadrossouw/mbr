<?php

/**
 * Use this for content blocks 
 */

function get_home_hero()
{
    $page_background = get_field('page_background');
    $page_background_mobile = get_field('page_background_mobile');
    $mobile_bg = !empty($page_background_mobile) ? $page_background_mobile : $page_background;
    $hero_content = get_field('hero_content');
?>

    <header class="page-header home_page_header desktop_header" style="background-image: url('<?php echo esc_url($page_background); ?>');">
        <div class="hero-content">
            <?php echo wp_kses_post($hero_content); ?>
        </div>
    </header>
    <header class="page-header home_page_header mobile_header" style="background-image: url('<?php echo esc_url($mobile_bg); ?>');">
        <div class="hero-content mobile">
            <?php echo wp_kses_post($hero_content); ?>
        </div>
    </header>
<?php }


/* <?php $yt_id = get_youtube_id($video); 
    
 */