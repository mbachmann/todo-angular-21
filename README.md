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

For local debugging with the visible Playwright browser, you can also use the npm scripts below:

```bash
npm run test:watch
npm run test:browser
npm run test:ui
```

- `npm test` runs the Angular builder (`ng test`) and exits when the run completes.
- `npm run test:watch` starts Vitest in watch mode using `vitest.config.ts`.
- `npm run test:browser` runs the visible Chromium browser and keeps it open while Vitest stays running.
- `npm run test:ui` starts the Vitest UI for interactive test runs.

Angular CLI does **not** come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Migrate Karma to Vitest


```bash
npm install @analogjs/vitest-angular --save-dev
```
```bash
ng g @analogjs/vitest-angular:setup --project --todo-angular 
```

✔ Do you want to enable browser mode for testing with Playwright? Yes
CREATE vite.config.mts (708 bytes)
CREATE src/test-setup.ts (255 bytes)
UPDATE package.json (1951 bytes)
UPDATE tsconfig.spec.json (269 bytes)
UPDATE angular.json (4010 bytes)

```bash
npm install @analogjs/vite-plugin-angular @analogjs/vitest-angular jsdom --save-dev
```

```bash
npm uninstall karma karma-chrome-launcher karma-coverage karma-jasmine karma-jasmine-html-reporter jasmine-core
```

```bash
ng g @schematics/angular:refactor-jasmine-vitest
```
```bash
export NODE_EXTRA_CA_CERTS=RootCA-IntermediateCA-SystemCA.pem     
npx playwright install
```
