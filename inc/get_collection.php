<?php 
function get_collection_search($id,$params=['general_search'=>'','title'=>'','catalogue_no'=>'','object_type'=>'','material'=>'','maker'=>'']){
    ?>
    <div class="search_header wysiwyg_margins margins">
        <?php get_breadcrumb($id,true); ?>
        <div class="search_description">
            <?php if($content = get_field('search_description')){
                echo apply_filters('the_content',$content); 
            }?>
        </div>
        <?php get_collection_search_form($params); ?> 
    </div>
<?php 
}

function get_collection_search_form($params){ 
    $has_search = array_filter($params,function($n){return $n;}); ?>
    <h5>Search the collection</h5>
    <form action="/collection/search-the-collection" method="GET">
        <div class="search_group">
            <label class="screen-reader-text" for="general_search">Search</label>
            <input type="text" id="general_search" name="general_search" placeholder="Type a title, person, or keyword" value="<?php echo $params['general_search']; ?>">
            <input type="submit" value="Search" class="green">
        </div>
    </form>
        <details class= "advanced_search" <?php echo $has_search&&!isset($has_search['general_search'])?'open':'';?>>
            <summary class = "advanced_search_title"  >
                Advanced Search
            </summary>
            <div class="content">
                <form action="/collection/search-the-collection" method="GET">
                    <label for="title">Title
                        <input type="text" id="title" name="title" value="<?php echo $params['title']; ?>">
                    </label>
                    <label for="catalogue_no">Catalogue Number
                        <input type="text" id="catalogue_no" name="catalogue_no" value="<?php echo $params['catalogue_no']; ?>">
                    </label>
                    <label for="object_type">Object Type
                        <select name= "object_type" id="object_type">
                            <option value="">Select...</option>
                            <?php $terms = get_terms(['taxonomy'=>'object-type']);
                            foreach($terms as $term){ ?>
                                <option value="<?php echo $term->term_id; ?>" <?php echo $params['object_type']==$term->term_id?'selected':''; ?>><?php echo $term->name; ?></option>
                            <?php } ?>
                        </select>
                    </label>
                    <label for="material">Material
                        <input type="text" id="material" name="material" value="<?php echo $params['material']; ?>">
                    </label>
                    <label for="maker">Name (Artist, maker, organisation etc)
                        <input type="text" id="maker" name="maker" value="<?php echo $params['maker']; ?>">
                    </label>
                    <label for="Results per page">Results per Page
                        <select name= "results_per_page" id="results_per_page">
                            <option value="">Select...</option>
                            <?php $results_per_page = isset($params['results_per_page'])?$params['results_per_page']:18;
                            for($i=6; $i<=60;$i+=6){ ?>
                                <option value="<?php echo $i; ?>" <?php echo $results_per_page==$i?'selected':''; ?>><?php echo $i; ?></option>
                            <?php } ?>
                        </select>
                    </label>
                    <div class="submit">
                        <input type="submit" value="Search" class="link_button dark_blue">
                    </div>
                </form>
            </div>
        </details>
    </form>
<?php }

add_filter('ep_post_fuzziness_arg', 'ep_fuzziness_arg', 10, 2);
add_filter('ep_post_match_fuzziness', 'ep_fuzziness_arg', 10, 2);
function ep_fuzziness_arg($arg, $fuzziness) {
    return 0;
}

