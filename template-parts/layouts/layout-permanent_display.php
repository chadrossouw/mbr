<?php
$id = get_the_ID();
$title = get_sub_field('title');
$objects = get_sub_field('jump_links', $id);
$link = get_sub_field('link', $id);
$with_title = get_sub_field('with_title', $id);
?>
<div class="block permanent_display padding <?php echo $with_title ? 'bg_teal' : 'bg_white' ?>">
    <?php if ($with_title) : ?>
        <div class="flex whats_on_block_header">
            <h2 class="black"><?php echo $title; ?></h2>
            <a href="<?php echo $link['url']; ?>" class="uc black semibold arrowed"><?php echo $link['title']; ?> </a>
        </div>
    <?php endif ?>
    <div class="permanent_objects grid grid_25 gap_3">
        <?php foreach ($objects as $block) {
            include get_template_directory() . '/template-parts/cards/card-permanent-object.php';
        } ?>
    </div>
</div>