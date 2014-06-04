<?php

// No direct access to this file
defined('_JEXEC') or die('Restricted access');

// import Joomla controller library
jimport('joomla.application.component.controller');

/**
 * sfuFiles Component Controller
 */
class SfuFilesController extends JController {

    public function deleteimage() {

        if (JRequest::getVar("image") !== "") {
            $userPath = getPath();
            $image = JRequest::getVar("image");
            $imagePath = $userPath . "/" . $image;
            $thumbPath = str_replace(".", "_sfuthumb.", $imagePath);

            unlink($imagePath);
            unlink($thumbPath);
            echo "file deleted";
        } else {
            echo "no file sent";
        }
    }

    public function getimages() {

        $path = getPath();

        //loop through the files and create a thumb and store the actual filename as alt
        $thumbs = getFiles($path);

        //create an array of the image names
        $images = array();
        foreach ($thumbs as $thumb) {

            if (strpos($thumb, 'index.html') === false && strpos($thumb, 'sfuthumb') === false && strpos($thumb, '.') !== false) {

                array_push($images, $thumb);
            }//end if
        }//end foreach
        $data["urlpath"] = $path;
        $data["images"] = $images;
        echo json_encode($data);
    }

//end get Images
}

//end class
//Get the image files and place in an array
function getFiles($path) {

    $files = array();
    foreach (new DirectoryIterator($path) as $file) {
        if ($file->isDot()) {
            continue;
        }
        array_push($files, $file->getFilename());
    }
    return array_reverse($files);
}

function getPath() {

    //get the current logged in user
    $user = JFactory::getUser();
    if (!$user->guest) {
        $userName = $user->username;
    }
    //assign the path to use
    $path = JPATH_BASE . "/users_sfu/{$userName}";

    return $path;
}
