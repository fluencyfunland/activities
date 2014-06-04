<?php
$urlString = defined('_JEXEC') ? "templates/activities/include/activity.php" : "../activities/include/activity.php";
require($urlString);

$activity = new Activity("activities_jigsaw", "Jigsaw");
$cssLocalFiles = array("jigsaw-styles");
$activity->writeHtmlTopSection($cssLocalFiles);
?>

<div id="jigsaw-menu">
    <?php $activity->writeHomeBtnLink(); ?>
    <div id="puzzle">
        <p>6 piece puzzles</p>
    </div>
    <?php
    $activity->writeLocalPngImg("jig1", "nav jig", "jig1/jig1", "Jigswaw Puzzle 1");
    $activity->writeLocalPngImg("jig2", "nav jig", "jig2/jig2", "Jigswaw Puzzle 2");
    $activity->writeLocalPngImg("jig3", "nav jig", "jig3/jig3", "Jigswaw Puzzle 3");
    ?>

    <div id="puzzle">
        <p>9 piece puzzles</p>
    </div>
    <?php
    $activity->writeLocalPngImg("jig4", "nav jig", "jig4/jig4", "Jigswaw Puzzle 4");
    $activity->writeLocalPngImg("jig5", "nav jig", "jig5/jig5", "Jigswaw Puzzle 5");
    ?>

</div>

<?php
$activity->writeGlobalPngImg("back", NULL, "back", "back to Jigsaw menu");
$activity->writeGlobalPngImg("refresh", NULL, "refresh", "refresh");
?>
<img id="background"/>
<div id="container"></div>
<?php
$jsLocalFiles = array("jigsaw-script");
$activity->writeHtmlLowerSection($jsLocalFiles);
?>