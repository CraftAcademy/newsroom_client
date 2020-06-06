Cypress.Commands.add('typeInStripeElement', (element, value) => {
	cy.get(`#${element} iframe`).then($iframe => {
		const $body = $iframe.contents().find("body")
		cy.wrap($body)
			.find(`input[name^="${element}"]`)
			.type(value, {delay: 10})
	})
})

Cypress.Commands.add('logIn', () => {
  cy.route({
    method: "POST",
    url: "http://localhost:3000/api/auth/*",
    response: "fixture:successful_login.json",
    headers: {
      uid: "user@mail.com",
    },
  });
  cy.route({
    method: "GET",
    url: "http://localhost:3000/api/auth/*",
    response: "fixture:successful_login.json",
    headers: {
      uid: "user@mail.com",
    },
  });
  cy.get("a > #login").click();
  cy.get("#login-form").within(() => {
    cy.get("#email").type("user@mail.com");
    cy.get("#password").type("password");
    cy.get("Button").contains("Submit").click();
  });
})