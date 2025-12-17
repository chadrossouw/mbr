<?php
$title = get_the_title($object);
$image = get_the_post_thumbnail($object, 'object_card');
$line  = get_field('header_line', $object)?: get_field('above_the_fold_line', $object);
if ($image) {

?>
    <div class="card card-object_highlight bg_white inner-padding">
        <div class="grid gap">
            <?php echo $image; ?>
            <h4><?php echo $title; ?></h4>
            <p>
                <?php echo $line; ?>
            </p>
            <a href="<?php echo get_the_permalink($object); ?>" class="bold card_target">
                <?php echo __('Read the full story', 'soul'); ?>
            </a>
        </div>
    </div>
<?php }
