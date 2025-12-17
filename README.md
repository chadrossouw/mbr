# soul All In Theme

## Install

Run composer install and npm install

## Sass

Run gulp watch
Sass is in src/sass folder and builds to build/
editor-styles is loaded in the block editor
styles is loaded on the front

## JS

Run gulp watch
JS is src/js folder and builds to build/
Entry point is is src./scripts.js
You can include static js files (that aren't bundled) in src/js_static

## i18n

Run wp i18n make-pot . languages/soul.pot
this will generate a new pot file for the theme