function get_collection_search_results($params){ ?>
    <section class="search_results margins">
    <?php 
    $paged = get_query_var('paged')?get_query_var('paged'):1;
    $has_search = array_filter($params,function($n){return $n;});
    if($has_search){
        $args =[
            'post_type'=>'object',
            'posts_per_page'=>18,
            'paged'=>$paged,
            'ep_integrate' => true,
        ];
        if($params['results_per_page']){
            $args['posts_per_page']=intval($params['results_per_page']);
        }
        
        if($params['general_search']){
            //add_filter('posts_where','general_where',10,2);
            //add_filter('posts_join', 'general_join',10,2);
            //add_filter('posts_groupby', 'general_groupby',10,2);
            $args['s']=$params['general_search'];
            $args['orderby']='relevance';
            $args['order']='ASC';
            $args['search_fields']=[
                'post_title',
                'post_content',
                'taxonomies'=>array('object-type','material','technique')
            ];
        }
        else{
            $args['orderby']='title';
            $args['order']='ASC';
        }
        if($params['title']){
            //add_filter( 'posts_where', 'title_filter', 10, 2 );
            //$args['search_object_title']=$params['title'];
            if(!isset($args['s'])){
                $args['s'] = $params['title'];
            }
            else{
                $args['s'] .= ' '. $params['title'];
            }
            /* if(!isset($args['search_fields'])){
                $args['search_fields'] = [];
            }
            $args['search_fields'][] = 'post_title'; */
        }
        if($params['catalogue_no']){
            if(!isset($args['meta_query'])){
                $args['meta_query']=[];
            }
            else{
                $args['meta_query']['relation']='AND';
            }
            $args['meta_query'][]=
                [
                    'key'=>'catalogue_number',
                    'value'=>$params['catalogue_no'],
                    'compare'=>'LIKE'
                ];
        }
        if($params['object_type']){
            $args['tax_query']=[
                [
                    'taxonomy'=>'object-type',
                    'terms'=>[$params['object_type']],
                ]
            ];
        }
        if($params['technique']){
            $args['tax_query']=[
                [
                    'taxonomy'=>'technique',
                    'terms'=>[$params['technique']],
                ]
            ];
        }
        if($params['material']){
            //add_filter('posts_where','material_where',10,2);
            //add_filter('posts_join', 'material_join',10,2);
            //add_filter('posts_groupby', 'material_groupby',10,2);
            if(!isset($args['s'])){
                $args['s'] = $params['material'];
            }
            else{
                $args['s'] .= ' '. $params['material'];
            }
            if(!isset($args['search_fields'])){
                $args['search_fields'] = [];
            }
            $args['search_fields']['taxonomies'] = ['material'];
        }
        if($params['maker']){
            /* if(!isset($args['meta_query'])){
                $args['meta_query']=[];
            }
            else{
                $args['meta_query']['relation']='AND';
            }
            $args['meta_query'][]=
                [
                    'key'=>'artist_maker',
                    'value'=>$params['maker'],
                    'compare'=>'LIKE'
                ]; */
            if(!isset($args['s'])){
                $args['s'] = $params['maker'];
            }
            else{
                $args['s'] .= ' '. $params['maker'];
            }
            if(!isset($args['search_fields'])){
                $args['search_fields'] = [];
            }
            $args['search_fields']['meta'] = ['artist_maker'];  
        }
        $the_query = new WP_Query( $args );
        ?>
        
            <?php if($the_query->have_posts() ){ 
                $count = $the_query->found_posts; ?>
                <p class="object_count"><?php echo $count; ?> object<?php echo $count>1?'s':''; ?></p>
                <div class="block links-six flex flex-sixteen">
                    <?php while($the_query->have_posts() ){ $the_query->the_post();?>
                        <div class= "link_item_six link_item flex bg-fff">
                            <a href="<?php echo get_the_permalink();?>">
                                <?php $thumbnail = get_the_post_thumbnail(get_the_ID(),'large'); ?>
                                <div class="link_item_image container container--square <?php echo str_contains($thumbnail,'default-1.png')?'default':''; ?>">
                                    <?php echo $thumbnail; ?>
                                </div>
                                <div class="link_item_text">
                                    <h3><?php echo get_the_title();?></h3>
                                </div>
                            </a>
                        </div>
                    <?php } ?>
                </div>
                <?php
                $url = site_url().'/collections/search-the-collection/%_%';
                $paginate = paginate_links( array(
                    'base'         => $url,
                    'total'        => $the_query->max_num_pages,
                    'current'      => max( 1, $paged),
                    'format'       => '?paged=%#%',
                    'show_all'     => false,
                    'type'         => 'plain',
                    'end_size'     => 5,
                    'mid_size'     => 1,
                    'prev_next'    => true,
                    'prev_text'    => '<span class="screen-reader-text">Previous Page</span>&lsaquo; previous',
                    'next_text'    => '<span class="screen-reader-text">Next Page</span>next &rsaquo;',
                    'add_args'     => false,
                    'before_page_number'=>'<li class="page-num">',
                    'after_page_number'=>'</li>',
                    'add_fragment' => '',
                ) );

                if($paginate){
                    echo '<ul class="pagination d-flex">'
                    .$paginate.
                    '</ul>';  
                }
            }
            else{ ?>
                <h3>No Results Match Your Query</h3>
            <?php } 
            //remove_filter( 'posts_where', 'title_filter', 10, 2 );
            //remove_filter( 'posts_where', 'material_where', 10, 2 );
            //remove_filter( 'posts_where', 'material_join', 10, 2 );
            //remove_filter( 'posts_where', 'material_groupby', 10, 2 );
            //remove_filter( 'posts_where', 'general_where', 10, 2 );
            //remove_filter( 'posts_where', 'general_join', 10, 2 );
           // remove_filter( 'posts_where', 'general_groupby', 10, 2 );
            wp_reset_postdata(); 
        }
        else{ ?>
         <h3>Please enter a query above</h3>
        <?php } ?>
    </section>
<?php }

