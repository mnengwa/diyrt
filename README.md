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
            - About.js
            - about.scss
            - App.js
            - app.scss
            - Home.js
            - home.scss
            - Landing.js
            - landing.scss
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
    "private": true,
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
Okay, but why do we need it? The thing is, browser support for the latest specifications of JavaScript is not that great at all :unamused:. Furthermore browser engines vary alot in various ways. Just look at this [camparison table](https://caniuse.com/#comparison) from caniuse.com.

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
const common = require('./webpack.common.js');
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
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const rootDir = path.resolve(__dirname, '..');

module.exports = merge(common, {
    mode: 'production',
    output: {
        publicPath: 'dist/',
        path: rootDir + '/dist/',
        filename: 'js/[name].[hash].js',
        chunkFilename: 'js/[name].[hash].js',
    },
    plugins: [
        new MiniCssExtractPlugin({
            ignoreOrder: false,
            filename: 'css/[name].[hash].css',
            chunkFilename: 'css/[name].[hash].css',
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

If you didn't get slapped with a load full of errors in your terminal kudos :thumbsup:. If you did, try re-tracing your steps while combing through the errors: consider them learning mistakes that add more skill & knowledge :muscle: rather than signs that you should quite the journey.

## 4. Using React
It's time to use React UI library. Can I get a ***Whoop! Whoop!***? Let's go ahead and build a React application. The dependancies used for this segment are as follows:

| Dependency   | Documentation                                                                            |
|--------------|------------------------------------------------------------------------------------------|
| React        | [GitHub](https://github.com/facebook/react) page                                         |
| React DOM    | [GitHub](https://github.com/facebook/react/tree/master/packages/react-dom) page          |
| React router | [Documentation](https://reacttraining.com/react-router/web/guides/quick-start) website   |

The first thing we are going to do is create two pages for demonstration purposes: **home** and **about**.

Copy the following content into Home.js:
```jsx
import React from 'react';

import '@/app/home.scss';

export default () => {
    return <div id="home-page">
        <header>
            DIRT - HOME
        </header>
    </div>;
};
```

Copy the following into home.scss
```scss
#home-page {
    header {
        font-size: 4rem;
        color: #EC5f67;
        text-align: center;
        font-family: 'Fira Code', 'Courier New', Courier, monospace;
        text-transform: capitalize;
    }
}
```

Copy the following into About.js:
```jsx
import React from 'react';

import '@/app/about.scss';

export default () => {
    return <div id="about-page">
        <header>
            ABOUT - DIRT
        </header>
    </div>;
};
```

Copy the following into about.scss
```scss
#about-page {
    header {
        font-size: 4rem;
        color: #FAC863;
        text-align: center;
        font-family: 'Fira Code', 'Courier New', Courier, monospace;
        text-transform: capitalize;
    }
}
```

Copy the code below in the file **`src/app/App.js`**:
```jsx
import React, { Suspense } from 'react';
import { Switch, Route, NavLink, BrowserRouter } from 'react-router-dom';

import '@/app/app.scss';
import Loading from '@/app/Loading';
const Home = React.lazy(() => import(/* webpackChunkName: "home" */ '@/app/Home'));
const About = React.lazy(() => import(/* webpackChunkName: "about" */ '@/app/About'));

function AppBar() {
    return <nav>
        <NavLink to="/" className="nav-item" exact={true}>HOME</NavLink>
        <NavLink to="/about" className="nav-item" exact={true}>ABOUT</NavLink>
    </nav>;
}

function App() {
    return <BrowserRouter>
        <AppBar/>
        <Suspense fallback={<Loading/>}>
            <Switch>
                <Route path='/' exact={true}>
                    <Home/>
                </Route>
                <Route path='/about'>
                    <About/>
                </Route>
            </Switch>
        </Suspense>
    </BrowserRouter>;
}

export default App;
```

Copy the code below in the file **`src/app/app.scss`**:
```scss
@import url('https://fonts.googleapis.com/css?family=Fira+Code|Montserrat&display=swap');

body {
    margin: 0;
    border: 0;
    padding: 0;
    width: 100%;
    height: 100vh;
    font-size: 16px;
    background-color: #1B2B34;
}

nav {
    display: flex;
    padding: 1rem;
    justify-content: center;

    .nav-item {
        color: #fff;
        padding: 4px 8px;
        text-decoration: none;
        font-family: 'Montserrat', sans-serif;

        &.active {
            color: #99C794;
        }
    }
}
```

Don't worry, we are almost done. Next up we wire up our page routes. We would want it such that if a users goes to `/about` or clicks the about link, they would get to see the about page contents. And so forth for all our pages.

> So what's happening here apart from declaring our page routes, is that we are code splitting our application based on routes. That is to mean that every page will load only what it need to exist(render), rather than load everything at once. We have archieved this through dynamic imports which is supported by our build tool - [Webpack](https://webpack.js.org/guides/code-splitting/), compiler - [Babel](https://babeljs.io/docs/en/babel-plugin-syntax-dynamic-import) & UI library [React](https://reactjs.org/docs/code-splitting.html#reactlazy).

Copy the content below that defines our application's skeleton file in **`assets/index.html`**:
```ejs
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title><%= htmlWebpackPlugin.options.title %></title>
    </head>
    <body>
        <div id="root"></div>
        <noscript>
        Enable JavaScript in your browser for a better experience
        </noscript>
    </body>
</html>
```

Copy the following code into **`src/index.js`**:
```jsx
import React from "react";
import ReactDOM from "react-dom";

import App from "./App.js";
ReactDOM.render(<App />, document.getElementById("root"));
```
This **injects our React application into our web page the (`DOM`)**. Keep in mind that our application only consists of a single HTML page and the content is rendered through our JavaScript code.

Re-run the command **`npm run debug`** to start our development server. The server should be serving content at [http://localhost:3000](http://localhost:3000). Open this URL in your browser and it should take you to the home page. Navigate around the app try to pick things out.

Finally re-run the command **`npm run build`** to build your production ready files. You will notice that a new folder named *`dist`* was created and there are files in it. 

> This is the folder you should that your should host on a server capable of serving static files. e.g Apache, Ngix among others.

<p align="center"> 
And that's it folks.
<br/>
:tada: :tada: :tada:
 - The End - 
:confetti_ball: :confetti_ball: :confetti_ball:
</p>
