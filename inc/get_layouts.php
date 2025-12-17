<?php
/**
 * Loops for ACF Flexible content fields
 */
function get_content_layouts($id,$prefix = ''){
    if($prefix){
        $prefix = $prefix.'_';
    }
    if( have_rows($prefix.'content_blocks',$id) ):
        while ( have_rows($prefix.'content_blocks',$id) ) : the_row();
            $layout = get_row_layout();
            include(get_template_directory() ."/template-parts/layouts/layout-{$layout}.php");
      endwhile;
    endif;
}