function title_filter( $where, $wp_query ){
    global $wpdb;
    if ( $search_term = $wp_query->get( 'search_object_title' ) ) {
        $where .= ' AND ' . $wpdb->posts . '.post_title LIKE \'%' . esc_sql( $wpdb->esc_like( $search_term ) ) . '%\'';
    }
    return $where;
}

function material_where($where, $wp_query ){
    global $wpdb;
    if ( $search_term = $wp_query->get( 'search_material' ) ) {
      $where .= "AND (t.name LIKE '%".esc_sql( $wpdb->esc_like( $search_term ) )."%' AND {$wpdb->posts}.post_status = 'publish')";
    }
    return $where;
}

function material_join($join,$wp_query){
    global $wpdb;
    if ( $search_term = $wp_query->get( 'search_material' ) ) {
    $join .= "LEFT JOIN {$wpdb->term_relationships} tr ON {$wpdb->posts}.ID = tr.object_id INNER JOIN {$wpdb->term_taxonomy} tt ON tt.term_taxonomy_id=tr.term_taxonomy_id INNER JOIN {$wpdb->terms} t ON t.term_id = tt.term_id";
    }
    return $join;
}

function material_groupby($groupby,$wp_query){
    global $wpdb;

    // we need to group on post ID
    $groupby_id = "{$wpdb->posts}.ID";
    // groupby was empty, use ours
    if(!strlen(trim($groupby))) return $groupby_id;

    // wasn't empty, append ours
    return $groupby.", ".$groupby_id;
}

function general_where($where, $wp_query ){
    global $wpdb;
    if ( $search_term = $wp_query->get( 's' ) ) {
      $where .= " OR (m.meta_value LIKE '%".esc_sql( $wpdb->esc_like( $search_term ) )."%' AND {$wpdb->posts}.post_status = 'publish')";
      $where .= " OR (t.name LIKE '%".esc_sql( $wpdb->esc_like( $search_term ) )."%' AND {$wpdb->posts}.post_status = 'publish')";

    }
    return $where;
}

function general_join($join,$wp_query){
    global $wpdb;
    if ( $search_term = $wp_query->get( 's' ) ) {
        $join .= " LEFT JOIN {$wpdb->postmeta} m ON {$wpdb->posts}.ID = m.post_id";
        $join .= " LEFT JOIN {$wpdb->term_relationships} tr ON {$wpdb->posts}.ID = tr.object_id INNER JOIN {$wpdb->term_taxonomy} tt ON tt.term_taxonomy_id=tr.term_taxonomy_id INNER JOIN {$wpdb->terms} t ON t.term_id = tt.term_id";

    }
    return $join;
}

function general_groupby($groupby,$wp_query){
    global $wpdb;

    // we need to group on post ID
    $groupby_id = "{$wpdb->posts}.ID";
    // groupby was empty, use ours
    if(!strlen(trim($groupby))) return $groupby_id;

    // wasn't empty, append ours
    return $groupby.", ".$groupby_id;
}

function get_collection_by_theme($id){ ?>
    <section class="block links-four_container padding collection_by_theme">
    <h2>Collection by Theme</h2>
    <div class="block links-four flex flex-twentyfive">
    <?php if(have_rows('collection_by_theme',$id)):
        while(have_rows('collection_by_theme',$id)): the_row(); 
            $link=get_site_url().'/search-the-collection/?';
            $taxs = get_sub_field('select_taxonomies');
            foreach($taxs as $name=>$tax_ids){
                if($tax_ids){
                    $link.=$name.'='.urlencode(implode(',',$tax_ids));
                }
            }
            ?>
            <div class= "link_item_four link_item flex bg-fff">
                <a href="<?php echo $link;?>">
                    <div class="link_item_image container container--sixteennine">
                        <?php echo wp_get_attachment_image(get_sub_field('image'),'large'); ?>
                    </div>
                    <div class="link_item_text">
                        <h3><?php echo get_sub_field('theme');?></h3>
                    </div>
                </a>
            </div>
            
         <?php
        endwhile;
    endif; ?>
    </div>
    </section>
<?php
}

