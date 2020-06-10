"use strict";
const grid = [null];
var str;
var size = 50;
var k = 1;
const flags = [];
const game = document.getElementById("game");
var l = 0;
var m = 0;
function start() {
    str = '<table style="width:' + (24 * size) + 'px">';
    k = 1;
    l = 0;
    m = 0;
    for (let i = 1; i <= size * size; i++) {
        grid[i] = 0;
        flags[i] = 0;
        str += '<td id="space' + i + '" onclick="uncover(' + i + ')" oncontextmenu="flag(' + i + ');return false">/</td>';
        if (i % size === 0) {
            for (let j = 0; j <= size; j++) {
                if (size * j === i) {
                    str += '</tr><tr>';
                }
            }
        }
    }
    game.innerHTML = (str + '</tr></table>');
    for (let i = 0; i <= (size * size) / 6;) {
        let j = Math.floor(Math.random() * (size * size));
        if (grid[j] === 0) {
            grid[j] = 1;
            i++;
            m++;
        }
    }
}
function win() {
    if (k + m === size * size) {
        console.log(0);
        document.getElementsByTagName("TABLE")[0].insertAdjacentHTML("beforebegin", "<p>YOU WIN</p><br>");
        for (let j = 1; j <= size * size; j++) {
            if (grid[j] === 1) {
                document.getElementById("space" + j).innerHTML = "B";
            }
        }
        l = 1;
    }
}
function flag(i) {
    if (l === 0 && grid[i] !== 2) {
        const space = document.getElementById("space" + i);
        if (flags[i] === 0) {
            flags[i] = 1;
            space.innerHTML = "&#128681;";
        } else if (flags[i] === 1) {
            flags[i] = 0;
            space.innerHTML = "/";
        }
    }
}
function uncover(i) {
    let h = 0;
    const space = document.getElementById("space" + i);
    if (grid[i] !== 2 && flags[i] === 0 && l === 0) {
        k++;
        if (grid[i] === 1) {
            document.getElementsByTagName("TABLE")[0].insertAdjacentHTML("beforebegin", "<p>YOU LOSE</p>")
            for (let j = 1; j <= size * size; j++) {
                if (grid[j] === 1 || grid[j] === 4) {
                    document.getElementById("space" + j).innerHTML = "&#128169;";
                }
            }
            l = 1;
            return;
        } else if (i === 1) {
            if (grid[i + 1] === 1) {
                h++;
            }
            if (grid[i + size] === 1) {
                h++;
            }
            if (grid[i + size + 1] === 1) {
                h++;
            }
            if (h === 0) {
                grid[i] = 2;
                uncover(i + 1);
                uncover(i + size);
                uncover(i + size + 1);
                space.innerHTML = " ";
            } else {
                space.innerHTML = h;
            }
            grid[i] = 2;
            space.style.backgroundColor = "white";
            win();
            return;
        } else if (i === size) {
            if (grid[i - 1] === 1) {
                h++;
            }
            if (grid[i + size] === 1) {
                h++;
            }
            if (grid[i + size - 1] === 1) {
                h++;
            }
            if (h === 0) {
                grid[i] = 2;
                uncover(i - 1);
                uncover(i + size);
                uncover(i + size - 1);
                space.innerHTML = " ";
            } else {
                space.innerHTML = h;
            }
            grid[i] = 2;
            space.style.backgroundColor = "white";
            win();
            return;
        } else if (i === (size * size) - size + 1) {
            if (grid[i + 1] === 1) {
                h++;
            }
            if (grid[i - size] === 1) {
                h++;
            }
            if (grid[i - size + 1] === 1) {
                h++;
            }
            if (h === 0) {
                grid[i] = 2;
                uncover(i + 1);
                uncover(i - size);
                uncover(i - size + 1);
                space.innerHTML = " ";
            } else {
                space.innerHTML = h;
            }
            grid[i] = 2;
            space.style.backgroundColor = "white";
            win();
            return;
        } else if (i === size * size) {
            if (grid[i - 1] === 1) {
                h++;
            }
            if (grid[i - size] === 1) {
                h++;
            }
            if (grid[i - size - 1] === 1) {
                h++;
            }
            if (h === 0) {
                grid[i] = 2;
                uncover(i - 1);
                uncover(i - size);
                uncover(i - size - 1);
                space.innerHTML = " ";
            } else {
                space.innerHTML = h;
            }
            grid[i] = 2;
            space.style.backgroundColor = "white";
            win();
            return;
        } else if ((i - 1) % size === 0) {
            if (grid[i - size] === 1) {
                h++;
            }
            if (grid[i - size + 1] === 1) {
                h++;
            }
            if (grid[i + 1] === 1) {
                h++;
            }
            if (grid[i + size] === 1) {
                h++;
            }
            if (grid[i + size + 1] === 1) {
                h++;
            }
            if (h === 0) {
                grid[i] = 2;
                uncover(i - size);
                uncover(i - size + 1);
                uncover(i + 1);
                uncover(i + size);
                uncover(i + size + 1);
                space.innerHTML = " ";
            } else {
                space.innerHTML = h;
            }
            grid[i] = 2;
            space.style.backgroundColor = "white";
            win();
            return;
        } else if (i % size === 0) {
            if (grid[i - size] === 1) {
                h++;
            }
            if (grid[i - size - 1] === 1) {
                h++;
            }
            if (grid[i - 1] === 1) {
                h++;
            }
            if (grid[i + size] === 1) {
                h++;
            }
            if (grid[i + size - 1] === 1) {
                h++;
            }
            if (h === 0) {
                grid[i] = 2;
                uncover(i - size);
                uncover(i - size - 1);
                uncover(i - 1);
                uncover(i + size);
                uncover(i + size - 1);
                space.innerHTML = " ";
            } else {
                space.innerHTML = h;
            }
            grid[i] = 2;
            space.style.backgroundColor = "white";
            win();
            return;
        } else if (i < size) {
            if (grid[i - 1] === 1) {
                h++;
            }
            if (grid[i + 1] === 1) {
                h++;
            }
            if (grid[i + size] === 1) {
                h++;
            }
            if (grid[i + size - 1] === 1) {
                h++;
            }
            if (grid[i + size + 1] === 1) {
                h++;
            }
            if (h === 0) {
                grid[i] = 2;
                uncover(i - 1);
                uncover(i + 1);
                uncover(i + size);
                uncover(i + size - 1);
                uncover(i + size + 1);
                space.innerHTML = " ";
            } else {
                space.innerHTML = h;
            }
            grid[i] = 2;
            space.style.backgroundColor = "white";
            win();
            return;
        } else if (i > (size * size) - size + 1) {
            if (grid[i - size] === 1) {
                h++;
            }
            if (grid[i - size - 1] === 1) {
                h++;
            }
            if (grid[i - size + 1] === 1) {
                h++;
            }
            if (grid[i - 1] === 1) {
                h++;
            }
            if (grid[i + 1] === 1) {
                h++;
            }
            if (h === 0) {
                grid[i] = 2;
                uncover(i - size);
                uncover(i - size - 1);
                uncover(i - size + 1);
                uncover(i - 1);
                uncover(i + 1);
                space.innerHTML = " ";
            } else {
                space.innerHTML = h;
            }
            grid[i] = 2;
            space.style.backgroundColor = "white";
            win();
            return;
        } else {
            if (grid[i - size] === 1) {
                h++;
            }
            if (grid[i - size - 1] === 1) {
                h++;
            }
            if (grid[i - size + 1] === 1) {
                h++;
            }
            if (grid[i - 1] === 1) {
                h++;
            }
            if (grid[i + 1] === 1) {
                h++;
            }
            if (grid[i + size] === 1) {
                h++;
            }
            if (grid[i + size - 1] === 1) {
                h++;
            }
            if (grid[i + size + 1] === 1) {
                h++;
            }
            if (h === 0) {
                grid[i] = 2;
                uncover(i - size);
                uncover(i - size - 1);
                uncover(i - size + 1);
                uncover(i - 1);
                uncover(i + 1);
                uncover(i + size);
                uncover(i + size - 1);
                uncover(i + size + 1);
                space.innerHTML = " ";
            } else {
                space.innerHTML = h;
            }
            grid[i] = 2;
            space.style.backgroundColor = "white";
            win();
            return;
        }
    }
}
