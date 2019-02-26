var rootUrl = "";
var blogTitle = "";
var headerImage = "";
var favicon = "off";
var adminName = "";
var adminEmail = "";
var postPreviewTextLength = 0;
var postPreviewFeaturedImage = "off";

function settingsSetup(md) {
  var mdArr = processMd(md);

  rootUrl = mdArr[1]["root-url"];
  blogTitle = mdArr[1]["blog-title"];
  headerImage = mdArr[1]["header-image"];
  favicon = mdArr[1]["favicon"];
  adminName = mdArr[1]["admin-name"];
  adminEmail = mdArr[1]["admin-email"];
  postPreviewTextLength = mdArr[1]["post-preview-text-length"];
  postPreviewFeaturedImage = mdArr[1]["post-preview-featured-image"];
}

function buildFooter(html, metadata, page, commentsJson) {
  if (metadata["author"] || metadata["date"]) {
    html = html + "<p class='footerText'>";

    metadata["author"] && metadata["date"]
      ? html = html + metadata["author"] + " | " + metadata["date"]
      : metadata["author"]
        ? html = html + metadata["author"]
        : metadata["date"]
          ? html = html + metadata["date"]
          : html;
    metadata["last-updated"]
      ? html = html + "<br /> Last Updated: " + metadata["last-updated"]
      : html;

    html = html + "</p>";
  }

  if (metadata["comments"] === "yes") {
    html =
      html +
      "<br />" +
      "<form action='res/create_comment.php' method='POST'>" +
      "<div><input type='text' id='nm' name='user_name' placeholder='Name'></div>" +
      "<div><textarea id='cmnt' name='user_comment' placeholder='Comment (supports Markdown formatting)' required></textarea>" +
      "<input type='hidden' name='path' value='" + page + "' /></div>" +
      "<div class='button'><button type='submit' name='submit'>Submit</button></div>" +
      "</form>";

    if (typeof commentsJson != "string") {
      for (var i = 0; i < commentsJson.length; i++) {
        var obj = commentsJson[i];
        var pMd = processMd(obj["content"]);

        var commentNumber = obj["file"]
          .substr(0, obj["file"].lastIndexOf("."))
          .split("/");
          
        commentNumber = commentNumber[commentNumber.length - 1];

        html =
          html +
          "<div class='comment' id='"
          + commentNumber +
          "'><p class='commentTitle'><b>" +
          pMd[1]["author"] +
          "</b><br /><span class='footerText'>" +
          pMd[1]["date"] +
          "</span><br /><span class='footerText'>#" +
          commentNumber +
          "</span></p>";

        if (pMd[1]["reply-to"]) {
          html =
            html +
            "<a class='footerText' id='replyto#' " +
            commentNumber +
            " onclick='highlightComment("
            + pMd[1]["reply-to"] +
            ");' href='#" +
            pMd[1]["reply-to"] +
            "'>> #" +
            pMd[1]["reply-to"] +
            "</a>";
        }

        html =
          html +
          "<p class='commentText'>" +
          pMd[0] +
          "</p>" +
          "<a class='footerText' onclick='replyToComment(" +
          commentNumber +
          ")'>Reply</a></div>";

        if (i < commentsJson.length - 1) {
          html = html + "<hr>";
        }
      }
    } else {
      html = html + "<div class='comment'>" + commentsJson + "</div>";
    }
  }

  $('#main').html(html);
  document.title = metadata["title"] + " - " + blogTitle;
  $("div#main").css("height", $('.main'));
}

function addCopyrightNotice() {
  $(".footer").append(
    "<p class='footerText' id='copyrightNotice'>Copyright " +
    new Date().getFullYear() +
    " " +
    adminName +
    " | <a href='mailto:" +
    adminEmail +
    "'>Email me</a>"
  );
}

function buildPostPreview(content, metadata, file) {
  var postPreview = "<div class='postPreview'>";

  if ((postPreviewFeaturedImage === "on") && (metadata["featured-image"] || headerImage !== "off")) {
    postPreview =
      postPreview +
      "<div class='postPreviewImageContainer'><a href='?page=" +
      file +
      "'>";

    if (metadata["featured-image"]) {
      postPreview =
        postPreview +
        "<img src='" +
        metadata["featured-image"] +
        "' class='postPreviewFeaturedImage' />";
    } else {
      if (headerImage !== "off") {
        postPreview =
          postPreview +
          "<img src='" +
          rootUrl +
          "/content/img/headerimg." +
          headerImage +
          "' class='postPreviewFeaturedImage' />";
      }
    }
    postPreview =
      postPreview +
      "</a></div>";
  }

  postPreview =
    postPreview +
    "<a href='?page=" +
    file +
    "'><h2 class='postTitle'>" +
    metadata["title"] +
    "</h2></a>" +
    "<p class='postPreviewText'>" +
    trimPreview(content, postPreviewTextLength) +
    "</p>" +
    "<p class='footerText'>";

  metadata["author"] && metadata["date"]
    ? postPreview = postPreview + metadata["author"] + " | " + metadata["date"]
    : metadata["author"]
      ? postPreview = postPreview + metadata["author"]
      : metadata["date"]
        ? postPreview = postPreview + metadata["date"]
        : postPreview;

  postPreview = postPreview + "</p></p></div>";

  return postPreview;
}

function replyToComment(num) {
  if ($('#rply').length) {
    $('#rply').val(num);
    $('#replyText').html("Replying to comment #" + num + ".");
  } else {
    $('#cmnt').after(
      "<input type='hidden' id='rply' name='reply_to' value='" +
      num +
      "' /><span id='replyText' class='footerText'>Replying to comment #" +
      num +
      ".</span>"
    );
  }
}

function highlightComment(num) {
  $('#' + num.toString()).queue(function (next) {
    $('#' + num.toString()).css("outline", "1px solid #5d5d5d");
    next();
  }).delay(2400).queue(function (next) {
    $('#' + num.toString()).css("outline", "1px solid #ffffff");
    next();
  });

  /*$('#' + num.toString()).css("transition", "1s").css("background-color", "#9f9f9f").css("color", "white").delay(1200).queue(function (next) {
    $('#' + num.toString()).css("background-color", "white").css("color", "#5d5d5d");
    next();
  });*/
}

function trimPreview(str, len) {
  var maxLength = len;
  var jHtmlObject = jQuery(str);
  var editor = jQuery("<p>").append(jHtmlObject);
  editor.find("h1").remove();
  editor.find("img").remove();
  var newHtml = editor.html();

  if (newHtml.length < postPreviewTextLength) {
    maxLength = newHtml.length;
  }

  var trimmedString = trimString(newHtml, maxLength) + "...";

  return (maxLength < newHtml.length ? trimmedString : newHtml);
}

function trimString(str, len) {
  var trimmedString = str.substr(0, len);
  trimmedString = trimmedString.substr(
    0,
    Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))
  );

  return (len < str.length ? trimmedString : str);
}

function processMd(md) {
  var conv = new showdown.Converter({metadata: true});
  var html = conv.makeHtml(md);
  var metadata = conv.getMetadata();

  return [html, metadata];
}

function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}
