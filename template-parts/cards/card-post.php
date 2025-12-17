<?php 
$image = get_the_post_thumbnail( $post,'full'); 
if($image){
    $alt = get_post_meta( get_post_thumbnail_id(), '_wp_attachment_image_alt', true );
}
else{
    $image = '<img src="'.get_template_directory_uri(  ).'/assets/fallback.jpeg" alt="Fallback image." />';
    $alt = "Fallback image.";
} 
$categories = get_the_terms( $post, 'category' );
if($categories){
    $categories = array_map(function($n){
            return '<li><a href="/blog?category='.$n->slug.'" class="cat">'.$n->name.'</a></li>';
        },
        $categories
    );
} ?>
<div class="flex_item post_item">
    <picture class="featured-img alt-block">
        <?php echo $image; ?>
        <div class = "alt_block">
            <button class="alt_trigger" aria-controls="image_<?php echo $post->ID; ?>" aria-expanded="false" aria-label="<?php echo __('Open the Image Description','soul'); ?>">
                Alt
            </button>
            <div class="alt_modal" id="image_<?php echo $post->ID; ?>">
                <p><?php echo $alt?:'Decorative.'; ?></p>
            </div>
        </div>
    </picture>
    <?php if($categories): ?>
        <ul class="cat-list flex">
            <?php echo implode('',$categories); ?>
        </ul>
    <?php endif; ?>
    <h3><a href="<?php echo get_the_permalink($post); ?>"><?php echo get_the_title($post); ?></a></h3>
    <time datetime="<?php echo date('Y-m-d',strtotime($post->post_date)); ?>"><?php echo date('j F Y',strtotime($post->post_date)) ?></time>
</div>