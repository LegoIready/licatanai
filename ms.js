"use strict";
var grid = [-1];
var size = 25;
var k = 1;
var flags = [-1];
const game = document.getElementById("game");
const watch = document.getElementById("watch");
const winLose = document.getElementById("winLose");
var l = 0;
var m = 0;
var s = 1;
var watchStart;
var watchInt;
var watchOff = 0;
function start(man) {
    winLose.innerHTML = "<br>";
    watchOff = 0;
    switch (man) {
        case 0:
            k = 1;
            l = 0;
            m = 0;
            let q = size * size;
            let str = '<table style="width:' + (22.4 * size) + 'px"><tbody>';
            if (document.getElementById("movil").checked) {
                for (let i = 1; i <= q; i++) {
                    grid[i] = 0;
                    flags[i] = 0;
                    str += '<td id="space' + i + '" onclick="mobileFlag(' + i + ')"><img src="mscover.png"></td>';
                    if (i % size === 0) {
                        for (let j = 0; j <= size; j++) {
                            if (size * j === i) {
                                str += '</tr><tr>';
                            }
                        }
                    }
                }
            } else {
                for (let i = 1; i <= q; i++) {
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
            }
            game.innerHTML = (str + '</tr></tbody></table>');
            let r = (size * size) / 6;
            for (let i = 1; i <= r;) {
                let j = Math.floor(Math.random() * (size * size));
                if (grid[j] === 0) {
                    grid[j] = 1;
                    i++;
                    m++;
                }
            }
            break;
        case 1:
            var j = atob(document.getElementById("loadBoard").value).split(',').map(Number);
            size = j.shift();
            watchOff = j.shift();
            k = j.shift();
            l = j.shift();
            m = j.shift();
            grid = j.splice(0, size * size + 1);
            flags = j.splice(0, size * size + 1);
            document.getElementById('sizeIn').value = size;
            document.getElementById('sizeOut0').value = size;
            document.getElementById('sizeOut1').value = size;
            let s = size * size;
            let str2 = '<table style="width:' + (22.4 * size) + 'px"><tbody><tr>';
            if (document.getElementById("movil").checked) {
                for (let i = 1; i <= s; i++) {
                    str2 += '<td id="space' + i + '" onclick="mobileFlag(' + i + ')"><img src="mscover.png"></td>';
                    if (i % size === 0) {
                        for (let j = 0; j <= size; j++) {
                            if (size * j === i) {
                                str2 += '</tr><tr>';
                            }
                        }
                    }
                }
            } else {
                for (let i = 1; i <= s; i++) {
                    str2 += '<td id="space' + i + '" onclick="uncover(' + i + ')" oncontextmenu="flag(' + i + ');return false"><img src="mscover.png"></td>';
                    if (i % size === 0) {
                        for (let j = 0; j <= size; j++) {
                            if (size * j === i) {
                                str2 += '</tr><tr>';
                            }
                        }
                    }
                }
            }
            game.innerHTML = (str2 + '</tr></tbody></table>');
            for (let i = 1; i <= s; i++) {
                if (grid[i] >= 2) {
                    document.getElementById("space" + i).innerHTML = "<img src='ms" + (grid[i] - 2) + ".png'>";
                }
                if (flags[i] === 1) {
                    document.getElementById("space" + i).innerHTML = "<img src='msflag.png'>";
                }
            }
            break;
    }
    watchStart = Date.now();
    clearInterval(watchInt);
    switch (l) {
        case 0:
            watchInt = setInterval(function () { var watchNow = Date.now() + watchOff; var watchHr = Math.floor((watchNow - watchStart) / 3600000); var watchMin = (Math.floor((watchNow - watchStart) / 60000) % 60); var watchSec = (Math.floor((watchNow - watchStart) / 1000) % 60); var watchMil = watchNow % 1000; watch.innerHTML = ((watchHr >= 10) ? watchHr : '0' + watchHr) + ':' + ((watchMin >= 10) ? watchMin : '0' + watchMin) + ':' + ((watchSec >= 10) ? watchSec : '0' + watchSec) + '.' + ((watchMil >= 10) ? ((watchMil >= 100) ? watchMil : '0' + watchMil) : '00' + watchMil); }, 1);
            break;
        case 1:
            var watchNow = Date.now() + watchOff; var watchHr = Math.floor((watchNow - watchStart) / 3600000); var watchMin = (Math.floor((watchNow - watchStart) / 60000) % 60); var watchSec = (Math.floor((watchNow - watchStart) / 1000) % 60); var watchMil = watchNow % 1000; watch.innerHTML = ((watchHr >= 10) ? watchHr : '0' + watchHr) + ':' + ((watchMin >= 10) ? watchMin : '0' + watchMin) + ':' + ((watchSec >= 10) ? watchSec : '0' + watchSec) + '.' + ((watchMil >= 10) ? ((watchMil >= 100) ? watchMil : '0' + watchMil) : '00' + watchMil);
            if (k + m - 1 === size * size) {
                winLose.innerHTML = "YOU WIN";
                let q = size * size;
                for (let j = 1; j <= q; j++) {
                    if (grid[j] === 1) {
                        document.getElementById("space" + j).innerHTML = "<img src='msbomb.png'></img>";
                    }
                }
            } else {
                winLose.innerHTML = "YOU LOSE";
                let q = size * size;
                for (let j = 1; j <= q; j++) {
                    if (grid[j] === 1) {
                        document.getElementById("space" + j).innerHTML = "<img src='msbomb.png'>";
                    }
                }
            }
            break;
    }
    s = 1;
}
function win() {
    if (k + m - 1 === size * size) {
        watchOff = Date.now() - watchStart;
        clearInterval(watchInt);
        winLose.innerHTML = "YOU WIN";
        let q = size * size;
        for (let j = 1; j <= q; j++) {
            if (grid[j] === 1) {
                document.getElementById("space" + j).innerHTML = "<img src='msbomb.png'></img>";
            }
        }
        s = 0;
        l = 1;
    }
}
function flag(i) {
    if (l === 0 && grid[i] < 2) {
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
    if (grid[i] < 2 && flags[i] === 0 && l === 0) {
        if (grid[i] === 1) {
            watchOff = Date.now() - watchStart;
            clearInterval(watchInt);
            winLose.innerHTML = "YOU LOSE";
            let q = size * size;
            for (let j = 1; j <= q; j++) {
                if (grid[j] === 1) {
                    document.getElementById("space" + j).innerHTML = "<img src='msbomb.png'>";
                }
            }
            l = 1;
            return;
        } else if (i === 1) {
            k++;
            if (grid[i + 1] === 1) {
                h++;
            }
            if (grid[i + size] === 1) {
                h++;
            }
            if (grid[i + size + 1] === 1) {
                h++;
            }
            grid[i] = h + 2;
            if (h === 0) {
                uncover(i + 1);
                uncover(i + size);
                uncover(i + size + 1);
            }
            space.innerHTML = "<img src='ms" + h + ".png'>";
            win();
            return;
        } else if (i === size) {
            k++;
            if (grid[i - 1] === 1) {
                h++;
            }
            if (grid[i + size] === 1) {
                h++;
            }
            if (grid[i + size - 1] === 1) {
                h++;
            }
            grid[i] = h + 2;
            if (h === 0) {
                uncover(i - 1);
                uncover(i + size);
                uncover(i + size - 1);
            }
            space.innerHTML = "<img src='ms" + h + ".png'>";
            win();
            return;
        } else if (i === (size * size) - size + 1) {
            k++;
            if (grid[i + 1] === 1) {
                h++;
            }
            if (grid[i - size] === 1) {
                h++;
            }
            if (grid[i - size + 1] === 1) {
                h++;
            }
            grid[i] = h + 2;
            if (h === 0) {
                uncover(i + 1);
                uncover(i - size);
                uncover(i - size + 1);
            }
            space.innerHTML = "<img src='ms" + h + ".png'>";
            win();
            return;
        } else if (i === size * size) {
            k++;
            if (grid[i - 1] === 1) {
                h++;
            }
            if (grid[i - size] === 1) {
                h++;
            }
            if (grid[i - size - 1] === 1) {
                h++;
            }
            grid[i] = h + 2;
            if (h === 0) {
                uncover(i - 1);
                uncover(i - size);
                uncover(i - size - 1);
            }
            space.innerHTML = "<img src='ms" + h + ".png'>";
            win();
            return;
        } else if ((i - 1) % size === 0) {
            k++;
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
            grid[i] = h + 2;
            if (h === 0) {
                uncover(i - size);
                uncover(i - size + 1);
                uncover(i + 1);
                uncover(i + size);
                uncover(i + size + 1);
            }
            space.innerHTML = "<img src='ms" + h + ".png'>";
            win();
            return;
        } else if (i % size === 0) {
            k++;
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
            grid[i] = h + 2;
            if (h === 0) {
                uncover(i - size);
                uncover(i - size - 1);
                uncover(i - 1);
                uncover(i + size);
                uncover(i + size - 1);
            }
            space.innerHTML = "<img src='ms" + h + ".png'>";
            win();
            return;
        } else if (i < size) {
            k++;
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
            grid[i] = h + 2;
            if (h === 0) {
                uncover(i - 1);
                uncover(i + 1);
                uncover(i + size);
                uncover(i + size - 1);
                uncover(i + size + 1);
            }
            space.innerHTML = "<img src='ms" + h + ".png'>";
            win();
            return;
        } else if (i > (size * size) - size + 1) {
            k++;
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
            grid[i] = h + 2;
            if (h === 0) {
                uncover(i - size);
                uncover(i - size - 1);
                uncover(i - size + 1);
                uncover(i - 1);
                uncover(i + 1);
            }
            space.innerHTML = "<img src='ms" + h + ".png'>";
            win();
            return;
        } else {
            k++;
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
            grid[i] = h + 2;
            if (h === 0) {
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
            win();
            return;
        }
    }
}
function mobileFlag(i) {
    if (flags[i] == 0) {
        flag(i);
    } else if (flags[i] == 1) {
        flag(i);
        uncover(i);
    }
}
function autowin() {
    for (let i = 0; i < grid.length; i++) {
        if (grid[i] === 0) {
            uncover(i);
        }
    }
}
