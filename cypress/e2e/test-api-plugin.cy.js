import "cypress-plugin-api";
require("../../src");

describe("test", () => {
  it("GET - Single Result - 200", () => {
    const name = "Abyssinian";

    cy.api({
      method: "GET",
      url: "https://api.api-ninjas.com/v1/cats",
      headers: {
        "X-Api-Key": Cypress.env("API_NINJA_API_KEY"),
      },
      qs: {
        name,
      },
    }).then(({ status, body }) => {
      // Validate status code
      expect(status).to.be.eq(200);
      // Validate a single breed is returned
      expect(body.length).to.be.equal(1);

      // Validate specific body data, can define other properties as needed with this pattern
      const { name, origin } = body[0];
      expect(name).to.be.equal(name);
      expect(origin).to.be.equal("Southeast Asia");
    });
  });

  it("GET - No Params - 400", () => {
    cy.api({
      method: "GET",
      url: "https://api.api-ninjas.com/v1/cats",
      headers: {
        "X-Api-Key": Cypress.env("API_NINJA_API_KEY"),
      },
      failOnStatusCode: false,
    }).then(({ status, body }) => {
      // Validate status code
      expect(status).to.be.eq(400);

      // Validate specific body
      const { error } = body;
      expect(error).to.be.equal("Invalid parameters.");
    });
  });
});
