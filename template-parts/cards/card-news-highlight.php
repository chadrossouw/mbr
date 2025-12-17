<?php 
$image = get_the_post_thumbnail($id, 'full');
if(!$image){
    $image = '<img src="'.get_template_directory_uri().'/assets/OG-image.jpg" alt="Placeholder image">';
}
$title = get_the_title($id);
$description = get_field('header_line',$id);
$type = get_the_terms($id, 'news_type');
$type = $type ? $type[0]->name: '';
$post_type = get_post_type($id);
if($post_type=='news'){
    $type = get_the_terms($id, 'news_type');
    $type = $type ? $type[0]->name: 'News';
}
else{
    $type = 'Collection';
}
?>

<header class="page-header header-featured black non_icon_page_header grid grid_35_65 card">
    <div class="header_text padding-left bg_black">
        <div class="header_text_content">
            <p class="white uc small"><?php echo $type; ?></p>
            <h1 class="bold white"><?php echo $title ?></h1>
            <p class="white"><?php echo $description; ?></p>
            <a href="<?php echo get_the_permalink($id); ?>" class="card_target white">
                <?php echo __('Read the full story'); ?>
            </a>
        </div>

    </div>
    <div class="featured_image container container--sixteennine">
        <?php echo $image; ?>
    </div>
</header>