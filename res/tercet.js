var rootUrl = "";
var blogTitle = "";
var headerImage = "";
var favicon = "off";
var adminName = "";
var adminEmail = "";
var postPreviewTextLength = 0;

function settingsSetup(md) {
  var mdArr = processMd(md);

  rootUrl = mdArr[1]["root-url"];
  blogTitle = mdArr[1]["blog-title"];
  headerImage = mdArr[1]["header-image"];
  favicon = mdArr[1]["favicon"];
  adminName = mdArr[1]["admin-name"];
  adminEmail = mdArr[1]["admin-email"];
  postPreviewTextLength = mdArr[1]["post-preview-text-length"];
}

function buildFooter(html, metadata, page, commentsJson) {
  if (metadata["author"] || metadata["date"]) {
    html = html + "<p class='footerText'>";

    (metadata["author"] && metadata["date"]) ? html = html + metadata["author"] + " | " + metadata["date"] : metadata["author"] ? html = html + metadata["author"] : metadata["date"] ? html = html + metadata["date"] : html;
    metadata["last-updated"] ? html = html + "<br /> Last Updated: " + metadata["last-updated"] : html;
    html = html + "</p>";
  }

  if (metadata["comments"] === "yes") {
    html = html + "<br /><form action='res/create_comment.php' method='POST'>";
    html = html + "<div><input type='text' id='nm' name='user_name' placeholder='Name'></div>";
    html = html + "<div><textarea id='cmnt' name='user_comment' placeholder='Comment (supports Markdown formatting)' required></textarea>";
    html = html + "<input type='hidden' name='path' value='" + page + "' /></div>";
    html = html + "<div class='button'><button type='submit' name='submit'>Submit</button></div>"
    html = html + "</form>";

    if (typeof commentsJson != "string") {
      for (var i = 0; i < commentsJson.length; i++) {
        var obj = commentsJson[i];
        var pMd = processMd(obj["content"]);

        html = html + "<div class='comment'><p class='commentTitle'><b>" + pMd[1]["author"] + "</b><br /><span class='footerText'>" + pMd[1]["date"] + "</span></p>";
        html = html + "<p class='commentText'>" + pMd[0] + "</p></div>";
        if (i < commentsJson.length - 1) {
          html = html + "<hr>";
        }
      }
    }
  }

  $('#main').html(html);
  document.title = metadata["title"] + " - " + blogTitle;
  $("div#main").css("height", $('.main'));
}

function addCopyrightNotice() {
  $(".footer").append("<p class='footerText' id='copyrightNotice'>Copyright " + (new Date()).getFullYear() + " " + adminName + " | <a href='mailto:" + adminEmail + "'>Email me</a>");
}

function buildPostPreview(content, metadata, file) {
  var postPreview = "<div class='postPreview'>";
  postPreview = postPreview + "<a href='?page=" + file + "'><h2 class='postTitle'>" + metadata["title"] + "</h2></a>";
  postPreview = postPreview + "<p class='postPreviewText'>" + trimPreview(content, postPreviewTextLength) + "</p>";
  postPreview = postPreview + "<p class='footerText'>";
  (metadata["author"] && metadata["date"]) ? postPreview = postPreview + metadata["author"] + " | " + metadata["date"] : metadata["author"] ? postPreview = postPreview + metadata["author"] : metadata["date"] ? postPreview = postPreview + metadata["date"] : postPreview;
  postPreview = postPreview + "<p></p></div>";

  return postPreview;
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

  var trimmedString = newHtml.substr(0, maxLength);
  trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))) + "...";

  return (maxLength < newHtml.length ? trimmedString : newHtml);
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
