/// <reference types="Cypress" />
describe("catalog browsing filters for mobile phones", function() {

    //load the page
    it("load catalog browsing" , function() {
       cy.visit("https://www.optus.com.au/mobile/phones"); 
    })

    // how to interact with elements and 
    //here to fins how many elements of same div class are present on screen
    it("choose samsung option from brand filter", () => {
        cy.get(':nth-child(1) > .UxShopProductFilterstyle__DropDownLink-sc-17ci9tm-2').click();        
        cy.get('[aria-label="Samsung"] > .option-text').click();
        cy.wait(500);// we can aslo put the wait forcefully for any reason
        cy.get('.MobileDevicestyle__UxProductImageCard-sc-13i2889-15').should('have.length.greaterThan', 4)
        
        cy.get('h4.MobileDevicestyle__Title-sc-13i2889-6')
        .should('contain.text', 'Galaxy S20 Ultra 5G');
        
    })
    // failing case 
    // Due to tracking of each test command was able to detect root cause
    // it("select  'Galaxy S20 Ultra 5G' device ", () => {
        
    //     cy.get('.MobileListingstyle__UxProductListContainer-sc-8fl4ta-3')
    //     .find('.MobileDevicestyle__UxProductImageCard-sc-13i2889-15')
    //     .then(($planTile) => {
    //         console.log('$planTile', $planTile)
    //         if(cy.wrap($planTile).find('h4.MobileDevicestyle__Title-sc-13i2889-6').contains('Galaxy S20 Ultra 5G')) {
    //             console.log('correct', $planTile)
    //             cy.wrap($planTile).contains('SELECT DEVICE').click()
    //         }
            
    //  })

    // here we can see how to fins specific child in parent and click any 
    //element in that found child
     it("select  'Galaxy S20 Ultra 5G' device ", () => {
        
        cy.get('.MobileListingstyle__UxProductListContainer-sc-8fl4ta-3')
        .find('.MobileDevicestyle__UxProductImageCard-sc-13i2889-15')
        .each(($el, index) => {
            console.log('$el', $el)
            const deviceName = $el.find('h4.MobileDevicestyle__Title-sc-13i2889-6').text();
            console.log('deviceName', deviceName)
            if(deviceName === 'Galaxy S20 Ultra 5G') {
                console.log(' corrrect deviceName', deviceName)
                //here $el will be simple HTML element 
                // by wrapping it with cy we can use all cypress commands
                // on this
                cy.wrap($el).contains('SELECT DEVICE').click()
            }
            
        })
            
     })
      
       
        // cy.get('.MobileDevicestyle__UxProductImageCard-sc-13i2889-15').should('have.length.greaterThan', 4)
        
        // cy.get('h4.MobileDevicestyle__Title-sc-13i2889-6')
        // .should('contain.text', 'Galaxy S20 Ultra 5G');
        
    
    
})