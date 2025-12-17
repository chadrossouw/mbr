<?php

/**
 * Use this for content blocks 
 */

function get_home_hero()
{
    $title = get_field('title');
    $description = get_field('description');
    $background_color = get_field('home_background_color');
    $link = get_field('link');
    $video = get_field('video');
?>

    <header class="page-header header-featured black home_page_header grid grid_35_65 <?php echo $background_color; ?>">
        <div class="header_text padding-left <?php echo $background_color; ?>">
            <div class="header_text_content">
                <h1 class="bold"><?php echo $title ?></h1>
                <p><?php echo $description ?></p>
                <?php echo get_link_button($link) ?>
            </div>

        </div>
        <div class="container container--sixteennine">
           
            <?php echo get_player($video,true); ?>  
        </div>
    </header>
    <?php
    $columns = [
        'times' => get_field('opening_times'),
        'admission' => get_field('admission'),
        'access' => get_field('access'),
        'group_visits' => get_field('group_visits')
    ]
    ?>
    <div class="info_blocks padding bg_beige">
        <div class="grid grid_25">
            <?php foreach ($columns as $type => $column): ?>
                <div class="grid__item top-accent black">
                    <h3 class="uc black work bold"><?php echo $column['title']; ?></h3>

                    <?php if ($type == 'times'):
                    ?> <p> <?php
                            echo get_times(); ?> </p><?php
                                                    else: ?>
                        <?php echo apply_filters('the_content', $column['description']); ?>
                    <?php endif; ?>
                    <?php echo get_link_normal($column['link']); ?>
                </div>
            <?php endforeach; ?>
        </div>
    
    </div>
<?php }


/* <?php $yt_id = get_youtube_id($video); 
    
 */