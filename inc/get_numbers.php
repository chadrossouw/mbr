<?php


function get_telephone_numbers()
{

    $telephone_numbers = get_sub_field('telephone_numbers');
    $address_description = get_sub_field('address_description');
    if ($telephone_numbers) { ?>
        <div class="contact_details desktop_only">
            <?php
            $counter = 0;
            foreach ($telephone_numbers as $number):
                $tel_number = $number['telephone_number'];
                $tel_description = $number['number_description'];

                echo '<p class="telephone_number">' . $tel_number . ' ' . $tel_description . '</p>';
                $counter++;
            endforeach;
            ?>
        </div>
        <div class="contact_details mobile-only">
            <?php
            $counter = 0;
            foreach ($telephone_numbers as $number):
                $tel_number = $number['telephone_number'];
                $tel_description = $number['number_description'];
                $tel_numberUrl = "tel:$tel_number";
                echo '<p class="telephone_number"><a href="' . $tel_numberUrl . '">' . $tel_number . ' ' . $tel_description . '</a></p>';
                $counter++;
            endforeach;
            ?>
        </div>



    <?php }
    if ($address_description) {
        echo '<p class="description">' . $address_description . '</p>';
    };
    ?>


<?php
}
function get_telephone_numbers_only()
{

    $telephone_numbers = get_field('telephone_numbers_options', 'option');
    if ($telephone_numbers) { ?>
        <div class="contact_details desktop_only">
            <?php
            $counter = 0;
            foreach ($telephone_numbers as $number):
                $tel_number = $number['telephone_number'];
                $tel_description = $number['number_description'];

                echo '<p class="telephone_number">' . $tel_number . ' ' . $tel_description . '</p>';
                $counter++;
            endforeach;
            ?>
        </div>
        <div class="contact_details mobile-only">
            <?php
            $counter = 0;
            foreach ($telephone_numbers as $number):
                $tel_number = $number['telephone_number'];
                $tel_description = $number['number_description'];
                $tel_numberUrl = "tel:$tel_number";
                echo '<p class="telephone_number"><a href="' . $tel_numberUrl . '">' . $tel_number . ' ' . $tel_description . '</a></p>';
                $counter++;
            endforeach;
            ?>
        </div>



    <?php } else {
    };
    ?>


<?php
} 
