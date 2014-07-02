# Base Web Project

## Notes
This is a base template for web projects, its configured to use [Bower](http://gruntjs.com/) and [Grunt](http://bower.io/).

## Initial Install and Requirements
+ [NodeJS](http://nodejs.org/)
+ [NPM](http://npmjs.org/)
+ Grunt
+ Bower
+ Git

### Node
Install NodeJS and make sure you have it set in your system path. A reboot might be required in order to call NodeJS from the command line. 

### Install Sass + Compass
gem install compass --pre
gem install sass --pre

### Grunt
Install Grunt CLI
```
npm install -g grunt-cli
```
This will put the `grunt` command in your system path, allowing it to be run from any directory. Note that installing `grunt-cli` does not install the Grunt task runner.

### Bower
Bower depends on Node and npm. It's installed globally using npm.
```
npm install -g bower
```
### Install Bower/Grunt Dependencies
If you need install dependencies/packages type the following:
```
bower install <package-name>
```
or
```
npm install <package-name>
```

You can also have these automatically saved in your `package.json` or `bower.json` files by amending `--save-dev`.
```
npm install <package-name> --save-dev
```

## Working with an Existing Grunt Project with Bower
Open up a terminal and type `npm install` and `bower install` to get up and running. Make sure to configure/add/remove any dependencies as needed or not needed by the project.

## New Grunt Project
If you want to start a new project without the base but want to keep Bower and Grunt you can create the necessary files interactively.

First type `bower init` to create the `bower.json` file and to create Grunt files you can either use `grunt-init` which will automatically create a project-specific `package.json` file or `npm init` command will create a basic `package.json` file.

## Issues
There's a grunt plugin called `grunt-bower-install` which tries to inject all the dependencies used by the project e.g.
```
<script src="bower_components/jquery/dist/jquery.js"></script>
```
but some dependencies cant be injected in the HTML because they don't follow the proper format for this plugin to do so. Fortunately, the plugin will tell which dependency it was unable to inject. No big deal just add it yourself. Oh well!