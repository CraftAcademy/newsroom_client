describe("User can purchase a subscription on the subscribe page", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/articles",
      response: "fixture:article_list.json",
    });
    cy.visit("/");
  });

  describe("Successfully when logged in", () => {
    beforeEach(() => {
      cy.route({
        method: "POST",
        url: "**/subscriptions",
        response: { message: "Transaction was successful" },
      });
      cy.logIn();
      cy.wait(3000)
      cy.get("#subscription-link").contains("Subscribe").click();
    });

    it("by filling out payment form", () => {
      cy.get("#payment-interface").should("be.visible");
      cy.wait(3000);
      cy.typeInStripeElement("cardnumber", "4242424242424242");
      cy.typeInStripeElement("exp-date", "12/21");
      cy.typeInStripeElement("cvc", "123");
      cy.get("button").contains("Confirm Payment").click();
      cy.get("#transaction-message").should(
        "contain",
        "Transaction was successful"
      );
      cy.wait(2000);
      cy.get("#transaction-message").should("not.be.visible");
      cy.get("#subscriber-message").should("contain", "You are a subscriber!");
    });
  });

  describe("Unsuccessfully", () => {
    it("when the transaction was unsuccessful", () => {
      cy.route({
        method: "POST",
        url: "**/subscriptions",
        response: { message: "There was a problem with your transaction" },
        status: 400,
      });
      cy.logIn();
      cy.wait(3000)
      cy.get("#subscription-link").contains("Subscribe").click();
      cy.wait(3000);
      cy.typeInStripeElement("cardnumber", "4242424242424242");
      cy.typeInStripeElement("exp-date", "12/21");
      cy.typeInStripeElement("cvc", "123");
      cy.get("button").contains("Confirm Payment").click();
      cy.get(".error-message").should(
        "contain",
        "There was a problem with your transaction"
      );
    });

    it("by entering incomplete data", () => {
      cy.logIn();
      cy.wait(3000);
      cy.get("#subscription-link").contains("Subscribe").click();
      cy.wait(3000);
      cy.typeInStripeElement("cardnumber", "4242424242424242");
      cy.typeInStripeElement("exp-date", "12/10");
      cy.get("button").contains("Confirm Payment").click();
      cy.get(".error-message").should(
        "contain",
        "Your card's expiration year is in the past."
      );
    });
  });

  describe("Visitors and not logged-in users", () => {
    beforeEach(() => {
      cy.get("#subscription-link").contains("Subscribe").click();
    });

    it("cannot see the payment form", () => {
      cy.get("#payment-interface").should("not.exist");
    });

    it("see a message", () => {
      cy.get("#subscribe-today").should(
        "contain",
        "Become a subscriber today!"
      );
    });

    it("see a link to sign up/log in page", () => {
      cy.get("#sign-in-sign-up")
        .should("contain", "Log in or sign up to proceed")
        .click();
      cy.get("#login-form")
        .should("be.visible")
    });
  });
});
