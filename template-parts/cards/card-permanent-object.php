<?php
$image = isset($block['image']) ? $block['image'] : null;
$image = wp_get_attachment_image($image, 'card_image');
$title = $block['title'];
$link_to = $block['link_to'];
$page_link = $block['page_link'];
if ($page_link) {
    $page_link_url = $page_link['url'];
} else {
    $page_link_url = false;
}

if ($image) {
?>
    <div class="card card-permanent-object grid gap_1 <?php echo $with_title ? 'bg_white' : 'bg_teal' ?>">
        <div class="container container--threetwo ">
            <?php echo $image; ?>
        </div>
        <a href="<?php echo $page_link_url ? ($page_link_url . '/' . ($link_to ? ('#' . $link_to) : (''))) : ('' . ($link_to ? ('#' . $link_to) : (''))) ?>" class="card_target title"><?php echo $title; ?></a>
    </div>
<?php }
