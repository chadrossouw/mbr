<?php
if(have_rows('videos')): ?>
    <div class="content_video_gallery grid grid_30 gap_1">
    <?php while(have_rows('videos')): the_row(); ?>
        <?php include get_template_directory().'/template-parts/layouts/layout-content_video.php'; ?>
    <?php endwhile; ?>
    </div>
<?php endif; ?>