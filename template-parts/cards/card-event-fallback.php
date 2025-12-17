<?php 
$image = get_field('fallback_image');
$title = get_field('fallback_title');
$description = get_field('fallback_description');
$link = get_field('fallback_link');
?>
<div class="event_highlight_card card rounded bg_mid_green grid grid_50">
    <div class="container container--threetwo rounded rounded--left">
        <?php echo wp_get_attachment_image($image,'large'); ?>
    </div>
    <div class="padding_2">
        <h2><?php echo $title; ?></h2>
        <p><?php echo apply_filters('the_content',$description); ?></p>
        <p></p>
        <a href="<?php echo $link['url']; ?>" class="card_target uc semibold" target="<?php echo $link['target']; ?>">
            <?php echo $link['title']; ?>
        </a>
    </div>
</div>

