<?php

function get_files($path) {
  if (is_dir($path)) {
    $files = scan_dir($path);

    $jsonString = "[ ";

    foreach($files as $f) {
      $jsonString .= '{ "file": "' . explode('/', $path)[1] . '/' . $f . '", "content": ' . json_encode(file_get_contents($path . '/' . $f)) . ' }, ';
    }

    $jsonString = substr($jsonString, 0 , -2) . " ]";

    return $jsonString;
  } else {
    return "No such directory. Please contact the webmaster at the email listed below.";
  }
}

?>
