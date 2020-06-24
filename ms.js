"use strict";
const grid = [null];
var str;
var size = 25;
var k = 1;
const flags = [];
const game = document.getElementById("game");
const watch = document.getElementById("watch");
const winLose = document.getElementById("winLose");
var l = 0;
var m = 0;
var watchStart;
var watchInt;
function start() {
    watchStart = Date.now();
    watchInt = setInterval(function () { var watchNow = Date.now(); var watchHr = Math.floor((watchNow - watchStart) / 3600000); var watchMin = (Math.floor((watchNow - watchStart) / 60000) % 60); var watchSec = (Math.floor((watchNow - watchStart) / 1000) % 60); var watchMil = watchNow % 1000; watch.innerHTML = ((watchHr >= 10) ? watchHr : '0' + watchHr) + ':' + ((watchMin >= 10) ? watchMin : '0' + watchMin) + ':' + ((watchSec >= 10) ? watchSec : '0' + watchSec) + '.' + ((watchMil >= 10) ? ((watchMil >= 100) ? watchMil : '0' + watchMil) : '00' + watchMil); }, 1);
    winLose.innerHTML = "<br>";
    str = '<table style="width:' + (22.4 * size) + 'px">';
    k = 1;
    l = 0;
    m = 0;
    for (let i = 1; i <= size * size; i++) {
        grid[i] = 0;
        flags[i] = 0;
        str += '<td id="space' + i + '" onclick="uncover(' + i + ')" oncontextmenu="flag(' + i + ');return false"><img src="mscover.png"></td>';
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
    document.getElementById("boardId").value = btoa(btoa(grid));
}
function loadGame() {
    start();
    var j = atob(atob(document.getElementById("loadBoard").value)).split(',');
    for (let i = 1; i < j.length; i++) {
        grid[i] = parseInt(j[i]);
    }
}
function win() {
    if (k + m - 1 === size * size) {
        clearInterval(watchInt);
        winLose.innerHTML = "YOU WIN";
        for (let j = 1; j <= size * size; j++) {
            if (grid[j] === 1) {
                document.getElementById("space" + j).innerHTML = "<img src='msbomb.png'></img>";
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
            space.innerHTML = "<img src='msflag.png'>";
        } else if (flags[i] === 1) {
            flags[i] = 0;
            space.innerHTML = "<img src='mscover.png'>";
        }
    }
}
function uncover(i) {
    let h = 0;
    const space = document.getElementById("space" + i);
    if (grid[i] !== 2 && flags[i] === 0 && l === 0) {
        k++;
        if (grid[i] === 1) {
            clearInterval(watchInt);
            winLose.innerHTML = "YOU LOSE";
            for (let j = 1; j <= size * size; j++) {
                if (grid[j] === 1 || grid[j] === 4) {
                    document.getElementById("space" + j).innerHTML = "<img src='msbomb.png'>";
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
            }
            space.innerHTML = "<img src='ms" + h + ".png'>";
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
            }
            space.innerHTML = "<img src='ms" + h + ".png'>";
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
            }
            space.innerHTML = "<img src='ms" + h + ".png'>";
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
            }
            space.innerHTML = "<img src='ms" + h + ".png'>";
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
            }
            space.innerHTML = "<img src='ms" + h + ".png'>";
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
            }
            space.innerHTML = "<img src='ms" + h + ".png'>";
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
            }
            space.innerHTML = "<img src='ms" + h + ".png'>";
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
            }
            space.innerHTML = "<img src='ms" + h + ".png'>";
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
            }
            space.innerHTML = "<img src='ms" + h + ".png'>";
            grid[i] = 2;
            space.style.backgroundColor = "white";
            win();
            return;
        }
    }
}
function autowin() {
    for (let i = 0; i < grid.length; i++) {
        if (grid[i] === 0) {
            uncover(i);
        }
    }
}
