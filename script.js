import { Previewer } from 'pagedjs';

let paged = new Previewer();
let flow = paged.preview(DOMContent, ["style.css"], document.body).then((flow) => {
	console.log("Rendered", flow.total, "pages.");
})

/* import { CustomJSClient, HTML2PDF } from "@custom-js/sdk-js";

const client = new CustomJSClient("YOUR_API_KEY");
const html2pdf = new HTML2PDF(client);

const pdf = await html2pdf.convert({
  html: "\n<style>\n  body {\n    font-family: Arial, sans-serif;\n    font-size: 12pt;\n    line-height: 1.6;\n    margin: 0;\n    padding: 20px;\n    padding-bottom: 70px;\n  }\n  \n  h1 {\n    color: #2563eb;\n    font-size: 24pt;\n    margin-bottom: 20px;\n  }\n  \n  .page-break {\n    page-break-before: always;\n  }\n  \n  @media print {\n    .footer {\n      position: fixed;\n      bottom: 0;\n      left: 0;\n      right: 0;\n      height: 50px;\n      background: #f8f9fa;\n      border-top: 2px solid #dee2e6;\n      padding: 15px 20px;\n      font-size: 10pt;\n      color: #666;\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n    }\n  }\n</style>\n\n<script>\n  // This JavaScript runs BEFORE PDF generation\n  function addPageNumbers() {\n    // Calculate total pages (simplified - actual calculation more complex)\n    const pageHeight = 1056; // A4 page height in pixels at 96 DPI\n    const docHeight = document.body.scrollHeight;\n    const totalPages = Math.ceil(docHeight / pageHeight);\n    \n    // Update all footer page number placeholders\n    document.querySelectorAll('.page-number').forEach((el, index) => {\n      const currentPage = index + 1;\n      el.textContent = `Page ${currentPage} of ${totalPages}`;\n    });\n  }\n  \n  // Run before PDF generation\n  if (typeof window !== 'undefined') {\n    window.addEventListener('load', addPageNumbers);\n  }\n</script>\n\n<div>\n  <h1>JavaScript Page Numbers Approach</h1>\n  <p>\n    This approach uses JavaScript to dynamically calculate the total number of pages \n    and inject \"Page X of Y\" into footer elements before PDF generation.\n  </p>\n  \n  <p>\n    The JavaScript runs after the page loads, calculates the document height, \n    determines how many pages will be in the PDF, and updates all footer placeholders.\n  </p>\n  \n  <div class=\"page-break\"></div>\n  \n  <h2>Page 2 Content</h2>\n  <p>\n    Notice how each footer shows the correct page number and total page count. \n    This is possible because JavaScript calculated these values before the PDF was generated.\n  </p>\n  \n  <p>\n    This approach works perfectly with Chrome Headless, Puppeteer, and CustomJS, \n    as you can control when the JavaScript runs relative to PDF generation.\n  </p>\n  \n  <div class=\"page-break\"></div>\n  \n  <h2>Page 3 Content</h2>\n  <p>\n    On the final page, the footer correctly shows \"Page 3 of 3\". The JavaScript \n    accurately counted all pages and distributed the page numbers accordingly.\n  </p>\n</div>\n\n<div class=\"footer\">\n  <span>My Company © 2025</span>\n  <span class=\"page-number\">Page 1 of 3</span>\n  <span>Confidential</span>\n</div>\n",
  config: {
  "pdfWidthMm": 170,
  "pdfHeightMm": 270,
}
}); */

window.addEventListener('load', () => {
    gridDefine();
});

window.addEventListener('beforeprint', () => {
    printResize();
    printTextSizing();
});

window.addEventListener('afterprint', () => {
    normalTextSizing();
    gridDefine();
});

let display = 0

function gridDefine() {
    const root = document.getElementById('container-root');
    const info = document.getElementById('abajo-info');
    const width = window.innerWidth;
    const height = window.innerHeight;
    columnNumber = 8;
    rowNumber = 8;

    columnSize = Math.floor(width / columnNumber) -6;
    row = Math.floor(height / rowNumber) -6;

    marginSize = row * Math.round(rowNumber / 3);

    root.style.gridTemplateColumns = `repeat(${columnNumber}, ${columnSize}px)`;
    root.style.gridTemplateRows = `repeat(${rowNumber}, ${row}px)`;

    info.style.marginTop = `${marginSize}px`;

    console.log(`Grid defined: ${columnSize}px columns, ${row}px rows`);
    console.log(`Margin defined: ${marginSize}px`);
}

function normalTextSizing() {
    let container = document.getElementById("text-center");
    let paragraph = document.getElementsByTagName("p")

    for (let i = 0; i < paragraph.length; i++) {
        paragraph[i].style.fontSize = "0.92em"
    }

    container.style.gridArea = "1 / 3 / 8 / 7";        
}

function printResize() {
    const root = document.getElementById('container-root');
    const width = 17;
    const height = 27;
    columnNumber = 8;
    rowNumber = 8;

    columnSize = Math.floor(width / columnNumber);
    row = Math.floor(height / rowNumber);

    root.style.gridTemplateColumns = `repeat(${columnNumber}, ${columnSize}cm)`;
    root.style.gridTemplateRows = `repeat(${rowNumber}, ${row}cm)`;

    console.log(`Grid defined: ${columnSize}cm columns, ${row}cm rows`);
}

function printTextSizing() {
    let container = document.getElementById("text-center");
    let where = document.getElementById(textosComplete[1].where);
    let paragraph = document.getElementsByTagName("p");
    let colophon = document.getElementById('colophon-show');
    
    /* for (let i = 1; i < textosComplete.length; i++) {
        let where = document.getElementById(textosComplete[i].where);
        where.style.display = "block";
    } */

    for (let i = 0; i < paragraph.length; i++) {
        paragraph[i].style.fontSize = "1.2em"
    } 

    where.style.display = "block";
    colophon.style.display = "block";
    container.style.gridArea = "1 / 1 / 8 / 9";
}


function revealInfierno() {
    let container = document.getElementById("text-center");
    let where = document.getElementById(textosComplete[1].where);
    let author = document.getElementById('infierno-auth')
    let colonnes = document.getElementById("colonnes")

    if (display === 0) {
        where.style.display = "block";
        author.style.display = "block";
        colonnes.style.marginBottom = "0.5em"
        container.style.gridArea = "1 / 3 / 8 / 7";
        display ++
    } else {
        where.style.display = "none";
        author.style.display = "none";
        colonnes.style.marginBottom = "0em"
        container.style.gridArea = "4 / 4 / 6 / 6";
        display --
    }
}

const textosComplete = {
    '1' : {
        where: 'infierno-fill',
    }
}