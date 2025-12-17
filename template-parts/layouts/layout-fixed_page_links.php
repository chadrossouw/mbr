<?php
include get_template_directory() . '/template-parts/partials/fixed_page_links_vars.php';

$id = get_the_ID();
$title = get_sub_field('heading', $id);
$blocks = get_sub_field('fixed_page_links', $id);
$keys = array_keys($fixed_page_links);
$blocks = array_intersect($keys,$blocks);
?>
<div class="block margins no_margin_mobile fixed_page_links grid grid_30 gap_3">
    <?php
    foreach ($blocks as $block) {
        echo get_fixed_link($block, $fixed_page_links);
    }

    ?>
</div>