<?php
$link = $block['link'];

$link = isset($block['link'])? $block['link'] : null;
$link_title = isset($link['title'])? $link['title'] : null;
$icon = isset($block['icon']) ? $block['icon'] : '';
$image = isset($block['image']) ? $block['image'] : null;
$image = wp_get_attachment_image($image['ID'], 'card_image');

$description = $block['description'];
$description = apply_filters('the_content', $description);
?>
<div class="card card--page-links card--page-links-stack grid grid_50 rounded <?php echo $background_color; ?>">
    <div class="container container--threetwo rounded rounded--left">
        <?php echo $image; ?>
    </div>
    <div class="padding_2">
        <?php if ($link && $link_style == 'button'):
            $link_url = $link['url'];
            $title = $block['title'];
            $title = get_header_with_icon_colour($title, $icon, $title_colour, 'h3');
            echo $title;
            echo $description; ?>
            <a href="<?php echo $link_url; ?>" class="button bg_yellow black pill" target="<?php echo $link['target']; ?>"><?php echo $link_title; ?></a>
        <?php elseif ($link && $link_style == 'hyperlink'):
            $link_url = $link['url'];
            $title = $block['title'];
            $title = get_header_with_icon_colour($title, $icon, $title_colour, 'h3');
            echo $title;
            echo $description; ?>
            <a href="<?php echo $link_url; ?>" class="underline bold uc" target="<?php echo $link['target']; ?>"><?php echo $link_title; ?></a>
        <?php elseif ($link): 
            $link_url = $link['url'];
            $title = $block['title'];
            $title = get_header_with_icon_colour($title, $icon, $title_colour, 'h3');?>
            <a href="<?php echo $link_url; ?>" class="underline bold" target="<?php echo $link['target']; ?>"><?php echo $title; ?></a>
            <?php echo $description; ?>
        <?php else: 
            $title = $block['title'];
            $title = get_header_with_icon_colour($title, $icon, $title_colour, 'h3');?>
            <?php echo $title; ?>
            <?php echo $description; ?>
        <?php endif; ?>
    </div>
</div>