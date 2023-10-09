describe("e2e testing on website", () => {
  beforeEach(() => {
    cy.visit("https://butopea.com");
  });

  xit("Should confirm text and button in banner section", () => {
    cy.get(".banner > .row > .banner-square-column")
      .eq(1) // middle square
      .within(() => {
        cy.get("p").should(($p) => {
          expect($p).to.have.length.above(0); // Check if at least one <p> element exists
        });

        cy.get("button").should("exist");

        cy.get("p")
          .invoke("text")
          .then((paragraphText) => {
            // Log the button text to the Cypress console
            cy.log(`paragraphText Text: ${paragraphText}`);
          });

        cy.get("button")
          .invoke("text")
          .then((buttonText) => {
            // Log the button text to the Cypress console
            cy.log(`Button Text: ${buttonText}`);
          });
      });
  });

  xit("Should confirm image in banner section", () => {
    cy.get(".banner > .row > .banner-square-column")
      .eq(2) // last square
      .within(() => {
        cy.get("img")
          .should("exist")
          .then(($img) => {
            // Get the image's src attribute
            const imageUrl = $img.attr("src");

            // Log the image URL to the Cypress console
            cy.log(`Image URL: ${imageUrl}`);
          });
      });
  });

  it("Should extract products", () => {
    cy.get("nav").within(() => {
      // Listen to GET to comments/1
      cy.intercept(
        "POST",
        "**//api/catalog/vue_storefront_catalog_hu/product/*"
      ).as("getProducts");

      cy.screenshot("products-test-before");

      // we have code that gets a comment when
      // the button is clicked in scripts.js
      cy.get("button").eq(2).click({ force: true });

      // wait for GET comments/1
      cy.wait("@getProducts").then(({ request, response }) => {
        console.log(response);
        cy.log(response.body);
        // hits.hits.length > 0
        // item._source
        // .slug
        // .name
        // .image
        // .price
        cy.screenshot("products-test-after");
        // expect(request.body).to.include('email')
        // expect(request.headers).to.have.property('content-type')
        // expect(response && response.body).to.have.property('name', 'Using POST in cy.intercept()')
      });
    });
  });
});
