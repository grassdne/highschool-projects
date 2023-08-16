
/****************************************************/

const cover = document.getElementById("article-cover");
const coverBuffer = document.getElementById("cover-buffer");
const gradient = document.getElementById("gradient-bg");

window.onresize = function() {
    coverBuffer.style.height = `${cover.clientHeight}px`;
}
window.onresize();

window.onload = window.onresize;

const video = document.getElementById("header-video");
window.onscroll = (e) => {
    cover.style.opacity = Math.min(1, 1 / (window.scrollY / 400));
    if (window.scrollY > window.innerHeight / 3 + gradient.clientHeight) {
        video.pause();
    } else if (video.paused) {
        video.play();
    }
}

/****************************************************/

const stickers = document.getElementsByClassName("clinger");
for (let i = 0; i < stickers.length; ++i) {
    elem = stickers[i];
    otherId = elem.getAttribute("clingto");
    if (otherId == null) {
        console.log("clinger has no clingto attribute ", elem);
        continue;
    }
    other = document.getElementById(otherId);
    if (other == null) {
        console.log("could not find clingto element of id ", otherId);
        continue;
    }

    elem.style.top = (other.getBoundingClientRect().top + window.pageYOffset) + "px";
}

/****************************************************/

const sectionHeaders = document.querySelectorAll(".outline, .section-head");
const outline = document.getElementById("outline");

let focusedHeader = null;

for (let i = 0; i < sectionHeaders.length; ++i) {
    const headerElem = sectionHeaders[i];
    
    const link = document.createElement("a");
    headerElem.id ||= headerElem.innerText.replaceAll(/\s/g, "-").replaceAll(/[,.]/g, "").toLowerCase();

    link.href = "#" + headerElem.id;
    link.innerText = headerElem.getAttribute("outlinetitle") || headerElem.innerText;

    outline.appendChild(link);

    document.addEventListener("scroll", () => {
        if (headerElem !== focusedHeader && headerInFocus(headerElem, focusedHeader)) {
            focusedHeader = link;
        }
    });
}

document.addEventListener("scroll", () => {
    if (focusedHeader === null) {
        outline.scrollTo(0, 0);
        return;
    }
    if (focusedHeader.href != window.location.href) {
        history.replaceState(undefined, undefined, focusedHeader.href);
    }
    eraseClass("outline-focused");
    focusedHeader.classList.add("outline-focused");
    // focusedHeader.scrollIntoView({block: "center", inline: "nearest", behavior: "smooth"})
    // for some reason scrollIntoView doesn't recognize sticky scroll parenth when block: "center"

    outline.scrollTo({
        behavior: "auto", 
        top: focusedHeader.offsetTop + focusedHeader.clientHeight / 2 - outline.clientHeight / 2,
    })
})

document.dispatchEvent(new Event("scroll"));

function eraseClass(className) {
    const elements = document.getElementsByClassName(className);
    for (let i = 0; i < elements.length; ++i) {
        const elem = elements[i];
        elem.classList.remove("outline-focused")
    }
}

function headerInFocus(header, currentFocus) {
    const headerBottom = header.getBoundingClientRect().bottom;
    const currentBottom = currentFocus?.getBoundingClientRect()?.bottom ?? -1;
    
    return inTopHalfOfScreen(headerBottom) && (currentBottom < 0 || headerBottom < currentBottom)
}

function inTopHalfOfScreen(y) {
    return y > 0 && y < window.innerHeight / 2
}


/****************************************************/

const input = document.getElementById("input-example");
const output = document.getElementById("output-example");
input.oninput = function () {
    output.innerHTML = input.value;
}
/****************************************************/

