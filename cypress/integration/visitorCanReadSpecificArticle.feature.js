describe("visitor can read a specific article", () => {
  before(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/articles",
      response: "fixture:article_list.json",
    });
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/articles/1",
      response: "fixture:single_article.json",
    });
    cy.visit("/");
    cy.get("#article-1").within(() => {
      cy.get(".article-title").click();
    })
  });

  it("article is displayed", () => {
    cy.get(".article-title").should("contain", "Title 1");
    cy.get("#article-1-date").should("contain", "2020-02-20 02:02");
    cy.get("#article-1-body").should("contain", "Lorem ipsum");
    cy.get("#article-2").should("not.exist")
  });

  it("a smaller list of articles is displayed to the side", () => {
    cy.get("#article-side-list").within(() => {
      cy.get("#article-2").should("be.visible")
      cy.get("#article-3").should("be.visible")
      cy.get("#article-4").should("be.visible")
      cy.get("#article-5").should("be.visible")
    })
  })

  it("the articles in the list replace the current article, when clicked", () => {
    cy.get("#article-2").click()
    cy.get("#article-2-body").should("be.visible")
    cy.get("#article-1-body").should("not.exist")
  })
});
