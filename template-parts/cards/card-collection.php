<?php
$image = get_field('featured_image',$term);
if($image){
    $image = wp_get_attachment_image($image,'collection_square');
}
else{
    $first_post = get_posts(array('post_type'=>'object','posts_per_page'=>1,'tax_query'=>array(array('taxonomy'=>'classification','field'=>'slug','terms'=>$term->slug))));
    if($first_post){
        $image = get_the_post_thumbnail($first_post[0]->ID,'collection_square');
    }
    else{
        $image = '<img src="'.get_template_directory_uri().'/assets/logo.svg" width="255" height="255" style="object-fit:contain;background-color:#fff;" alt="'.$term->name.'">';
    }
}
?>
<li class="collection-card card grid <?php echo $style=='carousel'?'swiper-slide':'';?> rounded bg_white padding_2">
    <h3><a href="/our-collection?collection=<?php echo $term->slug; ?>" class="card_target"><?php echo $term->name; ?></a></h3>
    <div class="container container--square">
        <?php echo $image; ?>
    </div>
</li>
