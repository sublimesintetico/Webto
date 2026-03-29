import { Previewer } from 'pagedjs';

let paged = new Previewer();
let flow = paged.preview(DOMContent, ["path/to/css/file.css"], document.body).then((flow) => {
	console.log("Rendered", flow.total, "pages.");
})

let display = 0

function gridDefine() {
    const root = document.getElementById('container-root');
    const width = window.innerWidth;
    const height = window.innerHeight;
    columnNumber = 8;
    rowNumber = 8;

    columnSize = Math.floor(width / columnNumber) -6;
    row = Math.floor(height / rowNumber) -6;

    root.style.gridTemplateColumns = `repeat(${columnNumber}, ${columnSize}px)`;
    root.style.gridTemplateRows = `repeat(${rowNumber}, ${row}px)`;

    console.log(`Grid defined: ${columnSize}px columns, ${row}px rows`);
}

function printResize() {
    const root = document.getElementById('container-root');
    const width = 17;
    const height = 27;
    columnNumber = 8;
    rowNumber = 8;

    columnSize = Math.floor(width / columnNumber) -0,3;
    row = Math.floor(height / rowNumber) -0,3;

    root.style.gridTemplateColumns = `repeat(${columnNumber}, ${columnSize}cm)`;
    root.style.gridTemplateRows = `repeat(${rowNumber}, ${row}cm)`;

    console.log(`Grid defined: ${columnSize}px columns, ${row}px rows`);
}

window.addEventListener('load', () => {
    gridDefine();
});

window.addEventListener('beforeprint', () => {
    printResize();
});

function revealInfierno() {
    let container = document.getElementById("text-center");
    let where = document.getElementById(textosComplete[1].where);
    let colonnes = document.getElementById("colonnes")

    if (display === 0) {
        where.style.display = "inherit";
        colonnes.style.marginBottom = "0.5em"
        display ++
    } else {
        where.style.display = "none";
        colonnes.style.marginBottom = "0em"
        
        display --
    }
}

const textosComplete = {
    '1' : {
        where: 'infierno-fill',
    }
}