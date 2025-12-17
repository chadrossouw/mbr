<?php
$text = get_sub_field('text')?: get_sub_field('quote');
$attribution = get_sub_field('attribution');
$quote_colour = get_sub_field('quote_colour');
if ($text): ?>
    <blockquote class="pull_quote">
        <div class="big_text playfair <?php echo $quote_colour; ?>">
            <q><?php echo $text; ?></q>

        </div>
        <?php echo $attribution ? '<p class="centre center uc bold">' . $attribution . '</p>' : ''; ?>
    </blockquote>
<?php endif; ?>