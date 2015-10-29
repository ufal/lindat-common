# LINDAT/CLARIN Common Theme

[![Build Status](https://travis-ci.org/ufal/lindat-common.svg?branch=master)](https://travis-ci.org/ufal/lindat-common)
[![Dependency Status](https://gemnasium.com/ufal/lindat-common.svg)](https://gemnasium.com/ufal/lindat-common)

Files common for all Lindat projects. The repository has been migrated from [UFAL Redmine](https://redmine.ms.mff.cuni.cz/projects/lindat-common). Here is short description on how to use Lindat Common Theme, for more detailed info see [Redmine wiki](https://redmine.ms.mff.cuni.cz/projects/lindat-common/wiki). 

## What is in the repository

The project requires build so the repository contains branches with pre build versions of the Common Theme. The build happens automatically by [Travis CI](https://travis-ci.org/ufal/lindat-common).

- [Production build branch](https://github.com/ufal/lindat-common/tree/releases)

  Every time the commit is tagged it is considered a production release and a new build is committed to `releases` branch.
  
- [Latest build branch](https://github.com/ufal/lindat-common/tree/edge)

  Every push to `master` branch is build to `edge` branch.

## Installation

You can get common theme to your project in several ways:

### 1. Using this repository as a git submodule

You can always opt-in for latest build by using `edge` branch instead of `releases` branch.

```.bash
git submodule add -b releases https://github.com/ufal/lindat-common.git lindat-common
git submodule init
git submodule update
```

To update to the newest version run following:

```.bash
git submodule update --remote --merge
```

Please note:
> The original idea was to use common theme the same way as `svn:externals` but the git doesn't work the same way. The submodule is always fixed to the specific commit SHA so you have to always manually update the submodule and also commit the change.

### 2. Using releases here on Github

Go [here](https://github.com/ufal/lindat-common/releases) and download the latest release or use command line:

```.bash
mkdir lindat-common
cd lindat-common
REPO="https://github.com/ufal/lindat-common"
TAG=`git ls-remote --tags $REPO | grep -v '\^{}' | sed -e 's/.*refs\/tags\/\(.*\)/\1/p' | sort -Vk2 | tail -n1`
curl -L "$REPO/releases/download/$TAG/dist.tar.gz" | tar -xz
```

### 3. Using the [Bower](http://bower.io/)

Use:
  
    bower install lindat-common#releases --save
    
for stable branch or use the latest build:

    bower install lindat-common#edge --save
    
to install and

    bower --force update
    
to force update to the newest version.

## How to Use Common Theme

All you have to do is include the header/footer html in your page layout together with css styles. You should also set `<body id="lindat-tools">`. If you can't set `id` on the `body`, any other common parent element should work. 

NOTE: `lindat.css` will set body margin and padding to *zero* pixels. This should stay zero to ensure proper look, if you need padding or margin on your page please use other elements. The header and footer requires only these.
    
## Use in Angular projects

1. Include CSS and Javascript in your html
1. Add `lindat` to the modules
        
        angular.module('yourApp', ['lindat', ... ])
        
1. Directives `lindat-header` and `lindat-footer` will be available

        <header lindat-header></header>
        
        ... your content ...
        
        <footer lindat-footer></footer>

    Element style will also work:
  
        <lindat-header></lindat-header>
        
        ... your content ...
        
        <lindat-footer></lindat-footer>
        
1. Google Analytics and Piwik tracking are already included and should work out of the box. See [angular-piwik](https://github.com/mike-spainhower/angular-piwik) and [angular-google-analytics](https://github.com/revolunet/angular-google-analytics) for more info.

## Automatic updates

lindat-common is occasionally updated, you can follow these updated automatically using cron. If your checkout is in /opt/lindat-common and you are on releases branch with no local modifications, something like `35 0 * * * cd /opt/lindat-common/ && git pull --quiet` inside your crontab or other cron file should suffice

## Development

- Clone the repository
        
        git clone https://github.com/ufal/lindat-common.git
        cd lindat-common

- Install NodeJS environment (unless you already have one)
        
        curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.25.4/install.sh | bash
        nvm install stable
        nvm use stable
        
- Install dependencies for development
        
        npm install
        
- Run development server
        
        make run

        
## Making new release

| Task                 | Version                                |
|----------------------|----------------------------------------|
| make release         | v0.0.1 -> v0.0.2 + commit + tag + push |
| make release-minor   | v0.0.1 -> v0.1.0 + commit + tag + push |
| make release-major   | v0.0.1 -> v1.0.1 + commit + tag + push |
