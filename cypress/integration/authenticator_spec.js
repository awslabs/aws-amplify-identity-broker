describe('Authenticator:', function () {
	beforeEach(function () {
		cy.visit('/');
	});
	describe('Sign In:', () => {
		it('allows a user to signin', () => {
			cy.get(selectors.emailInput).type(Cypress.env('EMAIL'));
			cy.get(selectors.signInPasswordInput).type(Cypress.env('PASSWORD'));
			cy.get(selectors.signInSignInButton).contains('Sign In').click();
			cy.wait(3000)
			cy.get(selectors.root).contains('Amplify Identity Broker');
		});
	});
});
export const selectors = {
	emailInput: '[data-test="sign-in-email-input"]',
	signInPasswordInput: '[data-test="sign-in-password-input"]',
	signInSignInButton: '[data-test="sign-in-sign-in-button"]',
	root: '#root'
};
