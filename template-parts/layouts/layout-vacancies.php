<?php
$id = get_the_ID();
$title = get_sub_field('heading', $id);
$blocks = get_sub_field('vacancies', $id);
?>
<div class="block vacancies margins">
    <?php if ($title): ?>
        <div class="vacancies_title">
            <h2 class="bold">
                <?php echo $title; ?>
            </h2>
        </div>
    <?php endif; ?>
    <div class="vacancies">
        <?php
        foreach ($blocks as $i => $block):
            include get_template_directory() . '/template-parts/cards/card-vacancy.php';
        endforeach; ?>
    </div>
</div>

<?php
