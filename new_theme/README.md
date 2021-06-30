# New lindat theme
build by
```
npm run build-new_theme
```
the output goes to `./dist`; see `build_new_theme.mjs` for details. In short: `.../js/skeleton/*` get modified 
during the build; `.../js/{footer,header,standalone}_data.mjs` contain javascript and templates that result in the 
`*.htm` files.

Why build?
 
 - multiple options to include header/footer ("partials", standalone, web components(?), ~~angular~~) but one place 
   to change everything.
 - interpolate variables (version, ga tracking code, piwik url)
