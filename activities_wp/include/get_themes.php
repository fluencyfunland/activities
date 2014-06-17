<?php

$folders = glob("../themes/*");
$names = array();

foreach ($folders as $folder) {
    $folder = str_replace("../themes/", "", $folder);

    $images = getFiles("../themes/{$folder}/items");
    $imageNames = array();

    foreach ($images as $image) {
        
       $imageName = basename($image, ".png");
        if ($imageName !== "." && $imageName !== "..") {
            array_push($imageNames, $imageName);
        }
    }
    $names[$folder] = $imageNames;
}
echo json_encode($names);
function getFiles($directory) {
    $dir = new RecursiveDirectoryIterator("{$directory}");
    $images = array();
    $i = 0;
    foreach (new RecursiveIteratorIterator($dir) as $filename) {

        $filename = str_replace('\\', '/', $filename);
        $images[$i] = $filename;
        $i++;
    }
    return $images;
}

?>
