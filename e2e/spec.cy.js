describe('Amazon LG Soundbar Search and Sort', () => {
  it('should search for LG soundbars, sort by price, and print results', () => {
    // Step 1: Open Amazon India
    cy.visit('https://www.flipkart.com/');

    // Step 2: Search for 'lg soundbar'
    cy.get('input[title="Search for Products, Brands and More"]').type('lg soundbar{enter}');

    // Step 3: Read product names and associated prices
    cy.wait(2000); // Adjust if necessary for network speed and page load

    const products = [];

    cy.get('(//div[contains(@class,"DOjaWF gdgoEp")])[2]').each(($el) => {
      const product = {};

      // Get product name
      cy.wrap($el)
        .find('h2 .a-link-normal')
        .invoke('text')
        .then((name) => {
          product.name = name.trim();

          // Get product price
          cy.wrap($el)
            .find('.a-price .a-offscreen')
            .invoke('text')
            .then((priceText) => {
              // Parse price or set to 0 if not available
              const price = priceText
                ? parseFloat(priceText.replace('₹', '').replace(',', ''))
                : 0;

              product.price = price;
              products.push(product);
            });
        });
    }).then(() => {
      // Ensure all elements are processed
      cy.wait(1000);

      // Sort products by price
      products.sort((a, b) => a.price - b.price);

      // Print sorted products
      products.forEach((product) => {
        cy.log(`Product: ${product.name}, Price: ₹${product.price}`);
      });
    });
  });
});