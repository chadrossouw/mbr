<?php $id = get_the_ID(); ?>
<header class="content-header margins">
    <?php echo get_breadcrumb($id); ?>
    <h1 class="content-title secondary"><?php echo get_the_title(); ?></h1>
        <ul class="flex cats">
            <p class='post-header-date'><?php echo get_the_date('j F Y');?></p>
            <span class="screen-reader-text"><h3>List of categories for this post</h3></span>
            <?php $category = get_the_terms( $id, 'category' );
            if($category):
                foreach($category as $cat): ?>
                    <li><a href="/blog?category=<?php echo $cat->slug; ?>" class="cat"><?php echo $cat->name; ?></a></li>
                <?php endforeach;
            endif; ?>
        </ul>
</header>