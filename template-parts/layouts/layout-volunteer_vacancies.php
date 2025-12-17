<?php
$id = get_the_ID();
$blocks = get_sub_field('volunteer_vacancies', $id);
?>
<div class="block volunteer_vacancies grid grid_50 gap_5 margins">
    <?php
    foreach ($blocks as $i => $block):
        include get_template_directory() . '/template-parts/cards/card-volunteer_vacancy.php';
    endforeach; ?>
</div>