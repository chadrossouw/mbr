<?php
/**
 * Layout: Three Column With Form
 */
?>

<section class="three-col-with-form">

    <?php if (have_rows('columns')) : ?>

        <div class="three-col-grid">

            <?php while (have_rows('columns')) : the_row();

                $image = get_sub_field('image');
                $text  = get_sub_field('text');
                $link  = get_sub_field('link');

                /*
                 * Skip completely empty rows
                 */
                if (empty($image) && empty($text) && empty($link)) {
                    continue;
                }
            ?>

                <?php if (!empty($link)) : ?>
                    <a class="three-col-card"
                       href="<?php echo esc_url($link); ?>">
                <?php else : ?>
                    <div class="three-col-card">
                <?php endif; ?>

                        <?php if (!empty($text)) : ?>
                            <div class="card-text">
                                <h2><?php echo esc_html($text); ?></h2>
                            </div>
                        <?php endif; ?>

                        <?php if (!empty($image)) : ?>
                            <div class="card-image">
                                <img src="<?php echo esc_url($image); ?>" alt="">
                            </div>
                        <?php endif; ?>

                <?php if (!empty($link)) : ?>
                    </a>
                <?php else : ?>
                    </div>
                <?php endif; ?>

            <?php endwhile; ?>

        </div>

    <?php endif; ?>


    <?php
    $form_text = get_sub_field('form_text');
    $form_shortcode = get_sub_field('form_shortcode');

    /*
     * Only render form section if content exists
     */
    if ($form_text || $form_shortcode) :
    ?>

        <div class="form-row">

            <div class="form-content">

                <?php if (!empty($form_text)) : ?>
                    <div class="form-text">
                        <?php echo wp_kses_post($form_text); ?>
                    </div>
                <?php endif; ?>

                <?php if (!empty($form_shortcode)) : ?>
                    <div class="form-wrapper">
                        <?php echo do_shortcode($form_shortcode); ?>
                    </div>
                <?php endif; ?>

            </div>

        </div>

    <?php endif; ?>

</section>