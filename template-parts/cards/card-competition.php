<?php 
$show_winners = get_field('show_winners',$competition);
$image = $show_winners ? get_field('winners_card_image',$competition) : get_field('card_image',$competition);
if($image){
    $image = wp_get_attachment_image($image,'event_card');
}
else{
    $image = get_the_post_thumbnail($competition,'event_card');
}
$title = get_the_title($competition);
$big_title = $show_winners?get_field('winners_card_title',$competition):get_field('card_title',$competition);
$description = $show_winners?get_field('winners_card_description',$competition):get_field('card_description',$competition);
$background_color = get_field('background_colour',$competition);
?>
<div class="card competition_card rounded <?php echo $background_color;?> grid grid_50 span">
    <div class="container container--threetwo rounded rounded--left">
        <?php echo $image; ?>
        <div class="strapline pill bg_white"><?php echo __('Competition','soul') ?></div>
    </div>
    <div class="padding_2 grid">
        <div class="content--inner grid gap_2">
            <?php echo get_header_with_icon($big_title,'lion'); ?>
            <div class="grid gap">
                <h4><?php echo $title; ?></h4>
                <?php echo $description; ?>
            </div>
            <a href="<?php echo get_the_permalink($competition); ?>" class="card_target uc">
                <?php echo __('Find out more','soul').( !$show_winners ? __(' and how to enter','soul') : '' ); ?>
            </a>
        </div>
    </div>
</div>

