<?php
$book_tickets = get_field('book_tickets', 'option');
?>

<div class="block admissions bg_pink padding">
    <h3 class="uc">
        <?php echo __('Admission'); ?>
    </h3>
    <div class="grid grid_50 gap_3">
        <?php foreach(['single','group'] as $_type): ?>
            <div class="admissions_table">
                <?php if(have_rows($_type.'_admissions','option')): ?>
                    <table class="admission">
                        <thead class="screen-reader-text">
                            <tr>
                                <th><?php echo __('Ticket type'); ?></th>
                                <th><?php echo __('Price'); ?></th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php while(have_rows($_type.'_admissions','option')): the_row();
                                $type = get_sub_field('type');
                                $price = get_sub_field('price');
                                ?>
                                <tr>
                                    <td><?php echo $type; ?></td>
                                    <td><?php echo $price; ?></td>
                                </tr>
                            <?php endwhile; ?>
                        </tbody>
                    </table>
                <?php endif; ?>
                <?php $description = get_field($_type.'_admissions_description','option');
                if($description){
                    echo apply_filters('the_content', $description);
                } ?>
            </div>
        <?php endforeach; ?>
        <?php if($book_tickets): ?>
            <a href="<?php echo $book_tickets['url']; ?>" class="button" target="<?php echo $book_tickets['target']; ?>">
                <?php echo $book_tickets['title']; ?>
            </a>
        <?php endif; ?>
    </div>
</div>
<div class="block opening_times bg_red padding">
    <div class="grid grid_50 gap_3">
        <div class="opening_times_table">
            <h3 class="uc"><?php echo __('Opening hours'); ?></h3>
            <p> <?php echo get_times(); ?> </p>
            <?php $description = get_field('opening_hours_description','option');
            if($description){
                echo apply_filters('the_content', $description);
            } ?>
        </div>
        <div class="access_table">
            <h3 class="uc"><?php echo __('Accessibility'); ?></h3>
            <?php $description = get_field('accessibility_description','option');
            if($description){
                echo apply_filters('the_content', $description);
            } ?>
        </div>
    </div>
</div>