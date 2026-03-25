window.addEventListener('load', () => {
    gridDefine();
});

/* window.addEventListener('beforeprint', () => {
    printResize();
    printTextSizing();
});

window.addEventListener('afterprint', () => {
    normalTextSizing();
    gridDefine();
}); */

let display = 0
i = 0
resetCalled = 0
time = 150

function gridDefine() {
    const root = document.getElementById('container-root');
    const info = document.getElementById('abajo-info');
    const width = window.innerWidth;
    const height = window.innerHeight;
    columnNumber = 8;
    rowNumber = 8;

    columnSize = Math.floor(width / columnNumber) -6;
    row = Math.floor(height / rowNumber) -6;

    marginSize = Math.floor(row * 3.5);

    root.style.gridTemplateColumns = `repeat(${columnNumber}, ${columnSize}px)`;
    root.style.gridTemplateRows = `repeat(${rowNumber}, ${row}px)`;

    info.style.marginTop = `${marginSize}px`;

    console.log(`Grid defined: ${columnSize}px columns, ${row}px rows`);
    console.log(`Margin defined: ${marginSize}px`);
}

function reset() {
    resetCalled ++
    i = 0
    time = 150
    img = document.getElementById("gif")
    img.src = ""
}

function ornamentInfierno() {
    if (display === 0) {
        if (i === 0) {
                resets = resetCalled
            }

            img = document.getElementById("gif")
            img.src = `gif/infierno/${i}.jpg`

            setTimeout(() => {
                i ++
                if (i < 17){
                    if (resets != resetCalled) {
                        i = 0
                        img.src = ""
                    } else {
                        time -= i
                        ornamentInfierno()
                    }    
                }
                }, time);
                console.log(i)
    } else {
        return
    }
}

function normalTextSizing() {
    let container = document.getElementById("text-center");
    let paragraph = document.getElementsByTagName("p")

    for (let i = 0; i < paragraph.length; i++) {
        paragraph[i].style.fontSize = "0.92em"
    }

    container.style.gridArea = "1 / 3 / 8 / 7";        
}

/* function printResize() {
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
    } 

    for (let i = 0; i < paragraph.length; i++) {
        paragraph[i].style.fontSize = "1.2em"
    } 

    where.style.display = "block";
    colophon.style.display = "block";
    container.style.gridArea = "1 / 1 / 8 / 9";
} */


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