<html>

  <head>
    <title>Tercet Sample Blog</title>

    <script type="text/javascript" src="lib/jquery-3.3.1.min.js"></script>
    <script type="text/javascript" src="lib/showdown.min.js"></script>
    <script type="text/javascript" src="res/tercet.js"></script>
    <link rel="stylesheet" type="text/css" href="res/style.css" />
    <link id="favicon" rel="shortcut icon" type="image/png" href="" />

    <script type="text/javascript">
      var postPos = 0;
      var page = "";

      $(document).ready(function(){
        if (getQueryVariable("num")) {
          postPos = parseInt(getQueryVariable("num"));
        }

        if (getQueryVariable("page")) {
          page = getQueryVariable("page");
        }

        var settingsMd = <?php echo json_encode(file_get_contents('res/settings.md')); ?>;
        settingsSetup(settingsMd);

        if (headerImage !== "off") {
          $('#title').html("<img src='content/img/headerimg." + headerImage + "' /><br />" + blogTitle);
        } else {
          $('#title').html(blogTitle);
        }

        if (favicon === "on") {
          $("#favicon").attr("href","content/img/favicon.png");
        }

        var procSettingsMd = processMd(settingsMd);

        var regex = /homelink/gi;
        procSettingsMd[0] = procSettingsMd[0].replace(regex, rootUrl);

        $('#menu').html(procSettingsMd[0]);

        updateBody(page, postPos);
        addCopyrightNotice();
      });

      function updateBody(f, n) {
        <?php
          include 'res/scan_dir.php';
          include 'res/get_files.php';
          include 'res/get_comments.php';
        ?>

        showdown.setFlavor('original');

        if (f) {
          var md = <?php echo json_encode(file_get_contents("content/" . $_GET['page'])); ?>;

          var procMd = processMd(md);

          var commentsJson = <?php echo get_comments($_GET['page']); ?>;

          buildFooter(procMd[0], procMd[1], page, commentsJson);
        } else {
          document.title = blogTitle;

          var blogJson = <?php echo get_files("content/blog"); ?>;
          var homeHtml = "";

          var mdArr = new Array(blogJson.length);
          for (var i = 0; i < blogJson.length; i++) {
            var obj = blogJson[i];

            var pMd = processMd(obj["content"]);

            mdArr[i] = new Array(4);

            mdArr[i][0] = parseInt(pMd[1]["post-number"]);
            mdArr[i][1] = pMd[0];
            mdArr[i][2] = pMd[1];
            mdArr[i][3] = obj["file"];
          }

          mdArr = mdArr.sort(function(a,b) {
            return a[0] - b[0];
          }).reverse();

          for (var i = n; i < n + 5; i++) {
            if (i >= blogJson.length) break;

            homeHtml = homeHtml + buildPostPreview(mdArr[i][1], mdArr[i][2], mdArr[i][3]);
            if (i < n + 4 && i < blogJson.length - 1) {
              homeHtml = homeHtml + "<hr>"
            }
          }

          if (n > 0 || n + 5 < blogJson.length) {
            homeHtml = homeHtml + "<p class='footerText'>";

            if (n > 0) {
              var num = n - 5;

              if (num < 0) {
                num = 0;
              }

              homeHtml = homeHtml + "<span class='navButton'><a href='?num=" + num + "'>Newer</a></span>";
            }

            if (n > 0 && n + 5 < blogJson.length) {
              homeHtml = homeHtml + " | ";
            }

            if (n + 5 < blogJson.length) {
              var num = n + 5;

              if (num >= blogJson.length) {
                num = blogJson.length - 5;
              }
              homeHtml = homeHtml + "<span class='navButton'><a href='?num=" + num + "'>Older</a></span>";
            }

            homeHtml = homeHtml + "</p>";
          }

          $('#main').html(homeHtml);
          $("div#main").css("height", $('.main'));
        }
      }
    </script>
  </head>

  <body>
    <div class="content" id="content">
      <div class="title" id="title">

      </div>
      <hr>

      <div class="menu" id="menu">

      </div>

      <div class="main" id="main">
        Body text here.
      </div>

      <div class="footer">

      </div>

    </div>
  </body>

</html>
