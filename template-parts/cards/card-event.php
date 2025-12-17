<?php
include get_template_directory() . '/template-parts/partials/event_variables.php';
?>
<li class="event_card card grid gap_1">
    <div class="container container--threetwo">
        <?php echo $image; ?>
        <?php if ($strapline): ?>
            <div class="strapline bg_white <?php echo $strapline_background; ?>"><?php echo $strapline; ?></div>
        <?php endif; ?>
    </div>
    <div class="grid gap_1">
        <?php echo $type; ?>
        <h3 class="book"><?php echo $title; ?></h3>
        <p><strong class="semibold"><?php echo $date_str; ?></strong></p>
        <p class=""><?php echo $time_str; ?></p>
        <a href="<?php echo get_the_permalink($event); ?>" class="card_target">
           <?php echo $card_link_text; ?>
        </a>
    </div>

</li>