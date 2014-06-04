<?php

//include the jquery libraries and main javascript files
$urlString = defined('_JEXEC') ? '/fluencyfunland/': "../../";

echo
"
<script type='text/javascript' src='{$urlString}templates/activities/js/jquery-1.11.0.min.js'></script>
<script type='text/javascript' src='{$urlString}templates/activities/js/kinetic-v5.1.0.min.js'></script>
<script type='text/javascript' src='{$urlString}templates/activities/js/jquery-ui-1.10.4.custom.min.js'></script>
<script type='text/javascript' src='{$urlString}templates/activities/js/ion.sound.min.js'></script>
<script type='text/javascript' src='{$urlString}templates/activities/js/activities-scripts.js'></script>
<script type='text/javascript' src='{$urlString}templates/activities/js/find-position.js'></script>
 ";
