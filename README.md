Symfony, Webpack and AngularJS Single Page Application Demo
=========

Single page application demo written with [Symfony](https://symfony.com/) framework.

Uses [AngularJS 1](https://angularjs.org/) as a frontend framework.

Uses [Webpack](https://webpack.github.io/) for minifying assets and loading them asynchronously. 

Uses [MabaWebpackBundle](https://github.com/mariusbalcytis/webpack-bundle) for integrating Webpack into Symfony framework.

## What's in it?

Bootstrapping and common components are in `app/Resources/assets` directory.

Some custom code is inside `Resources/assets` directory in several bundles.

Example shows how to:

- merge files together and minify them in production;
- include related CSS, Less files (same story would be for Sass);
- load files asynchronously: whole modules, templates, translations;
- load modules only if URL matches a route in that module;
- add extension mechanism between bundles (aka plugins).

Probably due to high influence from Symfony framework, JS files are grouped into bundles.

Bundles are self-contained, but depends on base components.

Bundles have to be registered in `app/Resources/assets/bundles.js` to be loaded.

As it's just an example and not ready-to-use library, see any documentation as comments inside the files.

Feel free to leave your opinion, suggest any improvements or add any solved use-case scenarios via pull requests.

## Installing

Clone this repository, install dependencies:

```bash
composer install
```

Keep in mind, that you need `npm` and `node` installed and available as an executable
(`npm install` is called automatically when you call `composer install` or `composer update`)

## Running demo

### Development environment

Run Webpack dev-server to serve assets and rebuild them if they change:

```bash
app/console maba:webpack:dev-server
```

Run application:

```bash
app/console server:run
```

### Production environment

If you would like to see how it would look in production environment:

```bash
app/console cache:clear --env=prod
app/console maba:webpack:compile --env=prod
app/console server:run --env=prod
```
