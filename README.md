# Tremor

Casper is cool but tremor is cooler, since it offers more advanced web development features rather than a vanilla theme.

#Features
*  BootStrap with CSS and javascript components.
*  Fluid layout.
*  Syntax highlighting for code blocks.
*  Grunt based build.
*  Bower compoenents.


## Installation
### Hosted Solution
Just download a release .zip file and upload it using the admin UI.

### Development
1. Checkout the repo.
2. Change the directory to the repo.  
    ```cd path/to/tremor```  
3. For this to work you need to have npm and nodejs already installed along with these global packages.  
    ```npm install -g grunt-cli bower```  
4. Install bower depedencies  
    ```bower install```
5. Install npm dependencies  
    ```npm install```
6. In order to build final distributive perform the default ```grunt``` command
7. Now go into the ghost themes folder  
    ```cd path/to/ghost/content/themes```
8. Make two simlinks one for dist, one for dev, that way you can check to make sure the theme still compiles right.  
    ```ln -s path/to/tremor ./tremor-dev```  
    ```ln -s path/to/tremor/dist ./tremor-dist```

Now you have setup 2 separate themes one that isnt optimized and one that is.  From here on you may develop.
