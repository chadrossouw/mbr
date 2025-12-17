<?php

function get_os_map(){ ?>
    <div class="os_map_wrapper container container--cover">
        <div id="os_map"></div>
        <div class="flex buttons">
            <a class="pill bg_body white" href="http://maps.apple.com/?ll=52.03123198804678,-1.0173803163399273">Open with Apple Maps</a>
            <a class="pill bg_body white" href="https://maps.app.goo.gl/C785rcwXJFshvyqDA">Open with Google Maps</a>
        </div>
    </div>
<?php }

function get_google_map() {
    echo '<iframe
        width="600"
        height="450"
        style="border:0"
        loading="lazy"
        allowfullscreen        referrerpolicy="no-referrer-when-downgrade"
        src="https://www.google.com/maps/embed/v1/place?key='.MAPS_API_KEY.'
            &q=Shoemakers+Museum,+Clarks+Village,+Street+BA16+0BQ,+United+Kingdom">
    </iframe>';
}