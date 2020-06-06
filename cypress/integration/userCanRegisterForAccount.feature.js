describe("User can register for an account", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "**/articles",
      response: "fixture:article_list.json",
    });
  });

  describe("can sign up successfully", () => {
    beforeEach(() => {
      cy.route({
        method: "POST",
        url: "**/auth",
        response: "fixture:successful_signup.json",
      });
      cy.visit("/");
      cy.get("button#login").click();
      cy.get("#signup").click();
      cy.get("#signup-form").within(() => {
        cy.get("#email").type("user@mail.com");
        cy.get("#password").type("password");
        cy.get("#passwordConfirmation").type("password");
        cy.get("Button#submit").contains("Submit").click();
      });
      cy.get("#login-form");
    });

    it("can see sucessful signup message", () => {
      cy.get("#signedup").should("contain", "Signed up sucessfully!");
    });
  });

  describe("signup fails due to missmatch password confirmation", () => {
    beforeEach(() => {
      cy.route({
        method: "POST",
        url: "**/auth",
        response: {
          success: false,
          errors: { full_messages: "doesn't match Password" },
        },
        status: 422,
      });
      cy.visit("/");
      cy.get("button#login").click();
      cy.get("#signup").click();
      cy.get("#signup-form").within(() => {
        cy.get("#email").type("user@mail.com");
        cy.get("#password").type("password");
        cy.get("#passwordConfirmation").type("pasword");
        cy.get("Button#submit").contains("Submit").click();
      });
    });

    it("can see unsucessful message", () => {
      cy.get("#error-message").should("contain", "doesn't match Password");
    });
  });
});
