import awsconfig from "../../src/aws-exports";

describe('Authenticator:', function () {
	let access_token
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
			cy.getCookie('access_token').should('exist')
				.then((c) => {
					access_token = c.value
				});
		});
	});
	describe('User Info:', () => {
		it('allows a user to fetch user info', () => {
			cy.request({ url: awsconfig.oauth.redirectSignIn + '/oauth2/userInfo', headers: { "Authorization": "Bearer " + access_token } }).then(
				(response) => {
					console.log(response)
					expect(response.body).to.have.property('email_verified', 'true') // true
				}
			)
		})
	})
});
export const selectors = {
	emailInput: '[data-test="sign-in-email-input"]',
	signInPasswordInput: '[data-test="sign-in-password-input"]',
	signInSignInButton: '[data-test="sign-in-sign-in-button"]',
	root: '#root'
};
