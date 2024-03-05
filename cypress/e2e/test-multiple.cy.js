require("../../src");

describe("test", () => {
  it("passes", () => {
    expect(true).to.be.eq(true);
  });

  it("visit site", () => {
    cy.visit("https://nhl.com");
  });

  it("fails", () => {
    expect(true).to.be.eq(false);
  });

  it.skip("skipped test", () => {});
});
