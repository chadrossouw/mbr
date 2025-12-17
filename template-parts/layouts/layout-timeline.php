<?php
$timeline = get_sub_field('timeline');
$i = 0;
if ($timeline) {
    usort($timeline, function ($a, $b) {
        if ($a['year'] == $b['year']) {
            return 0;
        }
        return ($a['year'] < $b['year']) ? -1 : 1;
    }); ?>
    <div class="block timeline margins">
        <div class="sticker start">
           <?php echo __('Our history'); ?>
        </div>
        <?php foreach ($timeline as $time): 
            ob_start();
            if($time['link_mode']=='external'){
                    if ($time['link']) {  
                        echo get_link_normal($time['link']);
                    }
                }
                elseif($time['link_mode']=='pop_up'){?>
                    <button class="toggle_modal" data-modal_id="modal_<?php echo $i; ?>" aria-controls="modal_<?php echo $i; ?>" aria-expanded="false">
                        <?php echo __('Click to read more'); ?>
                    </button>
                    
                <?php }
            $output = ob_get_clean();
            $modal = '';
            if($time['link_mode']=='pop_up'){
                ob_start(); ?>
                <div class="modal" id="modal_<?php echo $i; ?>">
                    <div class="modal_content  bg_beige inner_padding">
                        <button class="close" aria-controls="modal_<?php echo $i; ?>" aria-expanded="false">
                            <?php echo file_get_contents(get_template_directory() . '/assets/close.svg'); ?>
                        </button>
                        <h3 class="timeline_year bold"><?php echo $time['year']; ?></h3>
                        <h2 class="black bold"><?php echo $time['title']; ?></h2>
                        <?php echo apply_filters('the_content', ($time['description']?:'')); ?>
                    </div>
                </div>
                <?php $modal = ob_get_clean(); 
            } ?>
            <div class="card card_timeline grid grid_50 <?php echo $i % 2 !== 0 ? 'grid_invert' : ''; ?> padding no_margin_mobile gap_5 tablet_only">

                <?php echo wp_get_attachment_image($time['image'], 'full');; ?>
                <div class="timeline_info">
                    <h3 class="timeline_year bold"><?php echo $time['year']; ?></h3>
                    <h2 class="black bold"><?php echo $time['title']; ?></h2>
                    <?php
                    echo $time['short_description']; ?>
                    <div class="timeline_link">
                        <?php echo $output; ?>
                    </div>
                </div>
            </div>
            <div class="card card_timeline grid bg_white padding no_margin_mobile gap_1 mobile_only">
                <div class="white_bg">

                </div>
                <h3 class="timeline_year bold"><?php echo $time['year']; ?></h3>
                <h2 class="black bold"><?php echo $time['title']; ?></h2>
                <?php echo wp_get_attachment_image($time['image'], 'full');; ?>
                <?php
                echo $time['short_description']; ?>
                <div class="timeline_link">
                    <?php echo $output; ?>
                </div>
            </div>
        <?php echo $modal;
        $i++;
        endforeach; ?>
        <div class="sticker end">
            What's next?
        </div>
    </div>

<?php }
