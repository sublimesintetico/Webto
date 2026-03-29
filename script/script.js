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
called = 0
resetCalled = 0
time = 150
text = ""

const langues = ["esp", "fr", "eng"]
let currentLangue = 0

const ornaments = ["infierno", "mas"]
let currentOrnament = 0


function gridDefine() {
    const root = document.getElementById('container-root');
    const info = document.getElementById('abajo-info-' + langues[currentLangue]);
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
    console.log("Reset Called")
    img = document.getElementById("gif")
    title = document.getElementById("title-infierno")

    /* if (title.addEventListener("mouseover", () => {
        i = 0
        resetCalled ++
        time = 150
        img.src = ""
        return
    })) */

        if (called === 1) {
                resets = resetCalled
                resetCalled = 0
                time = 150
            }

            setTimeout(() => {
                if (i > 0){
                        img = document.getElementById("gif")
                        img.src = `gif/${ornaments[currentOrnament]}/${i}.jpg`
                        i --
                        time -= i
                        resetCalled ++
                        called = 0
                        reset()   
                } else {
                    time = 150
                    img = document.getElementById("gif")
                    img.src = ''
                    resetCalled = 0
                    return
                }
                }, time);
                console.log(i)
}

function espReveal() {
    currentLangue = 0
    langueReveal()
}

function frReveal() {
    currentLangue = 1
    langueReveal()
}

function engReveal() {
    currentLangue = 2
    langueReveal()
}

function langueReveal() {
    gridDefine()
    let container = document.getElementById("text-center-" + langues[currentLangue])
    console.log("text-center-" + langues[currentLangue])
    container.style.display = "block"

    if (currentLangue === 0) {
        let autre1 = document.getElementById("text-center-" + langues[currentLangue + 1])
        let autre2 = document.getElementById("text-center-" + langues[currentLangue + 2])
        autre1.style.display = "none"
        autre2.style.display = "none"
    } if (currentLangue === 1) {
        let autre1 = document.getElementById("text-center-" + langues[currentLangue - 1])
        let autre2 = document.getElementById("text-center-" + langues[currentLangue + 1])
        autre1.style.display = "none"
        autre2.style.display = "none"
    } if (currentLangue === 2) {
        let autre1 = document.getElementById("text-center-" + langues[currentLangue - 1])
        let autre2 = document.getElementById("text-center-" + langues[currentLangue - 2])
        autre1.style.display = "none"
        autre2.style.display = "none"
    } else {
        return
    }
}

function ornamentInfierno() {
    currentOrnament = 0

    title = document.getElementById("title-infierno")

    if (display === 0) {
        if (called === 0) {
                resets = resetCalled
                resetCalled = 0
            }

            setTimeout(() => {
                i ++
                if (i < 16){
                    if (resets != resetCalled) {
                        called = 0
                        return
                    } else {
                        img = document.getElementById("gif")
                        img.src = `gif/infierno/${i}.jpg`
                        time -= i
                        called = 1
                        ornamentInfierno()
                    }    
                }
                }, time);
                console.log(i)
    } else {
        return
    }
}

function ornamentMas() {
    currentOrnament = 1

    title = document.getElementById("title-infierno")

    if (display === 0) {
        if (called === 0) {
                resets = resetCalled
                resetCalled = 0
            }

            setTimeout(() => {
                i ++
                if (i < 14){
                    if (resets != resetCalled) {
                        called = 0
                        return
                    } else {
                        img = document.getElementById("gif")
                        img.src = `gif/mas/${i}.jpg`
                        time -= i
                        called = 1
                        ornamentMas()
                    }    
                }
                }, time);
                console.log(i)
    } else {
        return
    }
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
    text = "infierno"
    revealer()
}

function revealer() {
    reset()

    let container = document.getElementById("text-center-" + langues[currentLangue]);
    let where = document.getElementById(text + "-" + langues[currentLangue]);
    let colonnes = document.getElementById("colonnes")

    if (display === 0) {
        where.style.display = "block";
        colonnes.style.marginBottom = "0.5em"
        container.style.gridArea = "1 / 3 / 8 / 7";
        display ++
    } else {
        where.style.display = "none";
        colonnes.style.marginBottom = "0em"
        container.style.gridArea = "4 / 4 / 6 / 6";
        display --
    }
}
