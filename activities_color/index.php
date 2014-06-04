<?php
$urlString = defined('_JEXEC') ? "templates/activities/include/activity.php" : "../activities/include/activity.php";     
require($urlString);

$activity = new Activity("activities_color", "Colour-in");
$cssLocalFiles = array("color-styles");
$activity->writeHtmlTopSection($cssLocalFiles);
?>

<div id="color-menu">

    <?php
    $activity->writeHomeBtnLink();
    $activity->writeLocalPngImg("color-header", NULL, "header", "color-in");
    $activity->writeLocalPngImg("book", NULL, "color_book", "color-in menu");

    $colorThumbs = array("flowerthumb", "rocketthumb", "dinothumb", "cowboythumb", "soccerthumb");
    foreach ($colorThumbs as $thumb) {
        $activity->writeLocalPngImg($thumb, "color-thumb nav", $thumb, $thumb);
    }
    ?>
</div>
<?php
$activity->writeGlobalPngImg("back", NULL, "back", "back to color-in menu");
$activity->writeGlobalPngImg("refresh", NULL, "refresh", "refresh");
?>
<div id="drawing">
    <div id="container"></div>
    <div id="colors">
        <canvas id="color-canvas" width="250" height="680"></canvas>
    </div>
</div>

<?php
$jsLocalFiles = array("color-script", "flower-code", "dino-code", "cowboy-code", "rocket-code", "soccer-code");
$activity->writeHtmlLowerSection($jsLocalFiles);
?>
