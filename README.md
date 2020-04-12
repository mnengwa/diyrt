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
        - webpack.common.js
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

## 4. Setting up Webpack
**Webpack** is a JavaScript module bundler - its main purpose is to bundle JavaScript files for usage in a browser, by taking modules with dependencies and generating static assets representing those modules.

The main advantage to this is:
> Webpack takes the dependencies and generates a dependency graph allowing web developers to use a modular approach for their web application development.

Here are the Webpack dependancies in play:
| Dependency            | Documentation                                                   |
|-----------------------|-----------------------------------------------------------------|
| webpack               | [GitHub](https://github.com/webpack/webpack) page               |
| webpack-cli           | [GitHub](https://github.com/webpack/webpack-cli) page           |
| webpack-dev-server    | [GitHub](https://github.com/webpack/webpack-dev-server) page    |
| webpack-merge         | [GitHub](https://github.com/survivejs/webpack-merge) page       |

Inside the `build directory` is where we will put our webpack configuration files. We are goint to setup **loaders**, **rules**, and **plugins** among other settings to make our modular JS project come to live. Please visit the Webpack [documentation](https://webpack.js.org/concepts/) to make deeper sense of Webpack concepts including loaders, rules & plugins.

We will be using the following loaders to handle different file types within our project:
| Dependency        | Documentation                                                     |
|-------------------|-------------------------------------------------------------------|
| babel-loader      | [GitHub](https://github.com/babel/babel-loader) page              |
| file-loader       | [GitHub](https://github.com/webpack-contrib/file-loader) page     |
| url-loader        | [GitHub](https://github.com/webpack-contrib/url-loader) page      |
| style-loader      | [GitHub](https://github.com/webpack-contrib/style-loader) page    |
| css-loader        | [GitHub](https://github.com/webpack-contrib/css-loader) page      |
| postcss-loader    | [GitHub](https://github.com/postcss/postcss-loader) page          |
| autoprefixer      | [GitHub](https://github.com/postcss/autoprefixer) page            |
| node-sass         | [Github](https://github.com/sass/node-sass) page                  |
| sass-loader       | [Github](https://github.com/webpack-contrib/sass-loader) page     |

And here are the Webpack plugins we will apply in our project:
| Dependency                 | Documentation                                                                |
|----------------------------|------------------------------------------------------------------------------|
| html-webpack-plugin        | [GitHub](https://github.com/jantimon/html-webpack-plugin) page               |
| clean-webpack-plugin       | [GitHub](https://github.com/johnagan/clean-webpack-plugin) page              |
| mini-css-extract-plugin    | [GitHub](https://github.com/webpack-contrib/mini-css-extract-plugin) page    |

We will be splitting our configurations into three parts:
1. Development configs in **`webpack.dev.js`**
2. Production configs in **`webpack.prod.js`**
3. Common configs in **`webpack.common.js`**

Paste this code in your empty **`webpack.common.js`** file.
```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const rootDir = path.resolve(__dirname, '..');

module.exports = {
    entry: {
        app: rootDir + '/src/index.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                        },
                    },
                ],
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development',
                        },
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function() {
                                return [
                                    require('autoprefixer'),
                                ];
                            },
                        },
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
            },
        ],
    },
    resolve: {
        alias: {
            '#': rootDir + '/',
            '@': rootDir + '/src/',
        },
        extensions: ['*', '.js', '.jsx'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            minify: true,
            title: 'zana',
            template: rootDir + '/assets/index.html',
        }),
        new CleanWebpackPlugin()
    ],
};
```

Paste this code in your empty **`webpack.dev.js`** file.
```javascript
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.config.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const rootDir = path.resolve(__dirname, '..');

module.exports = merge(common, {
    mode: 'development',
    output: {
        path: rootDir + '/dist/',
        filename: '[name].js'
    },
    devtool: 'inline-source-map',
    devServer: {
        hot: true,
        port: 3000,
        stats: 'errors-only',
        historyApiFallback: true,
        contentBase: rootDir + '/assets/'
    },
    plugins: [
        new MiniCssExtractPlugin({
            ignoreOrder: false,
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
});
```

Paste this code in your empty **`webpack.prod.js`** file.
```javascript
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.config.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const rootDir = path.resolve(__dirname, '..');

module.exports = merge(common, {
    mode: 'production',
    output: {
        path: rootDir + '/dist/',
        filename: '[name].[hash].js'
    },
    plugins: [
        new MiniCssExtractPlugin({
            ignoreOrder: false,
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css',
        }),
    ]
});
```

If we go back to the scripts section of our `package.json`, we see that it is easy to see the configs being used for their respective environments:
```json
"scripts": {
    "build": "webpack --config build/webpack.prod.js",
    "debug": "webpack-dev-server --config build/webpack.dev.js"
},
```

> The **`--config`** flag tells webpack-cli what configuration to use.

Now try running the following in your project root:
1. **`npm run debug`** ... to start the webpack development server
2. **`npm run build`** ... to build the application
