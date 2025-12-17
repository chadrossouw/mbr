<?php
$title = get_sub_field('title');
$icon = get_sub_field('icon');
$address = get_field('footer_address', 'option');
?>

<div class="block map_block margins grid grid_content gap_5">
    <article class="">
        <div class="map_block--faqs">
            <div class="">
                <h3 class="uc"><?php echo $title ?></h3>
                <address class="address">
                    <?php echo $address; ?>
                </address>
                <?php echo get_telephone_numbers() ?>
                <?php if (have_rows('faqs')): ?>
                    <div class="general_faqs">
                        <?php while (have_rows('faqs')): the_row(); ?>
                            <details class="faq fill_body">
                                <summary class="fill_body">
                                    <h4 class="faq-question body"><?php echo get_sub_field('question'); ?></h4>
                                </summary>
                                <div class="panel">
                                    <?php echo apply_filters('the_content', get_sub_field('answer')); ?>
                                </div>
                            </details>
                        <?php endwhile; ?>
                    </div>
                <?php endif; ?>
            </div>
        </div>
    </article>
    <aside>
        <div class="map_block--map bg_grey">
            <?php echo get_google_map(); ?>
        </div>
    </aside>

</div>
