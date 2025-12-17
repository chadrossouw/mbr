<?php
/**
 * Listings with rest api ajax filtering and pagination. uses rest functions in rest.php and filters.js
 */





function get_event_listing_filter($filter_type=[],$filter_audience=[],$filter_date=false,$filter_date_type='all'){
    $type = get_terms(['taxonomy'=>'event_type']);
    $audience = get_terms(['taxonomy'=>'event_audience']);
    $date_selector = get_date_selector($filter_date_type,$filter_date);
    $output ='';
    ob_start(); ?>
    <form id="filter"  action="<?php echo site_url( '/wp-json/soul/v1/filter_events'); ?>" method="get" class="grid grid_30 gap_3">
        <div class="grid gap">
            <h3 class="uc">WHEN:</h3>
            <label class="filter_button"><input type="radio" value="all" name="filter_date_type" id="date_filter_all" <?php echo $filter_date_type=='all'?'checked':'';?>>All dates</label>
            <?php foreach(['week','month'] as $_type):
                    if($_type=='week'){
                        $_start = strtotime('last monday', strtotime('tomorrow'));
                    }
                    else{
                        $_start = strtotime('first day of this month');
                    }
                    $start = $_start;
                    $end = strtotime('+1 '.$_type, $start);
                    ?>
                    <label class="filter_button"><input type="radio" value="<?php echo $_type; ?>" name="filter_date_type" data-date="<?php echo date('Y-m-d',$start).'_'.date('Y-m-d',$end);?>" <?php echo $filter_date_type==$_type?'checked':'';?>>By <?php echo $_type; ?></label>
                <?php endforeach; ?>
        </div>  
        <?php if($audience): ?>
            <div class="filter_wrapper">
                <details class="filter">
                    <summary>
                        <div class="selected" data-type="audience">
                            <?php if($filter_audience): ?>
                                <ul aria-label = "<?php _e('Currently selected','pebble');?>">
                                    <?php $audiences = array_filter($audience,function($n)use($filter_audience){
                                        return in_array($n->slug,$filter_audience);
                                    });
                                    foreach($audiences as $filter):?>
                                        <li data-slug="<?php echo $filter->slug; ?>"><?php echo $filter->name;?></li>
                                    <?php endforeach; ?>
                                </ul>
                            <?php else: ?>
                                <?php _e('WHO','pebble'); ?>
                            <?php endif;?>
                        </div>
                    </summary>
                    <div class="filter__content panel">
                        <?php foreach($audience as $term):
                            $checked = in_array($term->slug,$filter_audience)?'checked':''; ?>
                            <input type="checkbox" name="filter_audience[]" class="tax_term " data-taxonomy="audience" data-type="audience" value="<?php echo $term->slug; ?>" id="audience_<?php echo $term->slug; ?>" <?php echo $checked;?>><label for="audience_<?php echo $term->slug; ?>"><?php echo $term->name; ?></label>    
                        <?php endforeach; ?>
                    </div>
                </details>
            </div>
        
        <?php endif; ?>
        <?php if($type): ?>
            <div class="filter_wrapper">
                <details class="filter">
                    <summary>
                        <div class="selected" data-type="event_type">
                            <?php if($filter_type): ?>
                                <ul aria-label = "<?php _e('Currently selected','pebble');?>">
                                    <?php $types = array_filter($type,function($n)use($filter_type){
                                        return in_array($n->slug,$filter_type);
                                    });
                                    foreach($types as $filter):?>
                                        <li data-slug="<?php echo $filter->slug; ?>"><?php echo $filter->name;?></li>
                                    <?php endforeach; ?>
                                </ul>
                            <?php else: ?>
                                <?php _e('WHAT','pebble'); ?>
                            <?php endif;?>
                        </div>
                    </summary>
                    <div class="filter__content panel">
                        <?php foreach($type as $term):
                            $checked = in_array($term->slug,$filter_type)?'checked':''; ?>
                            <input type="checkbox" name="filter_event_type[]" class="tax_term " data-taxonomy="event_type" data-type="event_type" value="<?php echo $term->slug; ?>" id="event_type_<?php echo $term->slug; ?>" <?php echo $checked;?>><label for="event_type_<?php echo $term->slug; ?>" ><?php echo $term->name; ?></label>    
                        <?php endforeach; ?>
                    </div>
                </details>
            </div>
        <?php endif; ?>
        <div class="date_selector">
            <?php echo $date_selector['markup']; ?>
        </div>
        <div class="filter_summary flex <?php echo !$filter_type&&!$filter_audience&&!$filter_date?'hide':'';?>">
            <div class="grid gap_1">
                <p>Showing results for:</p>
                <?php if($filter_date_type!=='all'): 
                    if($filter_date&&!($date_selector['start']<time()&&time()<$date_selector['end'])): ?>
                        <button class="remove date_remover" data-remove="filter_date"><span class="screen-reader-text">Remove the filter: </span><?php echo date_to_maybe_range($date_selector['start'],$date_selector['end'],'j','j F','j F Y'); ?></button>
                    <?php else: ?>
                        <button class="remove date_remover" data-remove="filter_date_type"><span class="screen-reader-text">Remove the filter: </span>This <?php echo $filter_date_type; ?></button>
                    <?php endif; ?>
                <?php endif; ?>
                <?php if($filter_type): 
                    $types = array_filter($type,function($n)use($filter_type){
                        return in_array($n->slug,$filter_type);
                    });
                    foreach($types as $filter):?>
                        <button class="remove type_remover" data-remove="filter_event_type" data-name="<?php echo $filter->slug; ?>"><span class="screen-reader-text">Remove the filter: </span><?php echo $filter->name; ?></button>
                    <?php endforeach; ?>
                <?php endif; ?>
                <?php if($filter_audience): 
                    $audiences = array_filter($audience,function($n)use($filter_audience){
                        return in_array($n->slug,$filter_audience);
                    });
                    foreach($audiences as $filter):?>
                        <button class="remove audience_remover" data-remove="filter_audience" data-name="<?php echo $filter->slug; ?>"><span class="screen-reader-text">Remove the filter: </span><?php echo $filter->name; ?></button>
                    <?php endforeach; ?>
                <?php endif; ?>
            </div>
            <input type="reset" value="<?php _e('Clear all','soul'); ?>" class="black">
        </div>
    </form>
    <?php 
    $output.=ob_get_clean();
    return $output;
}


