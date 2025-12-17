<?php
$title = get_sub_field('title');
$icon = get_sub_field('icon');

$args = [
    'post_type' => ['news', 'collection', 'object_highlight'],
    'posts_per_page' => 4,
    'post_status' => 'publish',
    'orderby' => 'date',
    'order' => 'DESC'
];
if (is_singular('news')) {
    $title = 'Other news you may be interested in';
    $icon = 'lyre';
    $args['post__not_in'] = [get_the_ID()];
}
$news = new WP_Query($args);
if ($news->have_posts()): ?>
    <div class="block news_block padding bg_white">
        <div class="flex whats_on_block_header">
            <?php echo get_header_content($title); ?>
            <a href="<?php echo get_site_url() . '/about-us/whats-new'; ?>" class="uc black semibold"><?php echo __('Read all news', 'soul'); ?> </a>
        </div>
        <ul class="flex flex_25">
            <?php
            while ($news->have_posts()): $news->the_post();
                $news_id = get_the_ID();
                include get_template_directory() . '/template-parts/cards/card-news.php';
            endwhile;
            ?>
        </ul>
    </div>
<?php endif; ?>
<?php wp_reset_postdata(); ?>