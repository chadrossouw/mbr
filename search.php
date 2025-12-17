<?php get_header(); 
global $wp_query; ?>
<main id="primary" class="site-main">
    <header class="page-header new_header bg_beige padding search_header">
        <h1 class="screen-reader-text"><?php _e('Search'); ?></h1>
        <?php get_search_form(); ?>
    </header>
    <div class="margins body center news_crumbs">
        <?php echo get_breadcrumb('search'); ?>
    </div>
    <?php if(have_posts() && $wp_query->query['s']): ?>
        <div class="search_results margins">
            <p>
                <?php echo $wp_query->found_posts.' result'.($wp_query->found_posts!==1?'s':'').' found.';?>
            </p>
            <div class="grid gap_2">
                <?php while ( have_posts() ) :
                            the_post();
                            include get_template_directory(). '/template-parts/cards/card-search.php';

                    endwhile;

                the_posts_navigation();?>
            </div>
        </div>
    <?php elseif(!$wp_query->query['s']):
        include get_template_directory() . '/template-parts/partials/fixed_page_links_vars.php';
        $blocks = ['cafe','garden','shop','discover','families','learn'];
        ?>
        <div class="margins"><h2><?php echo __('Plan your visit', 'soul'); ?></h2></div>
        <div class="block margins no_margin_mobile fixed_page_links grid grid_30 gap_3">
            
            <?php
            foreach ($blocks as $block) {
                echo get_fixed_link($block, $fixed_page_links);
            }

            ?>
        </div>
        <?php if(have_rows('search_page_banner', 'options')): ?>
            <?php while (have_rows('search_page_banner', 'options')): the_row(); 
                include get_template_directory() . '/template-parts/layouts/layout-banner.php';
            endwhile; 
        endif;?>
    <?php else: ?>
        <div class="search_results margins">
            <p><?php echo __('Sorry, no results found for your search. Please try again.', 'soul'); ?></p>
        </div>
    <?php endif; ?>
</main>
<?php
get_footer();