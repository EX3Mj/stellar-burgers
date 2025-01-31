describe('constructor test', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    });
    cy.visit('/');
  });

  it('app should be available at localhost:4000', function () {
    cy.visit('/');
  });

  describe('add any ingredient in constructor', () => {
    it('add bun', () => {
      cy.get('div').contains('Выберите булки').should('exist');
      cy.get('[data-cy="bun"]').contains('Добавить').click();
      cy.get('div').contains('Выберите булки').should('not.exist');
    });

    it('add main / sauce', () => {
      cy.get('div').contains('Выберите начинку').should('exist');
      cy.get('[data-cy="main"]').contains('Добавить').click();
      cy.get('[data-cy="sauce"]').contains('Добавить').click();
      cy.get('div').contains('Выберите начинку').should('not.exist');
    });
  });

  describe('test modal window open / close', () => {
    beforeEach(() => {
      cy.get('[data-cy="modal"]').should('not.exist');
      cy.get('[data-cy="main"]').first().click();
      cy.get('[data-cy="modal"]').as('modal').should('be.visible');
    });

    it('modal is opened with ingredient detail', () => {
      cy.contains('Детали ингредиента').should('exist');
    });

    it('modal closed by button', () => {
      cy.get('@modal').should('be.visible');
      cy.get('[data-cy="modal-close"]').click();
      cy.get('@modal').should('not.exist');
    });
    it('modal closed by overlay click', () => {
      cy.get('@modal').should('be.visible');
      cy.get('[data-cy="modal-overlay"]').click({ force: true });
      cy.get('@modal').should('not.exist');
    });
  });

  describe('test order', () => {
    beforeEach(() => {
      cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
      cy.setCookie('accessToken', 'testaccesstoken');
      localStorage.setItem('refreshToken', 'testrefreshtoken');
      cy.visit('/');
    });

    afterEach(() => {
      cy.setCookie('accessToken', '');
      localStorage.setItem('refreshToken', '');
    });

    it('test order create', () => {
      cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('createOrder');
      cy.get('[data-cy="bun"]').contains('Добавить').click();
      cy.get('[data-cy="main"]').contains('Добавить').click();
      cy.get('[data-cy="sauce"]').contains('Добавить').click();
      cy.contains('Оформить заказ').click();
      cy.wait('@createOrder').then((interception) => {
        const responseBody = interception.response.body;
        expect(responseBody.order.number).to.equal(67224);
      });
      cy.get('[data-cy="modal"]').should('be.visible').as('modal');
      cy.get('@modal').contains('67224').should('exist');
      cy.get('[data-cy="modal-close"]').click();
      cy.get('@modal').should('not.exist');
      cy.get('div').contains('Выберите булки').should('exist');
      cy.get('div').contains('Выберите начинку').should('exist');
    });
  });
});
