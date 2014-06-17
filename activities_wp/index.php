<?php
$urlString = defined('_JEXEC') ? "templates/activities/include/activity.php" : "../activities/include/activity.php";
require($urlString);

$activity = new Activity("activities_wp", "Words and Pictures");
$cssLocalFiles = array("wp-styles");
$activity->writeHtmlTopSection($cssLocalFiles);
$activity->writeGlobalPngImg("back", NULL, "back", "back to Words and Pictures Menu");
?>

<?php $activity->writeHomeBtnLink(); ?>
<div id="theme-menu">

</div>
<div id="custom-menu">

    <div id="flickr-input">
        <a id="flickr-logo" href="https://www.flickr.com" target="_blank">
            <?php $activity->writeLocalPngImg("flickr-icon", NULL, "flickr-icon", "flickr logo and link"); ?>
        </a><br>
        <input id="flickrId" type="text" placeholder="flickr user id" name="flickr-id" size="14"/>
        <input id="submit" type="submit" name="submit-flickr" onmousedown = "displayCustomSets()" value="Get Photo Albums"/>
    </div>

    <p id="showInstr">show Flickr instructions</p>
    <div id="flickr-sets"></div>
    <div id="flickr-instr">
        <h1>Creating a custom album</h1>
        <p>A custom album enables you to create your own interactive storyboard. </p>

        <div class="instructions">
            <p>
                To create a custom photo album you need to have a flickr account. 
                If you do not have a flickr account then please go to <a href="http://flickr.com" target="_blank">flickr</a> and make one.  
            </p>
            <p>
                Once your account is created please proceed as instructed.  
                You can then create your own flickr album(s) that you can access through here to interact with.
            </p>
            <p>
                Enter your flickr user id* (e.g. 1295276@NO6) into the field above and 
                press the "Get Photo Albums" button.
            </p>
            <p>*learn how to find your <a href="http://idgettr.com" target="_blank">flickr user id</a></p>
        </div>
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