# PokemonTrainerAngular

This is a simple Pokemon catalogue web application buiklt using the Angular Framework.

It has four views:
- Landing page that prompts for user name
- Pokemon catalogue page that lists all available Pokemons retrieved from pokeapi.co
- Pokemon detail page that displays individual Pokemon's attributes as retrieved from pokeapi.co and allows the current user to "collect the Pokemon"
- Pokemon trainer profile that displays all Pokemons that the current user has collected

The application restricts user access to the Pokemon views until the user has entered his name. The user session authentication is managed using the Angular Guard pattern.

The application uses services to share data between components and make HTTP requests using the HttpClient.

# Limitations of the application (project specifications that were not achieved)

- Pokemon details view (displaying individual Pokemon's attributes) does not display types, base stats, abilities or moves.

- Pokemon catalogue view does not currently display Pokemon images (sprites) and I could not quite figure out why.

- The application runs currently only with localhost.

# #############################################

## Angular CLI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
