<?php
$urlString = defined('_JEXEC') ? "templates/activities/include/activity.php" : "../activities/include/activity.php";
require($urlString);

$activity = new Activity("activities_wp", "Words and Pictures");
$cssLocalFiles = array("wp-styles");
$activity->writeHtmlTopSection($cssLocalFiles);
$activity->writeGlobalPngImg("back", NULL, "back", "back to Words and Pictures Menu");
?>
<div id="theme-menu">
    <?php $activity->writeHomeBtnLink(); ?>
</div>
<div id="custom-menu">

    <div id="flickr-input">
        <a id="flickr-logo" href="https://www.flickr.com" target="_blank">
            <?php $activity->writeLocalPngImg("flickr-icon", NULL, "flickr-icon", "flickr logo and link"); ?>
        </a><br>
        <input id="flickrId" type="text" placeholder="flickr user id" name="flickr-id" size="14"/>
        <input id="submit" type="submit" name="submit-flickr" onmousedown = "displayCustomSets()" value="Get Photo Albums"/>
        <br><p>learn how to find your flickr user id&nbsp;<a href="http://idgettr.com" target="_blank">here</a></p>
    </div>

    <p id="showInstr">show Flickr instructions</p>
    <div id="flickr-sets"></div>
    <div id="flickr-instr">
        <div class="flickr-steps">
            <?php $activity->writeLocalPngImg(null, null, "flickr-instructions", "flickr instructions") ?>
        </div>
    </div>

</div>
<p id="showTextMsg1">Click anywhere in the picture to display the name of the object</p>
<p id="showTextMsg2">Click anywhere in the picture to display the title of the photo from flickr</p>
<div id="col1"></div>
<div id="image-div"></div>
<div id="col2"></div>
<div id="container"></div>

<?php
$jsLocalFiles = array("intro", "wp-script");
$activity->writeHtmlLowerSection($jsLocalFiles);
?>