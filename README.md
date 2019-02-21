# Tercet

A bare minimum blogging platform utilizing Markdown for basically everything.

You can find a working sample website [here](http://mattchuranu.xyz/tercet/).

## Usage

Using Tercet is simple. It doesn't require a database or any external resources. As long as you have a webserver that runs PHP, you can run Tercet.

To post content, simply upload Markdown files to the /blog and /pages folders. The following metadata is recommended:

```Markdown
---
title: Test Post
author: Matt Chelen
date: February 18th, 2019
last-updated: February 19th, 2019
comments: yes
---
```

The _last-updated_ and _comments_ metadata options are optional. If last-updated does not exist, it simply will not show a last updated date. If _comments_ is set to anything other than "yes" or otherwise does not exist, comments will not be available for that post.

Posts that are in /blog are automatically listed on the homepage. Posts that are in /pages have to be manually linked to.

## Settings

You can set several settings using the /res/settings.md file.

- **Root URL** - you must set your root URL to the folder that index.php resides in.
- **Favicon** - can be either "on" or "off". File must be named "favicon.png".
- **Header image** - can be either "off" or a file type. File must be named "headerimg.<file type>".
- **Post preview text length** - the length of each of the post previews shown on the homepage.

The copyright notice and "Email me" hyperlink, as well as an email hyperlink that shows up during certain errors, are set automatically using the the **admin name** and **admin email** data specified in the settings file.

The main menu is automatically built from /res/menu.md file. You can add any links that you want (and as many links as you want). You can also rename the Home link, if you'd like. The "homelink" keyword that is used by default is automatically replaced with the _root-url_ that is set in /res/settings.md, but can be replaced if you so choose.

## Known issues

This has only been in development since February 18th, so it has a few issue.

- Posts are in order of most recently updated, rather than most recently created. This is a Unix limitation and I am currently trying to come up with a user-friendly solution that doesn't involve writing an interface for writing posts.
- You currently have to keep the /comments folder structure intact or it will break your blog.

If you have any questions or run into problems, email me at matt@mattchuranu.xyz.
