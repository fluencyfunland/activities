<?php

class Activity {

    private $name;
    private $title;
    private $baseUrl;
    private $user;

    /* Constructor to define the base Url string, the javascript url global, and user
     * Parameters: the name of the activity, and the title appearing in the head
     */
    function Activity($activityName, $title) {
        $this->name = $activityName;
        $this->title = $title;

        //define javascript boolean variable for localhost
        $localhost = defined('_JEXEC') ? FALSE : TRUE;
        echo "<script type='text/javascript'>";
        echo $localhost ? "var localhost = true" : "var localhost = false";
        echo "</script>";

        //assign baseUrl and docUrl for javascript depending on host
        if (!$localhost) {
            $this->baseUrl = "/fluencyfunland/templates/";
            echo "<script type='text/javascript'> var docUrl = '/fluencyfunland/templates/{$this->name}/';</script>";
            $user = JFactory::getUser();
            $this->user = $user->username;
        } else {
            $this->baseUrl = "http://localhost/FFL_Activities/";
            echo "<script type='text/javascript'> var docUrl = '';</script>";
            $this->user = "";
        }
    }

    /* Write the top section of each document, DOCTYPE, html, head, opening body, 
     * wrapper, and content div tags.
     * Parameter: an array with the string names of the activity specific css files. 
     */
    public function writeHtmlTopSection($cssLocalFiles) {

        echo "<!DOCTYPE html>";
        echo "<html lang='en' xmlns='xmlns='ww.w3.org/1999/xhtml'>";
        echo "<head>";
        echo "<meta charset='utf-8'/>";
        echo "<link rel='shortcut icon' href='{$this->baseUrl}activities/img/favicon.ico'>";
        echo "<title>{$this->title}</title>";

        //Add main stylesheet
        echo "<link rel='stylesheet' href= '{$this->baseUrl}activities/css/activity-styles.css'/>";

        //Add local stylesheet/s
        foreach ($cssLocalFiles as $cssFile) {
            echo "<link rel = 'stylesheet' href = '{$this->baseUrl}{$this->name}/css/{$cssFile}.css'/>";
        }

        echo "</head>";
        echo "<body>";
        echo "<div id='outer-wrapper'>";
        echo "<div id='content'>";
    }

    /* Write the lower half of each document, closing div tags, 
     * javascript file links, and closing body, and html tags.
     * Parameter: an array with the string names of the activity specific js files. 
     */
    public function writeHtmlLowerSection($jsLocalFiles) {

        echo "</div>";
        echo "</div>";

        //Include the jquery libraries and main javascript files 
        $mainScripts = array(
            "jquery" => "jquery-1.11.0.min",
            "kinetic" => "kinetic-v5.1.0.min",
            "jqueryUI" => "jquery-ui-1.10.4.custom.min",
            "ionSound" => "ion.sound.min",
            "mainScripts" => "activities-scripts",
            "positionScript" => "find-position"
        );
        foreach ($mainScripts as $key => $value) {
            echo "<script type='text/javascript' src='{$this->baseUrl}activities/js/{$value}.js'></script>";
        }

        //Add local javascript
        foreach ($jsLocalFiles as $jsFile) {
            echo "<script type='text/javascript' src='{$this->baseUrl}{$this->name}/js/{$jsFile}.js'></script>";
        }

        echo "</body>";
        echo "</html>";
    }

    /* Write html img tags with global src i.e. located in the activities img folder 
     * Parameters: the id, class, file name, and alt of the image. 
     */
    public function writeGlobalPngImg($id, $class, $imageName, $alt) {

        $idText = $id != NULL ? "id='{$id}'" : "";
        $classText = $class != NULL ? "class='{$class}'" : "";

        echo "<img {$idText} {$classText} src='{$this->baseUrl}activities/img/{$imageName}.png' alt='{$alt}'>";
    }

    /* Write html img tags with local src i.e. located in the secific activity img folder 
     * Parameters: the id, class, file name, and alt of the image. 
     */
    public function writeLocalPngImg($id, $class, $imageName, $alt) {

        $idText = $id != NULL ? "id='{$id}'" : "";
        $classText = $class != NULL ? "class='{$class}'" : "";

        echo "<img {$idText} {$classText} src='{$this->baseUrl}{$this->name}/img/{$imageName}.png' alt='{$alt}'>";
    }

    /* Write the html for the two home button links appearing on each activity 
     */
    public function writeHomeBtnLink() {

        $homeUrl = "http://sitevm1.ballarat.edu.au/fluencyfunland/index.php";
        $actUrl = "http://sitevm1.ballarat.edu.au/fluencyfunland/index.php/activities";

        echo "<a id='home' href='{$homeUrl}'>";
        $this->writeGlobalPngImg(NULL, "nav-btn", "home", "Fluency Fun Land Home");
        echo "</a>";
        echo "<a id='act-home' href='{$actUrl}'>";
        $this->writeGlobalPngImg(NULL, "nav-btn", "act_home", "Activities Home");
        echo "</a>";
    }

    /* Write the html to declare and assign a global javascript variable
     * for the user directory (the username)  
     */
    public function getUserDir() {
        $userDir = $this->user != "" ? "/{$this->user}" : "";
        echo "<script type='text/javascript'>var userDir = '{$userDir}'; </script>";
    }

}
//end class
