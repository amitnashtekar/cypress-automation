/// <reference types="Cypress" />




// can use nested describe block
// will helpful trick to skip beforeach for some tests
describe("visit catalog browsing", function () {
    //it will run only once.
    //here we filterted samsung which will be applicable to all test cases
    before(() => {
        cy.visit("https://www.optus.com.au/mobile/phones")
        cy.get(':nth-child(1) > .UxShopProductFilterstyle__DropDownLink-sc-17ci9tm-2').click();
        cy.get('[aria-label="Samsung"] > .option-text').click();

    })

    describe("catalog browsing filters for mobile phones", () => {
        //this will run before each test block
        //we are storing planTIles so can be shared across test cases
        // also see the diffrence between console.log and cy.log
        beforeEach(() => {
            cy.get('.MobileListingstyle__UxProductListContainer-sc-8fl4ta-3')
                .find('.MobileDevicestyle__UxProductImageCard-sc-13i2889-15')
                .as('planTiles');
            cy.log('@planTiles')
        })


        // how to interact with elements and 
        //here to fins how many elements of same div class are present on screen
        it("choose samsung option from brand filter", () => {

            cy.get('@planTiles').should('have.length.greaterThan', 4)

            cy.get('h4.MobileDevicestyle__Title-sc-13i2889-6')
                .should('contain.text', 'Galaxy S20 Ultra 5G');

        })


        // here we can see how to fins specific child in parent and click any 
        //element in that found child
        it("select  'Galaxy S20 Ultra 5G' device ", () => {

            cy.get('@planTiles')

                .each(($el, index) => {
                    console.log('$el', $el)
                    const deviceName = $el.find('h4.MobileDevicestyle__Title-sc-13i2889-6').text();
                    console.log('deviceName', deviceName)
                    if (deviceName === 'Galaxy S20 Ultra 5G') {
                        console.log(' corrrect deviceName', deviceName)

                        expect(deviceName).to.equal('Galaxy S20 Ultra 5G')
                        //here $el will be simple HTML element 
                        // by wrapping it with cy we can use all cypress commands
                        // on this
                        cy.wrap($el).as('galaxyS20Ultra');

                    }

                })

            // so here Now using cy.get('@galaxyS20Ultra')
            // we can check all of the elelents without going further down
            // Though $55, .52, per month in deffirent elelnts 
            //it checcked it automatically
            cy.get('@galaxyS20Ultra').contains('$55.52')
            cy.get('@galaxyS20Ultra').contains('SELECT DEVICE').click()

        })

        

    })

    // now this describe will not have preveous page beforEach 
    // so will not fail here
    describe('redirection to device detail page',() => {

        it("user is redirected to correct device detail page", () => {
            cy.location().should((loc) => {
                expect(loc.href).to.include('mobile/phones/samsung/gs20-ultra-5g');
                expect(loc.search).to.eq('?contractLength=36')
                expect(loc.href).to.eq('https://www.optus.com.au/mobile/phones/samsung/gs20-ultra-5g?contractLength=36')
            })
            
        })

    })


})