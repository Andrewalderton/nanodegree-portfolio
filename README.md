Portfolio
=========

## Description

Portfolio site originally created as the first project for the Udacity Front-End Nanodegree.

Has since been updated with links to subsequent projects created during the course, as well as projects recently completed as part of the Full Stack Nanodegree.

## Usage

To run the app: download the files, or clone the repository, and open the `index.html` file located inside the `dist` folder.

The site can also be viewed live [here](http://andrewalderton.github.io/nanodegree-portfolio).

### Gulp Usage

Gulp has been used in this project for build and optimisation tasks. Critical-path CSS has been added inline at the top of `index.html`, images have been compressed, and scripts concatenated and minified.

Replicating the process of producing production files for this project requires **npm**, which can be downloaded and installed from [nodejs.org](http://nodejs.org), and **gulp**, which can be subsequently installed in your project directory using the command `$ npm install --save-dev gulp` from the terminal.

Several gulp plugins are also required and are listed in the `package.json` file. They can be installed by running the command `$ npm install`.

All main gulp tasks are included in the default task located in `gulpfile.js`. Once the necessary components are installed, simply run `$ gulp` in the command line, from the project root, to reproduce the optimisations for this project.

All working files are located in the `src` directory. Gulp tasks will output to the `dist` directory.
