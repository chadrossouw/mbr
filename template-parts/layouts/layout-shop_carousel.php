<?php $title = get_sub_field('title'); ?>
<div class="block margins shop">
    <?php if($title): ?>
        <h2 class="uc">
            <?php echo $title; ?>
        </h2>
    <?php endif; ?>
    <?php if(have_rows('items')):?>
        <div class="carousel carousel--shop">
            <div class="swiper-wrapper">
                <?php while(have_rows('items')): the_row();
                    $image = get_sub_field('image');
                    $title = get_sub_field('title');
                    $link = get_sub_field('link');
                    ?>
                    <div class="swiper-slide">
                        <div class="card bg_beige shop_card inner_padding">
                            <a href="<?php echo $link; ?>" class="card_target"><h3 class="book"><?php echo $title; ?></h3></a>
                            <div class="container container--square">
                                <?php echo wp_get_attachment_image($image, 'card_object'); ?>
                            </div>
                        </div>
                    </div>
                <?php endwhile; ?>
            </div>
        </div>
        <div class="button--prev fill_black"><span class="screen-reader-text">Previous Slide</span><?php echo file_get_contents(get_template_directory() . '/assets/prev.svg'); ?></div>
        <div class="button--next fill_black"><span class="screen-reader-text">Next Slide</span><?php echo file_get_contents(get_template_directory() . '/assets/prev.svg'); ?></div>
    
    <?php endif; ?>

</div>