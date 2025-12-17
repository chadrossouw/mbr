<?php
$permalink = get_permalink($news_id);
$news_post = get_post($news_id);
$post_type = get_post_type($news_post);
$title = get_the_title($news_id);
$image = get_the_post_thumbnail($news_id, 'card_image');
if (!$image) {
    $image = '<img src="' . get_template_directory_uri() . '/assets/OG-image.jpg" alt="Placeholder image">';
}
$date = get_the_date('j F Y', $news_id);
$description = get_field('short_description', $news_id);
if($post_type=='news'){
    $type = get_the_terms($news_id, 'news_type');
    $type = $type ? $type[0]->name: 'News';
}
else{
    $type = 'Collection';
}
if ($description == false) {
    $content_blocks = get_field('content_blocks', $news_id);
    if ($content_blocks) {
        foreach ($content_blocks as $content_block) {
            if ($content_block['acf_fc_layout'] === 'content') {
                $content = $content_block['content'];
                // Remove HTML formatting
                $content = strip_tags($content);
                // Extract the first 200 characters of text
                $excerpt = substr($content, 0, 200);
                // Check if the extracted text ends in the middle of a word
                $last_space = strrpos($excerpt, ' ');
                if ($last_space !== false) {
                    $excerpt = substr($excerpt, 0, $last_space);
                }
                // Add ellipsis
                $excerpt .= '...';
                $description = $excerpt;
                break; // Stop loop after the first 'content' block is found
            }
        }
    }
}
?>
<li class="listing-item flex_item">
    <div class="card news-item grid gap_1">
        <div class="container container--threetwo card-image">
            <?php echo $image; ?>
        </div>
        <div class="grid gap">
            <p class="uc"><?php echo $type; ?></p>
            <h3 class="black card-info-title book"><?php echo $title; ?></h3>
            <?php echo apply_filters('the_content', $description); ?>
            <a href="<?php echo $permalink; ?>" class="arrowed card_target">
                Read full story
            </a>
        </div>
    </div>
</li>