<?php

  $path = "";

  if (isset($_POST['submit'])) {
    if (isset($_POST['path'])) {
      $path = 'comments/' . substr($_POST['path'], 0, -3);
      $num = 0;

      $dir = implode('/', explode('/', $path, -1));
      $folder = explode("/", $path)[2];

      $dirExists = true;

      for ($i = -3; $i <= 0; $i++) {
        $currentDir = implode('/', explode('/', $path, $i));

        $currentDir = '../' . $currentDir;

        if (!is_dir($currentDir)) {
          $dirExists = false;
          mkdir($currentDir, 0755);
        }
      }

      chdir('../' . $dir);

      if ($dirExists) {
        $num = findNextCommentNumber($folder);
      }

      $cmtTxt = "";

      if(isset($_POST['user_name'])) {
        $cmtTxt .= "---\r\nauthor: " . $_POST['user_name'];
      } else {
        $cmtTxt .= "---\r\nauthor: Anonymous";
      }

      $cmtTxt .= "\r\ndate: " . date("F j, Y, g:i a") . "\r\n---\r\n\r\n";

      $cmtTxt .= $_POST['user_comment'];

      $file = fopen($folder . "/" . $num . ".md", x);

      if (!$file) echo "Failed to post comment: File could not be created.";

      fwrite($file, $cmtTxt);

      header('Location: ' . $_SERVER['HTTP_REFERER']);
      //exit;
    }
  }

  function findNextCommentNumber($dir) {
    $arr = array();
    $i = 0;
    $file = strval($i) . ".md";

    if (!file_exists($dir . "/" . $file)) return $i;

    while(file_exists($dir . "/" . $file)) {
      $i += 1;
      $file = strval($i) . ".md";
    }

    return $i;
  }

?>