/**Adjusting the ACF query for Post Object, adding the catalogue number to the title*/
add_filter('acf/fields/relationship/result/key=field_6411a465f12af','show_catalogue_number', 10,4);
function show_catalogue_number($text, $post, $field, $post_id){
    $text = get_post_meta($post->ID,'catalogue_number')[0].' '.$text;
    return $text;
}

/**Adjusting the ACF query for Post Object, allows us to search by catalogue number*/
add_filter('acf/fields/relationship/query/key=field_6411a465f12af','search_by_catalogue_number', 10,3);
function search_by_catalogue_number($args, $field, $post_id ){
    if(isset($args['s'])){
        /* $args['meta_query']=[
            [
                'key'=>'catalogue_number',
                'value'=>$args['s'],
                'compare'=>'LIKE'
            ]
        ]; */
        $args['acf_search_object_title'] = $args['s'];
        unset($args['s']);
    }
    $args['orderby']='meta_value';
    $args['meta_key']='catalogue_number';
    return $args;
}

add_filter( 'posts_where', 'acf_title_filter', 10, 2 );
function acf_title_filter( $where, $wp_query ){
    global $wpdb;
    if ( $search_term = $wp_query->get( 'acf_search_object_title' ) ) {
        $where .= ' AND ' . $wpdb->posts . '.post_title LIKE \'%' . esc_sql( $wpdb->esc_like( $search_term ) ) . '%\'';
        $where .= " OR (m.meta_value LIKE '%".esc_sql( $wpdb->esc_like( $search_term ) )."%' AND {$wpdb->posts}.post_status = 'publish')";
    }
    return $where;
} 

add_filter('posts_join', 'acf_meta_join',10,2);
function acf_meta_join($join,$wp_query){
    global $wpdb;
    if ( $search_term = $wp_query->get( 'acf_search_object_title' ) ) {
        $join .= " LEFT JOIN {$wpdb->postmeta} m ON {$wpdb->posts}.ID = m.post_id";
    }
    return $join;
}


add_filter( 'manage_object_posts_columns', 'set_custom_edit_object_columns' );
function set_custom_edit_object_columns($columns) {
    unset( $columns['author'] );
    unset( $columns['date'] );
    $columns['catalogue_number'] = __( 'Catalogue Number');


    return $columns;
}

add_action( 'manage_object_posts_custom_column' , 'custom_object_column', 10, 2 );
function custom_object_column( $column, $post_id ) {
    switch ( $column ) {

        case 'catalogue_number' :
            echo get_post_meta( $post_id , 'catalogue_number' , true ); 
            break;
    }
}

add_filter( 'manage_edit-object_sortable_columns', 'custom_object_column_sort'); 
function custom_object_column_sort( $columns ){
    $columns[ 'catalogue_number' ] = 'catalogue_number';

    return $columns;
} ;

// Column Ordering
add_filter( 'pre_get_posts','custom_letter_column_sort_action') ;
function custom_letter_column_sort_action( $query ){
    if( ! is_admin() || ! $query->is_main_query() )
      return;

    if ( 'letter_no' === $query->get( 'orderby') ) {
      $query->set( 'orderby', 'meta_value' );
      $query->set( 'meta_key', 'catalogue_number' );
    }

};


/* function extend_admin_search() {
    global $typenow;

    if ($typenow === 'object') {
        add_filter('posts_search', 'posts_search_objects', 10, 2);
    }
}

/**
 * add query condition for custom meta
 * @param string $search the search string so far
 * @param WP_Query $query
 * @return string
 */
/* function posts_search_objects($search, $query) {
    global $wpdb;

    if ($query->is_main_query() && !empty($query->query['s'])) {
        $sql    = "
        or exists (
            select * from {$wpdb->postmeta} where post_id={$wpdb->posts}.ID
            and meta_key in ('catalogue_number')
            and meta_value like %s
        )
    ";
        $like   = '%' . $wpdb->esc_like($query->query['s']) . '%';
        $search = preg_replace("#\({$wpdb->posts}.post_title LIKE [^)]+\)\K#",
            $wpdb->prepare($sql, $like), $search);
    }

    return $search;
}
add_action('admin_init', 'extend_admin_search'); */