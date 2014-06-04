<?php
$urlString = defined('_JEXEC') ? "templates/activities/include/activity.php" : "../activities/include/activity.php";     
require($urlString);

$activity = new Activity("activities_hotspots", "Hotspots");
$cssLocalFiles = array("hotspots-styles");
$activity->writeHtmlTopSection($cssLocalFiles);
?>
<div id ="dark-bg">
  <?php $activity->writeGlobalPngImg("redx", NULL, "redx" , "close"); ?>  
</div>
<div id="hotspots-menu">
    <?php $activity->writeHomeBtnLink(); ?>
    <p id="choose">Hotspots</p>
</div>
<div id="hotspots-layout">                  
    <?php
    $activity->writeGlobalPngImg("back", NULL, "back", "back", "back to Hotspots Menu");
    $activity->writeGlobalPngImg("refresh", NULL, "refresh", "refresh", "refresh");
    ?>
</div>
<div id="container"></div>

<?php
$jsLocalFiles = array("initial", "hotspots-script");
$activity->writeHtmlLowerSection($jsLocalFiles);
?>