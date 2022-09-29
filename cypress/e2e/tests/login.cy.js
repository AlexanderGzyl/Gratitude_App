///<reference types="cypress"/>

import Chance from "chance";
const chance = new Chance()

describe('login',()=>{
    const email = chance.email();
    const pass = 'Valid';

    beforeEach(()=>{
        cy.visit('http://localhost:3000/login');
    })
    it('has a title', ()=>{
        cy.contains('Gratitude');
    })

    it('blocks protected routes',()=>{
        cy.get('a[href="/"]').click();
        cy.wait(500);
        cy.url().should('eq', 'http://localhost:3000/login');
    })

    it('user login',()=>{
        cy.get('input[name=email]').type("hans@gmail.com");
        cy.get('input[name=password]').type("1234");
        cy.get('button[type=submit]').click();
        cy.wait(500);
        cy.url().should('eq', 'http://localhost:3000/');
        cy.contains("hans")
        cy.contains("Logout").click()
    })

    

})