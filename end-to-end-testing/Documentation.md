# End-to-end testing website documentation

These Cypress tests are designed to validate the functionality of the https://butopea.com website.

## Getting started

Tests are located in `./cypress/e2e` directory. As the tests were small, only one file is used.

### Pre-requisite

To build and run the project, the following need to be installed:

- Node.js
- npm

### Cloning and running the tests

- Clone the repository

```bash
git clone https://github.com/s0d-d/butopea-coding-task
```

- Change directory to project directory

```bash
cd butopea-coding-task/end-to-end-testing
```

- Install dependencies

```bash
$ npm install
```

- Run the project

```bash
$ npm run test
```

## Tests

### Test 1:

- Finds the the text and button container using

```javascript
cy.get(".banner > .row > .banner-square-column").eq(1); // middle square
```

- Used `p` tag to access the display test as there was no other <p/> tag used in the container.

- In order to print display text and button text to log, accessed the elements separately.

### Test 2:

- Finds the image container using same method

```javascript
cy.get(".banner > .row > .banner-square-column").eq(2); // last square
```

- Directly accessing <img/> tag as it should be only one

```javascript
cy.get("img").should("exist");
```

### Test 3:

- Product info could be extracted from html element. However, the responseBody is used as the outcome is the same.
- Product image url is relative because you need to set resolution in the link. e.g: https://butopea.com/img/300/300/resize/path/to/img
- Screenshots are stored in directory ./cypress/screenshots/ with the following names: products-test-before, products-test-after.

## Issues:

- On test 3, screenshots are not capturing full page even with `capture: "fullPage"` option. Couldn't find the solution as of now.

## TO-DO

- Refactor `cy.screenshot()` commands to custom commands, as the configs are overlapping
- Store https://butopea.com domain in a config file

## Sources

- https://docs.cypress.io/guides/getting-started/installing-cypress

```

```
