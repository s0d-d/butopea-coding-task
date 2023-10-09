describe("e2e testing on website", () => {
  beforeEach(() => {
    cy.visit("https://butopea.com");
  });

  it("Should confirm text and button in banner section", () => {
    cy.screenshot("text-button-test-before", {
      capture: "fullPage",
      overwrite: true,
    });

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

        cy.screenshot("text-button-test-after", {
          capture: "fullPage",
          overwrite: true,
        });
      });
  });

  it("Should confirm image in banner section", () => {
    cy.screenshot("banner-image-test-before", {
      capture: "fullPage",
      overwrite: true,
    });

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
            cy.screenshot("banner-image-test-after", {
              capture: "fullPage",
              overwrite: true,
            });
          });
      });
  });

  it("Should extract products", () => {
    cy.screenshot("products-test-before", {
      capture: "fullPage",
      overwrite: true,
    });

    cy.get("nav").within(() => {
      // Listen to GET to comments/1
      cy.intercept(
        "POST",
        "**//api/catalog/vue_storefront_catalog_hu/product/*"
      ).as("getProducts");

      // we have code that gets a comment when
      // the button is clicked in scripts.js
      cy.get("button").eq(2).click({ force: true });

      // wait for GET comments/1
      cy.wait("@getProducts").then(({ request, response }) => {
        // Check if response.body.hits.hits is defined and has a length property
        expect(response.body.hits.hits).to.exist;
        expect(response.body.hits.hits.length).to.be.gte(0);

        const { hits } = response.body.hits;

        const extractedProductInfo = hits.map((item) => {
          const extractedData = {
            productLink: item._source.slug,
            title: item._source.name,
            imageUrl: item._source.image,
            price: item._source.price,
          };

          return extractedData;
        });

        cy.log(extractedProductInfo);

        cy.wait(5000);
        cy.screenshot("products-test-after", {
          capture: "fullPage",
          overwrite: true,
        });
      });
    });
  });
});
