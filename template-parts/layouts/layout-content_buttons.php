<?php if(have_rows('buttons')): ?>
    <div class="flex gap_1">
        <?php while(have_rows('buttons')): the_row(); 
            $button = get_sub_field('button'); ?>
            <a href="<?php echo $button['url']; ?>" class="button bg_yellow black pill" target="<?php echo $button['target']; ?>"><?php echo $button['title']; ?></a>
        <?php endwhile; ?>
    </div>
<?php endif; ?>