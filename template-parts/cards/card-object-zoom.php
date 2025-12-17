<?php 
$title = get_the_title($object);
$image = get_the_post_thumbnail($object, 'full');
if($image){
?>
<div class="card card-object card-object--zoom">
    <div class="card-object--image">
        <?php echo $image; ?>
    </div>
    <div class="card-object--text">
        <p class="card-object--title"><?php echo $title; ?></p>
    </div>
</div>
<?php }