<?php

function get_comments($path) {
  $dir = "comments/" . substr($path, 0 , -3);

  if (is_dir($dir)) {
    $files = scan_dir($dir);

    if (!sizeof($files)) return "'This post currently has no comments.'";

    $jsonString = "[ ";

    foreach($files as $f) {
      $jsonString .= '{ "file": "' . $dir . '/' . $f . '", "content": ' . json_encode(file_get_contents($dir . '/' . $f)) . ' }, ';
    }

    $jsonString = substr($jsonString, 0 , -2) . " ]";

    return $jsonString;
  } else {
    return "'This post currently has no comments.'";
  }
}

?>
