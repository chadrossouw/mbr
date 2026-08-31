<?php
/**
 * Loops for ACF Flexible content fields
 */
function get_content_layouts($id,$prefix = ''){
    if($prefix){
        $prefix = $prefix.'_';
    }
    if( have_rows($prefix.'home_content_blocks',$id) ):
        while ( have_rows($prefix.'home_content_blocks',$id) ) : the_row();
            $layout = get_row_layout();
            include(get_template_directory() ."/template-parts/layouts/layout-{$layout}.php");
      endwhile;
    endif;
}

function get_essays_content_layouts($post_id = null) {

    if (!$post_id) {
        $post_id = get_the_ID();
    }

    // Flexible content field inside group
    if (have_rows('essay_exhibitions_content_blocks', $post_id)) :

        while (have_rows('essay_exhibitions_content_blocks', $post_id)) : the_row();

            $layout = get_row_layout();

            include get_template_directory() . "/template-parts/layouts/layout-{$layout}.php";

        endwhile;

    endif;
}