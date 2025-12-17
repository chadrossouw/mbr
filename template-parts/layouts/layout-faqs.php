<?php
$title = get_sub_field('title');
$image = false;
?>
<section class="double_padding faqs bg_white desktop_faqs">
    <?php if ($title): ?>
        <h2><?php echo $title; ?></h2>
    <?php endif; ?>
    <?php if ($image): ?>
        <div class="grid grid_2_3">
            <div class="container container--square rounded">
                <?php echo $image; ?>
            </div>
        <?php endif; ?>
        <?php if (have_rows('faqs')): ?>
            <div class="general_faqs">
                <?php while (have_rows('faqs')): the_row(); ?>
                    <details class="faq fill_body">
                        <summary class="fill_body">
                            <h4 class="faq-question baskerville body"><?php echo get_sub_field('question'); ?></h4>
                        </summary>
                        <div class="panel">
                            <?php echo apply_filters('the_content', get_sub_field('answer')); ?>
                        </div>
                    </details>
                <?php endwhile; ?>
            </div>
        <?php endif; ?>
        <?php if ($image): ?>
        </div>
    <?php endif; ?>
</section>
<section class="margins faqs bg_white mobile_faqs">
    <?php if ($image): ?>
        <div class="container container--square rounded">
            <?php echo $image; ?>
        </div>

    <?php endif; ?>
    <?php if ($title): ?>
        <div class="grid grid_2_3">
            <h2><?php echo $title; ?></h2>
        <?php endif; ?>
        <?php if (have_rows('faqs')): ?>
            <div class="general_faqs padding_2">
                <?php while (have_rows('faqs')): the_row(); ?>
                    <details class="faq fill_body">
                        <summary class="fill_body">
                            <h4 class="faq-question baskerville body"><?php echo get_sub_field('question'); ?></h4>
                        </summary>
                        <div class="panel">
                            <?php echo apply_filters('the_content', get_sub_field('answer')); ?>
                        </div>
                    </details>
                <?php endwhile; ?>
            </div>
        <?php endif; ?>
        <?php if ($image): ?>
        </div>
    <?php endif; ?>
</section>