function get_event_list($type=[],$audience=[],$date=false,$date_type='all'){

    $args = array(
        'post_type'=>'event',
        'posts_per_page'=>-1,
        'meta_key'=>'start_date',
        'orderby'=>'meta_value',
        'order'=>'ASC',
    );
    
    if($type||$audience){
        $args['tax_query']=[];
    }
    if($type){
        $args['tax_query'][]=
           [ 
            'taxonomy'=>'event_type',
            'terms'=>$type,
            'field'=>'slug',
           ];
    }
    if($audience){
        $args['tax_query'][]=
           [ 
            'taxonomy'=>'event_audience',
            'terms'=>$audience,
            'field'=>'slug',
           ];
    }
    if($date){
        /* if($date_type=='week'){
            $start = strtotime('last monday', strtotime('tomorrow'));
            $end = strtotime('+1 week', $start);
        }
        else{
            $start = strtotime('first day of this month');
            $end = strtotime('+1 month', $start);
        } */
        $date = explode('_',$date);
        $args['meta_query'][]=[
            [ 
                'key'=>'dates_$_start',
                'value'=>[$date[0],$date[1]],
                'compare'=>'BETWEEN',
            ],
        ];
    }
    elseif($date_type!=='all'){
        if($date_type=='week'){
            $start = strtotime('last monday', strtotime('tomorrow'));
            $end = strtotime('+1 week', $start);
        }
        else{
            $start = strtotime('first day of this month');
            $end = strtotime('+1 month', $start);
        }
        $args['meta_query'][]=[
            [ 
                'key'=>'dates_$_start',
                'value'=>[date('Y-m-d H:i:s',$start),date('Y-m-d H:i:s',$end)],
                'compare'=>'BETWEEN',
            ],
        ];
    }
    $output='';
    $_query = new WP_Query( $args );
    if($_query->have_posts()){
        while($_query->have_posts()){
            $_query->the_post();
            ob_start();
            $event = get_the_ID();
            include get_template_directory().'/template-parts/cards/card-event.php';
            $output.=ob_get_clean();
        }
    }
    else{
        $output .= '<article class="no_more">'.__('There are currently no events available','soul').'</article>';
    }
    return $output;
}

function get_date_selector($filter_date_type='all',$filter_date=false){ 
    $output='';
    $start = '';
    $end = '';
    if($filter_date_type!=='all'):
        if($filter_date_type=='week'){
           $_start = strtotime('last monday', strtotime('tomorrow'));
        }
        else{
            $_start = strtotime('first day of this month');
        }
        
        if($filter_date):
            $dates = explode('_',$filter_date);
            $start = strtotime($dates[0]);
            $end = strtotime($dates[1]);
            $prev = date('Y-m-d',strtotime('-1 '.$filter_date_type,$start));
            $next = date('Y-m-d',strtotime('+1 '.$filter_date_type,$end));
        else:
            $start = $_start;
            $end = strtotime('+1 '.$filter_date_type, $start);
            $prev = date('Y-m-d',strtotime('-1 '.$filter_date_type,$start));
            $next = date('Y-m-d',strtotime('+1 '.$filter_date_type,$end));
        endif;
        ob_start();
        if($prev>=date('Y-m-d',$_start)):?>
            <button class="date_changer prev_date" data-date="<?php echo $prev; ?>_<?php echo date('Y-m-d',$start);?>" aria-label="<?php _e('Previous date','soul');?>">
                <span class="screen-reader-text"><?php _e('Previous date','soul');?></span>
                <?php echo file_get_contents(get_template_directory() . '/assets/down_arrow.svg'); ?>
            </button>
        <?php endif; ?>
        <h4>
            <?php echo date_to_maybe_range($start,$end, 'j', 'j F', 'j F Y'); ?>
            <input type="hidden" name="filter_date" id="filter_date" value="<?php echo date('Y-m-d',$start).'_'.date('Y-m-d',$end);?>">
        </h4>
        <button class="date_changer next_date" data-date="<?php echo date('Y-m-d',$end); ?>_<?php echo $next; ?>" aria-label="<?php _e('Next date','soul');?>">
            <span class="screen-reader-text"><?php _e('Next date','soul');?></span>
            <?php echo file_get_contents(get_template_directory() . '/assets/down_arrow.svg'); ?>
        </button>

    <?php $output = ob_get_clean();
    endif;
    
    return ['start'=>$start,'end'=>$end,'markup'=>$output];
}    

//Filter to make date repeater queryable
function wpza_replace_repeater_field( $where ) {
    if( strpos( $where, "meta_key = 'dates_$" ) !== false ) {
        $where = str_replace( "meta_key = 'dates_$", "meta_key LIKE 'dates_%", $where );
    }
    return $where;
}
add_filter( 'posts_where', 'wpza_replace_repeater_field' );

?>