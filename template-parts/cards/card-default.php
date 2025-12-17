<li class="default_card card grid">
    <div class="container container--threetwo bottom_border">
        <?php if(has_post_thumbnail()):
            echo get_the_post_thumbnail();
        ?><?php else: ?>
            <img src="<?php echo get_template_directory_uri().'/assets/attractions/icon_default_secondary.svg'; ?>" class="contain bg_body" alt="<?php echo get_the_title(); ?>">
        <?php endif;?>
    </div>
    <div class="event_header padding_2">
        <a href="<?php echo get_the_permalink(); ?>" class="card_target"><h4><?php echo get_the_title(); ?></h4></a>
        <p class="underline"><?php echo __('Find out more','soul'); ?></p>
    </div>
</li>
