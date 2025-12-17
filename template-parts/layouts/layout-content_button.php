<?php $button = get_sub_field('link'); 
$label = get_sub_field('button_label');
if($button): ?>
<a href="<?php echo $button['url']; ?>" class="button center" target="<?php echo $button['target']; ?>"><?php echo $label?:$button['title']; ?></a>
<?php endif; ?>