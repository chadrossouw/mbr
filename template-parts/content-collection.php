<div class="margins body center">
    <?php echo get_breadcrumb(get_the_ID()); ?>
</div>
<?php
$featured_objects = get_field('featured_objects');
if($featured_objects): ?>
    <div class="featured_objects margins">
        <div class="flex flex_33">
            <?php foreach($featured_objects as $object): ?>
                <div class="flex_item">
                    <h3>
                        <?php echo isset($object['title']) ? $object['title'] : ''; ?>
                    </h3>
                    <div class="container container--threetwo">
                        <?php echo isset($object['image'])?wp_get_attachment_image($object['image'], 'large'):''; ?> 
                    </div>                     
                    <div class="text">
                        <?php echo isset($object['description']) ? apply_filters('the_content',$object['description']) : ''; ?>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
        <?php if(get_field('objects')): ?>
            <h4 class="bold"><a href="?gallery=1"><?php echo __('View more from our ', 'soul').get_the_title().__(' gallery'); ?></a></h4>
        <?php endif; ?>
    </div>
<?php endif;

$object_highlights = get_posts([
    'post_type' => 'object_highlight',
    'posts_per_page' => -1,
    'meta_query' => [
        [
            'key' => 'related_collection',
            'value' => get_the_ID(),
            'compare' => '='
        ]
    ]
]);
if($object_highlights): 
    
    $slides = array_map(function ($object, $index) {
    ob_start();
    include get_template_directory() . '/template-parts/cards/card-object_highlight.php';
    return ob_get_clean();
}, $object_highlights, array_keys($object_highlights));

$slides = array_filter($slides);
?>
<div class="collection_objects padding-left bg_beige">
    <h2><?php echo __('Object highlights'); ?></h2>
    <?php get_carousel($slides); ?>
</div>
<?php endif; ?>
<?php if(have_rows('banner')): 
    while(have_rows('banner')): the_row();
        include get_template_directory() . '/template-parts/layouts/layout-story_banner.php';
    endwhile;
endif;

