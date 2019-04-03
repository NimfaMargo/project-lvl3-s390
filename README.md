[![Build Status](https://travis-ci.com/NimfaMargo/RSS-reader-hexlet.svg?branch=master)](https://travis-ci.com/NimfaMargo/RSS-reader-hexlet)
[![Maintainability](https://api.codeclimate.com/v1/badges/02e3523acfbbd555f789/maintainability)](https://codeclimate.com/github/NimfaMargo/RSS-reader-hexlet/maintainability)
## Simple RSS Reader with automatic update. [Check it!](http://rss-reader-margo.surge.sh/)

Use this RSS feed generator for testing:
[Lorem RSS](https://github.com/mbertolacci/lorem-rss)

## API
Visit http://lorem-rss.herokuapp.com/feed, with the following optional parameters:

- **unit:**
one of second, minute, day, month, or year.
- **interval:**
an integer to repeat the units at. For seconds and minutes this interval must evenly divide 60, for month it must evenly divide 12, and for day and year it can only be 1.

## Examples
- The default, updates once a minute: **/feed**
- Update every second instead of minute: **/feed?unit=minute**
- Update every 30 seconds: **/feed?unit=second&interval=30**
