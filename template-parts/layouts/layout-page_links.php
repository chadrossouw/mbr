   <?php
   $id = get_the_ID();
   $title = get_sub_field('title', $id);
   $introduction = get_sub_field('introduction', $id);
   $style = 'stack';
   $link_style = 'hyperlink';
   $align_image = get_sub_field('image_alignment', $id);
   $blocks = get_sub_field('blocks', $id);
   include get_template_directory() . '/template-parts/partials/page_links_' . $style . '.php';
