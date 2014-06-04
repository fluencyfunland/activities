<?php
$urlString = defined('_JEXEC') ? "templates/activities/include/activity.php" : "../activities/include/activity.php";
require($urlString);

$activity = new Activity("activities_memory", "Memory");
$cssLocalFiles = array("memory-styles");
$activity->writeHtmlTopSection($cssLocalFiles);
?>
<div id="intro" class="show-intro">
    <h1>The Memory Game</h1>
    <h2>match any 2 cards</h2>
    <div id="card1" class="cardIntro">
        <?php $activity->writeLocalPngImg(NULL, NULL, "animals/fish", "fish card"); ?>
    </div>
    <div id="card2" class="cardIntro">
        <?php $activity->writeLocalPngImg(NULL, NULL, "animals/lion", "lion card"); ?>
    </div>
    <div id="card3" class="cardIntro">
        <?php $activity->writeLocalPngImg(NULL, NULL, "animals/fish", "fish card"); ?>
    </div>
    <div id="card4" class="cardIntro">
        <?php $activity->writeLocalPngImg(NULL, NULL, "animals/lion", "lion card"); ?>
    </div>

    <?php $activity->writeGlobalPngImg("pointer", NULL, "pointer", "pointer-cursor"); ?>
    <?php $activity->writeGlobalPngImg("skip", NULL, "skip", "skip to card game"); ?>
</div>
<div id="memory-menu">
    <?php $activity->writeHomeBtnLink(); ?>
    <p id="choose">Choose a pack</p>
</div>
<div id="card-layout">
    <?php
    $activity->writeGlobalPngImg("back", NULL, "back", "back to Memory menu");
    $activity->writeGlobalPngImg("refresh", NULL, "refresh", "refresh");
    ?>
    <img id="background"/>
</div>
<div id="container"></div>
<?php
$jsLocalFiles = array("intro", "memory-script");
$activity->writeHtmlLowerSection($jsLocalFiles);
?>
