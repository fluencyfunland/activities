<?php
$urlString = defined('_JEXEC') ? "templates/activities/include/activity.php" : "../activities/include/activity.php";
require($urlString);

$activity = new Activity("activities_storybook", "Storybook");

$activity1 = "activities_storybook";
$baseUrl = "http://localhost/ffl-activities";

$activity->getUserDir();

$cssLocalFiles = array("bookblock", "facedetect-styles", "picturebook-styles", "jquery-ui-1.9.2.custom");
$activity->writeHtmlTopSection($cssLocalFiles);
$activity->writeHomeBtnLink();
?>
<h1>Storybook</h1>
<div id="choose1" class="create">
    <h2>Step 1 - get your photo</h2>
    <div id="upload">
        <jdoc:include type="modules" name="left" style="xhtml" /> 
        <div id="imageThumbs"></div>
        <div id='delete-msg'>

            <p>To delete - drag thumbnail here </p>
            <?php $activity->writeLocalPngImg(NULL, "trash", "trash", "trash-can") ?>
            <div id="dialog-confirm"></div>
        </div>
    </div><!-- upload -->

    <div id="picImage">
        <p id="face-msg"></p>
        <div id="face-rect"></div>
        <img id="myPicture"/>
    </div><!-- picImage -->

    <div id="ovalContainer"></div>

    <?php $activity->writeGlobalPngImg("fwd1", "fwd", "fwd", "forward to next step"); ?>
</div><!-- choose1 -->

<div id="choose2" class="create">
    <h2>Step 2 - choose</h2>
    <div id="write-name">
        <input id="your-name" placeholder="your name here" type="text"/>
        <?php $activity->writeLocalPngImg(NULL, "complete", "question", "Is this complete?") ?>
    </div>
    <div id="character">
        <div id="body-image">
            <?php
            $activity->writeLocalPngImg("girl", "nav", "girl_character", "girl character");
            $activity->writeLocalPngImg("boy", "nav", "boy_character", "boy character");
            $activity->writeLocalPngImg(NULL, "complete", "question", "Is this complete?");
            ?>
        </div>
        <div id="cap">
            <?php
            $activity->writeLocalPngImg("redCap", "nav", "red_cap", "red cap");
            $activity->writeLocalPngImg("blueCap", "nav", "blue_cap", "blue cap");
            $activity->writeLocalPngImg("pinkHat", "nav", "pink_hat", "pink hat");
            $activity->writeLocalPngImg("pinkCap", "nav", "pink_cap", "pink cap");
            $activity->writeLocalPngImg("noCap", "nav", "red_line", "no cap");
            $activity->writeLocalPngImg(NULL, "complete", "question", "Is this complete?");
            ?>
        </div>
        <div id="hair">
            <?php
            $activity->writeLocalPngImg("blondeHair", "nav", "blonde_hair", "blonde hair");
            $activity->writeLocalPngImg("redHair", "nav", "red_hair", "red hair");
            $activity->writeLocalPngImg("blackHair", "nav", "black_hair", "black hair");
            $activity->writeLocalPngImg("brownHair", "nav", "brown_hair", "brown hair");
            $activity->writeLocalPngImg("blackGreyHair", "nav", "blackgrey_hair", "black/grey hair");
            $activity->writeLocalPngImg(NULL, "complete", "question", "Is this complete?");
            ?>
        </div> 
    </div>
    <?php
    $activity->writeGlobalPngImg("back2", "back", "back", "back to last step");
    $activity->writeGlobalPngImg("fwd2", "fwd", "fwd","forward to next step");
    ?>
</div><!-- choose2 -->

<div style="display:none" id="rectContainer"></div><!--hidden-->

<div id="choose3" class="create">
    <h2>Step 3 - join the story</h2>
    <div id="createContainer"></div>
    <div id="imageContainer"></div>
    <?php $activity->writeGlobalPngImg("back3", "back", "back", "back to last step"); ?>
    <div id="book-menu"></div>  
</div><!-- choose3 -->
</div>

<!-- THE STORYBOOK-->
<div class="container">
    <div id="book">
        <div class="main clearfix" style="position:relative;">
            <?php $activity->writeGlobalPngImg("back-story", "back", "back", "back to story menu"); ?>
            <div class="bb-custom-wrapper">
                <div id="container"></div>
                <div id="bb-bookblock" class="bb-bookblock">
                    <?php
                    for ($i = 0; $i < 12; $i++) {
                        $pageid = "page{$i}";
                        echo "<div class='bb-item' id='{$pageid}'><div class='bb-custom-side'><p></p></div><a><img></a></div>";
                    }
                    ?>
                </div>
                <nav>
                    <a id="bb-nav-first" href="#" class="bb-custom-icon bb-custom-icon-first">First page</a>
                    <a id="bb-nav-prev" href="#" class="bb-custom-icon bb-custom-icon-arrow-left">Previous</a>
                    <a id="bb-nav-next" href="#" class="bb-custom-icon bb-custom-icon-arrow-right">Next</a>
                    <a id="bb-nav-last" href="#" class="bb-custom-icon bb-custom-icon-last">Last page</a>
                </nav>
            </div><!-- bb-custom-wrapper -->
        </div><!-- main -->
    </div><!-- book -->
    <?php
    $jsLocalFiles = array("modernizr.custom", "jquerypp.custom", "jquery.bookblock",
        "facedetection/ccv", "facedetection/face", "jquery.facedetection", "globals", "facepicture-script", "picturebook-script");
    $activity->writeHtmlLowerSection($jsLocalFiles);
    ?>