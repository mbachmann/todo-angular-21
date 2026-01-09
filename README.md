# TodoAngular 21

- https://github.com/mbachmann/todo-angular-21
- https://github.com/mbachmann/todo-angular-21-starter
- https://github.com/mbachmann/todo-angular-20-standalone

## Content

- [main Branch](https://github.com/mbachmann/todo-angular-21): (Starter, MyFirstComponent, TodoLists Service)
- [part 2 Branch](https://github.com/mbachmann/todo-angular-21/tree/part-2): (OpenApi, TodoListComponents, App, Forms, Directive, Pipe)
- [part 3 Branch](https://github.com/mbachmann/todo-angular-21/tree/part-3): (Jasmine/Karma UnitTests)


## Prerequisites

Both the CLI and generated project have dependencies that require Node 20.19 or higher, together with NPM 10.7.0 or higher.

The related Spring Boot Backend can be found here: [https://github.com/mbachmann/spring-boot-todo-app](https://github.com/mbachmann/spring-boot-todo-app)

## Links

- [Angular Home](https://angular.io/)
- [Angular Cli Github](https://github.com/angular/angular-cli)
- [Angular Cli Home](https://cli.angular.io/)

### Clean up the old Angular cli version and install a new version

```sh
    npm uninstall -g angular-cli
```

Global package:

```sh
    npm install -g @angular/cli@latest
```

---

## Create the project

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.2.

```bash
ng new todo-angular --test-runner=karma --file-name-style-guide=2016 --style=scss --zoneless=true --ai-config=none
```

- using karma instead of the new vitest test framework
- using the existing filename extensions like .component.ts or .service.ts
- using scss instead of css
- using the new zoneless feature
- no ai support for this project

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does **not** come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
