Symfony, Webpack and AngularJS Single Page Application Demo
=========

Single page application demo written with [Symfony](https://symfony.com/) framework.

Uses [AngularJS 1](https://angularjs.org/) as a frontend framework.

Uses [Webpack](https://webpack.github.io/) for minifying assets and loading them asynchronously. 

Uses [MabaWebpackBundle](https://github.com/mariusbalcytis/webpack-bundle) for integrating Webpack into Symfony framework.

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
