<?php
$collections = get_sub_field('collection');
if ($collections):
    $title = get_sub_field('title');
?>
    <div class="collection_list margins">
        <?php if ($title): ?>
            <h2 class="black"><?php echo $title; ?></h2>
        <?php endif; ?>
        <div class="grid grid_30 gap_3">
            <?php foreach ($collections as $collection):

                $image = get_the_post_thumbnail($collection, 'card_object');
                $link = get_permalink($collection);
                $description = get_field('short_description', $collection) ?: '';
            ?>
                <div class="collection_item card">
                    <div class="container container--threetwo">
                        <?php echo $image; ?>
                    </div>
                    <h3 class="book"><?php echo get_the_title($collection); ?></h3>
                    <?php echo $description ? apply_filters('the_content', $description) : ''; ?>
                    <a href="<?php echo $link ?>" class="bold card_target">
                        <?php echo __('View ') . get_the_title($collection); ?>
                    </a>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
<?php endif;
