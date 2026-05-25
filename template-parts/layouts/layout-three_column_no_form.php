<?php
/**
 * Layout: Three Column No Form
 */
?>

<?php
    $layout = get_sub_field('columns');
?>

<section class="three-col-no-form">

    <?php if (!empty($layout)) : ?>

        <div class="three-col-grid">

            <?php foreach ($layout as $row) :

                $image = $row['image'] ?? '';
                $text  = $row['text'] ?? '';
                $link  = $row['link'] ?? '';

                if (empty($image) && empty($text) && empty($link)) {
                    continue;
                }
            ?>

                <?php if (!empty($link)) : ?>
                    <a class="three-col-card" href="<?php echo esc_url($link); ?>">
                <?php else : ?>
                    <div class="three-col-card">
                <?php endif; ?>

                        <?php if (!empty($image)) : ?>
                            <div class="card-image">
                                <img src="<?php echo esc_url($image); ?>" alt="">
                            </div>
                        <?php endif; ?>

                        <?php if (!empty($text)) : ?>
                            <div class="card-text">
                                <?php echo wp_kses_post($text); ?>
                            </div>
                        <?php endif; ?>

                <?php if (!empty($link)) : ?>
                    </a>
                <?php else : ?>
                    </div>
                <?php endif; ?>

            <?php endforeach; ?>

        </div>

    <?php endif; ?>

</section>
