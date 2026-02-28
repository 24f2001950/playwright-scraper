const { chromium } = require('playwright');

(async () => {
  // Launch the browser
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // List of URLs we need to visit
  const urls = [
    'https://sanand0.github.io/tdsdata/js_table/?seed=48',
    'https://sanand0.github.io/tdsdata/js_table/?seed=49',
    'https://sanand0.github.io/tdsdata/js_table/?seed=50',
    'https://sanand0.github.io/tdsdata/js_table/?seed=51',
    'https://sanand0.github.io/tdsdata/js_table/?seed=52',
    'https://sanand0.github.io/tdsdata/js_table/?seed=53',
    'https://sanand0.github.io/tdsdata/js_table/?seed=54',
    'https://sanand0.github.io/tdsdata/js_table/?seed=55',
    'https://sanand0.github.io/tdsdata/js_table/?seed=56',
    'https://sanand0.github.io/tdsdata/js_table/?seed=57'
  ];

  let totalSum = 0;

  for (const url of urls) {
    // Navigate to the page
    await page.goto(url, { waitUntil: 'load' });
    
    // Wait for the table to appear dynamically
    await page.waitForSelector('table', { state: 'attached', timeout: 30000 });
    
    // Evaluate runs JavaScript inside the browser page to sum numbers
    const pageSum = await page.evaluate(() => {
      let sum = 0;
      // Find all cells inside the table
      const cells = document.querySelectorAll('table td, table th');
      
      cells.forEach(cell => {
        // Extract text and convert to a number
        const num = parseFloat(cell.innerText || cell.textContent);
        if (!isNaN(num)) {
          sum += num;
        }
      });
      return sum;
    });

    console.log(`Sum for Seed ${url.split('=')[1]}: ${pageSum}`);
    totalSum += pageSum;
  }

  // Print final sum
  console.log(`\n=================================`);
  console.log(`TOTAL SUM: ${totalSum}`);
  console.log(`=================================\n`);
  
  await browser.close();
})();
