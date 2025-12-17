<?php
$objects = get_field('objects');
if($objects): ?>
    <div class="gallery_objects padding bg_beige">
        <?php echo get_breadcrumb(get_the_ID()); ?>
        <div class="grid grid_25 gap_2">
            <?php foreach($objects as $object): 
                $image = get_the_post_thumbnail($object, 'object_card');
                $title = get_the_title($object);
                $date = get_field('date', $object);
                $description = get_field('description', $object);
                ?>
                <div class="card card-object_highlight bg_white inner-padding">
                    <div class="grid gap_1">
                        <?php echo $image; ?>
                        <h4><?php echo $title; ?></h4>
                        <?php echo $description?apply_filters('the_content',$description):''; ?>
                        <p><strong><?php echo $date; ?></strong></p>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
        <a href="<?php echo get_the_permalink(); ?>" class="bold">
            <?php echo __('Return to ', 'soul').get_the_title(); ?>
        </a>
    </div>
<?php endif;

if(have_rows('gallery_banner')): 
    while(have_rows('gallery_banner')): the_row();
        include get_template_directory() . '/template-parts/layouts/layout-story_banner.php';
    endwhile;
endif;

