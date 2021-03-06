# Tercet

A bare minimum blogging platform utilizing Markdown for basically everything.

You can find a working sample website [here]() (temporarily offline).

## Usage

Using Tercet is simple. It doesn't require a database or any external resources. As long as you have a webserver that runs PHP, you can run Tercet.

To post content, simply upload Markdown files to the /content/blog and /content/pages folders. The following metadata is recommended:

```Markdown
---
title: Test Post
author: Ari Bellamy
date: February 18th, 2019
last-updated: February 21st, 2019
post-number: 1
featured-image: https://pluckyporcupinegame.boutique/logo.png
---
```

The _last-updated_, _comments_, and _featured-image_ metadata options are optional. If _last-updated_ does not exist, it simply will not show a last updated date. If _comments_ is set to anything other than "yes" or otherwise does not exist, comments will not be available for that post.

The _featured-image_ option is used to set a unique featured image for the post in question, This image will only be shown if post preview featured images are turned on in the settings. If featured images are turned on and the _featured-image_ option is not set, the blog software will automatically user your header image instead. If your header image is turned off and there is no featured image set, it will automatically decide for you that no image should be shown for that post. By default, featured images are shown above the post preview text. However, this can easily be changed with a bit of CSS editing.

Posts that are in /content/blog are automatically listed on the homepage. Posts that are in /pages have to be manually linked to.

Post order is enforced using the _post-number_ metadata option. Posts are listed in reverse order, meaning that the post with the highest _post-number_ metadata will be shown first.

## Settings

You can set several settings using the /res/settings.md file.

- **Root URL** - you must set your root URL to the folder that index.php resides in.
- **Favicon** - can be either "on" or "off". File must be named "favicon.png".
- **Header image** - can be either "off" or a file type. File must be named "headerimg.<file type>".
- **Post preview text length** - the length of each of the post previews shown on the homepage.
- **Post preview featured image** - whether or not a featured image is shown for each post on the homepage. Can be either "on" or "off".

The copyright notice and "Email me" hyperlink, as well as an email hyperlink that shows up during certain errors, are set automatically using the the **admin name** and **admin email** data specified in the settings file.

The main menu is automatically built from any content that is outside of the metadata. You can add any links that you want (and as many links as you want). You can also rename the Home link, if you'd like. The "homelink" keyword that is used by default is automatically replaced with the _root-url_ that is set in /res/settings.md, but can be replaced if you so choose.

## New categories and comments

If it does not already exist, the structure of the comments folder is automatically built when the first comment on a post is submitted. By default, "blog" and "pages" are the only post categories that are available, but, due to the fact that the structure of the comments folder is handled by the blog software, you can easily add other categories by creating new folders, putting posts in those folders, and linking to them without needing to worry about whether the comments system will work.

If you have any questions or run into any problems, email me at arabella.belladonna@gmail.com.
