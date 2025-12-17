<?php

$name = isset($block['name']) ? $block['name'] : null;
$title = isset($block['title']) ? $block['title'] : null;
$description = $block['description'];
$description = apply_filters('the_content', $description);
$email = isset($block['email']) ? $block['email'] : null;
?>
<div class="card member grid">
    <h3 class="name uc"><?php echo $name; ?></h3>
    <h5 class="role regular"><?php echo $title; ?></h5>
    <?php echo $description; ?>
    <?php echo get_link_email($email, $email) ?>
</div>