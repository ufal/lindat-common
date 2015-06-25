LINDAT/CLARIN Common Theme
==========================

This is a fork of [Lindat Common Theme](https://redmine.ms.mff.cuni.cz/projects/lindat-common) made available for bower and AngularJS. This version is also a standalone in a sense that is has zero dependencies (not counting Angular). Neither jQuery nor Bootstrap is required or installed by default!

More info for old style of use: https://redmine.ms.mff.cuni.cz/projects/lindat-common/wiki

Installation
------------
  
    bower install lindat-common --save
    
or

    bower --force update
    
to force the newest version.
    
Use in Angular projects
-----------------------

1. Include CSS and Javascript in your html
1. Add `lindat` to the modules
        
        ```javascript
        angular.module('yourApp', ['lindat', ... ])
        ```
        
1. Directives `lindat-header` and `lindat-footer` will be available

        ```html
        <header lindat-header></header>
        
        ... your content ...
        
        <footer lindat-footer></footer>
        ```

    Element style will also work:
  
        ```html
        <lindat-header></lindat-header>
        
        ... your content ...
        
        <lindat-footer></lindat-footer>
        ```
        
1. Google Analytics and Piwik tracking are already included and should work out of the box. See [angular-piwik](https://github.com/mike-spainhower/angular-piwik) and [angular-google-analytics](https://github.com/revolunet/angular-google-analytics) for more info.

Development
-----------

This repo is based on https://redmine.ms.mff.cuni.cz/projects/lindat-common these two should be the same.

- Clone the repository
        
        git clone https://github.com/ufal/lindat-common.git
        cd lindat-common

- Install NodeJS environment (unless you already have one)
        
        curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.25.4/install.sh | bash

- Install build tools Bower and Gulp

        npm install -g bower gulp
        
- Install dependencies for development
        
        npm install && bower install
        
- Run development server
        
        gulp serve
        
- To test Angular directives run

        gulp serve:angular
        
- To build a new distribution

        gulp build && gulp tag

Making new release
------------------

| Task             | Version                                |
|------------------|----------------------------------------|
| gulp tag         | v0.0.1 -> v0.0.2 + commit + tag + push |
| gulp tag --minor | v0.0.1 -> v0.1.0 + commit + tag + push |
| gulp tag --major | v0.0.1 -> v1.0.1 + commit + tag + push |
