const loginUrl = 'https://www.ebay.com/';
const fs = require('fs');
const { expect } = require('chai');

describe('User should be able to see items', () => {
    it.only('should Loop through all items once and verify all things inside the loop', () => {
        // Navigate to ebay.com
        browser.url(loginUrl);
        const urlLink = browser.getUrl();
        expect(urlLink).to.equal('https://www.ebay.com/')

        // Type in “test” in a search textbox
        const typeTest = 'test';
        const searchField = $('#gh-ac');
        searchField.setValue(typeTest);

        // Click Search button
        const searchBtn = $('#gh-btn');
        searchBtn.click();
        const searchResults = $('.srp-controls__count-heading').getText();
        expect(searchResults).to.contain('test');
        
        // Verify that 50 results appear on the results page
        const productCardHeader = $$('//*[@id="srp-river-results"]/ul/li/div');
        browser.waitUntil(() => {
            return productCardHeader.map((elem) => elem.isDisplayed()).length >= 50;
        }, { timeout: 5000, timeoutMsg: 'Less then 50 products displayed' });

        // Verify that each result contains title with length of 5+ characters
         const productTitle = [];
         productCardHeader.forEach(element => {
                productTitle.push({
                    productTitleText: element.$('h3').getText(),
                })
             })
            
            productTitle.forEach(element => {
                expect(element.productTitleText.length).to.be.above(5);
            });

        // Verify that each price is a number with a dollar sign in the front of it
        const productTitlePrice = [];
        productCardHeader.forEach(element => {
            expect(element.$('[class="s-item__price"]').getText()).to.be.include('$');
            expect(parseInt(element.$('[class="s-item__price"]').getText())).to.be.a('number');
            })
        })
    })
