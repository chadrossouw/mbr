<?php 
include get_template_directory().'/template-parts/partials/event_variables.php';
?>

<header class="page-header header-featured black non_icon_page_header grid grid_35_65 card">
    <div class="header_text padding-left <?php echo $background_colour; ?>">
        <div class="header_text_content">
            <?php echo $type; ?>
            <h1 class="bold"><?php echo $title ?></h1>
            <p><?php echo get_field('header_line',$event); ?></p>
            <a href="<?php echo get_the_permalink($event); ?>" class="card_target">
                <?php echo $card_link_text; ?>
            </a>
        </div>

    </div>
    <div class="featured_image container container--sixteennine">
        <?php echo get_the_post_thumbnail($event, 'full'); ?>
        <?php if($strapline): ?>
            <div class="strapline bg_white <?php echo $strapline_background; ?>"><?php echo $strapline; ?></div>
        <?php endif; ?>
    </div>
</header>