<?php

// No direct access to this file
defined('_JEXEC') or die('Restricted access');

// import Joomla controller library
jimport('joomla.application.component.controller');

/**
 * sfuFiles Component Controller Class
 * This class is used to return file names and delete files 
 * in a user directory which is used by the Module: Simple File Load 
 * Directory is specified in the Advanced options 
 *  -  User name directories root path (currently "users_sfu") 
 */
class SfuFilesController extends JController {
    /* Class Function to delete an image from the user path sent as "image"
     * in the post array
     * images deleted for orignal image and thumb
     * returns a string message of success or not
     */
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

    /* Class Function to traverse the current user directory if found 
     * returns the images found as a JSON array
     */
    public function getimages() {

        $path = getPath();

        //loop through the files and create a thumb and store the actual filename as alt
        $thumbs = getFiles($path);

        //create an array of the image names
        $images = array();
        foreach ($thumbs as $thumb) {

            if (strpos($thumb, 'index.html') === false &&
                    strpos($thumb, 'sfuthumb') === false &&
                    strpos($thumb, '.') !== false) {

                array_push($images, $thumb);
            }//end if
        }//end foreach
        //send the files back as a json array
        $data["urlpath"] = $path;
        $data["images"] = $images;
        echo json_encode($data);
    }
}

/* Function to traverse a path to find files
 * returns an array fo files (in reverse order)
 */
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

/* Function to get the current user and the path to the user directory
 * returns the path to the current user directory
 */
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
