# DIYRT

The name was inspired by being an anagram for `dirty`, as we are doing to get our hands dirty by building our own React toolchain from the ground up :sunglasses:.

And feel free to checkout other toolchains [recommended](https://reactjs.org/docs/create-a-new-react-app.html#recommended-toolchains) by React. I do not believe in a single person being the cardial truth of knowledge :man_shrugging:.

The [Create React App CLI tool](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app)  is a good place to start if you are just getting started. Though it assumes a lot...a lot, which is good. Because if your are trying to figure out React, all you want is to have something visible, it being a UI library :roll_eyes:. But I have naturally been a curious monkey. So for those interested, we are going to go down the :rabbit: :hole: starting...now!

> :pushpin: As one wise man on the internet was told by his professor: **"We are not re-inventing the wheel. Just learning how the wheel works"** or something along those lines :100:.

## 1. Introductions - what is this toolchain we speak of?
Well, these are a set of tools ***La Di Da***, that would assist a programmer have a near painless development experience. In the case of React, these generally consist of:
1. JavaScript package manager e.g **[NPM](https://www.npmjs.com)** | [YARN](https://yarnpkg.com)
2. JavaScript build tools e.g **[Webpack](https://webpack.js.org)** | [Parcel](https://parceljs.org)
3. JavaScript compiler e.g **[Babel](https://babeljs.io)** | [Traceur](https://github.com/google/traceur-compiler) 
> In this journey, we will utilize the ones in bold, as they are what would be considered ***industry standards***. May be in another reality they other alternatives are the ones leading the pack?  


## 2. Defining a project structure
We will be defining the organization of our project by setting up a folders to represent different parts of our application. Consider this the planning phase. Let's go ahead and create the following directory structure:
> The plus-sign (+) shows that it's a folder while the minus-sign(-) show that it is a file. And the indentation indicates that the file or folder is nested. Cool? Cool. :fist_right:
```
+ project-x
    + assets
        - index.html
    + build
        - webpack.config.js
        - webpack.prod.js
        - webpack.dev.js
    + src
        + app
            - App.js
            - app.scss
        + components
            + app-bar
                - AppBar.js
                - app-bar.scss
        + pages
            + about
                - About.js
                - about.scss
            + home
                - Home.js
                - home.scss
            + landing
                - Landing.js
                - landing.scss
        + routes
            - index.js
        - index.js
    - .babelrc
    - .browserslistrc
    - .gitignore
    - LICENSE
    - package.json
```

3. ## Installing project dependancies
As we shall be using NPM to manages our dependancies it is good to get acquinted with some of these useful commands:
| Command                      | What it accomplishes                                                                     |
|------------------------------|------------------------------------------------------------------------------------------|
| 1. `npm init`                | Initializes an NPM project & sets up the base configurations                             |
| 2. `npm i`                   | Installs all packages declared in the package.json file                                  |
| 3. `npm i <package>`         | Installs the package given without storing the entry in the package.json file            |
| 4. `npm i -S <package>`      | Installs the package specified and registers the package as a **core** dependancy        |
| 5. `npm i -D <package>`      | Installs the package specified and registers the package as a **development** dependancy |
| 6. `npm run <script>`        | Runs the script task as declared in the package.json file                                |

Commands 2, 4 & 5 can be written more expressively as **`npm install`**, **`npm install <package> --save`** and **`npm install <package> --dev`** represectively.

Let's proceed to copy the following content into the `package.json` file in our project:
```json
{
    "name": "<project-name>",
    "version": "0.0.0",
    "license": "MIT",
    "main": "index.js",
    "scripts": {
        "build": "webpack --config build/webpack.prod.js",
        "debug": "webpack-dev-server --config build/webpack.dev.js"
    },
    "devDependencies": {
        "@babel/core": "^7.8.4",
        "@babel/plugin-syntax-dynamic-import": "^7.8.3",
        "@babel/preset-env": "^7.8.4",
        "@babel/preset-react": "^7.8.3",
        "autoprefixer": "^9.7.4",
        "babel-loader": "^8.0.6",
        "clean-webpack-plugin": "^3.0.0",
        "css-loader": "^3.4.2",
        "file-loader": "^5.1.0",
        "html-webpack-plugin": "^3.2.0",
        "mini-css-extract-plugin": "^0.9.0",
        "node-sass": "^4.13.1",
        "postcss-loader": "^3.0.0",
        "sass-loader": "^8.0.2",
        "style-loader": "^1.1.3",
        "url-loader": "^3.0.0",
        "webpack": "^4.41.6",
        "webpack-cli": "^3.3.11",
        "webpack-dev-server": "^3.10.3",
        "webpack-merge": "^4.2.2"
    },
    "dependencies": {
        "react": "^16.13.0",
        "react-dom": "^16.13.0",
        "react-router-dom": "^5.1.2"
    }
}
```

After pasting the content into package.json, run the command `npm install` in the root of the project. The command should begin installing the dependanies ASAP!.
> The speed of installation is dependant on various factors such as: computer performance & connectivity speeds.

## 3. Configuring Babel
***Babel is our JavaScript transcompiler of choice.*** 
Okay, but why do we need it? The thing is, browser support for the latest specifications of JavaScript is not that great at all:unamused:. Furthermore browser engines vary alot in various ways. Just look at this [camparison table](https://caniuse.com/#comparison) from caniuse.com.

So what Babel allows us to do is to write our programs using the most recent advancement in JavaScript(ES6+) which comes with various improvements e.g classes, fat arrows functions, compile it into JavaScript which would be supported by a vast majority of the browser engines out there. And below would be the babel dependancies to help with that:
1. **[@babel/core](https://babeljs.io/docs/en/babel-core)**
2. **[@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env)**
3. **[@babel/preset-react](https://babeljs.io/docs/en/babel-preset-react)**
4. **[@babel/plugin-syntax-dynamic-import](https://babeljs.io/docs/en/babel-plugin-syntax-dynamic-import)**

Copy & paste this into **`.babelrc`**, which is our babel configuration file.
```json
{
    "presets": [
        "@babel/preset-env",
        "@babel/preset-react"
    ],
    "plugins": [
        "@babel/plugin-syntax-dynamic-import"
    ]
}
```

We can also specificy the range of browsers we would want to target. Let's copy the following into **`.browserslist`**:
```text
> 1%
IE 10
last 2 versions
```
Okay... that's col. But what is the range covered by this "spell"?
+ Browsers with more than 1% coverage
+ Internet explorer 10 only
+ The last two version of the remaining browsers

> Learn more about Babel configuration files [here](https://babeljs.io/docs/en/config-files) and browserslist [here](https://github.com/browserslist/browserslist)
