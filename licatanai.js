var foo = document.getElementById("foo");
var materials = ["wheat", "stone", "brick", "wood", "sheep"];
var hand = [];
var settlements = 0;
var points = 0;
var knights = 0;
var knightsOutOfPlay = 0;
var monopoly = 0;
var roadBuilding = 0;
var victory = 0;
var yearOfPlenty = 0;
var theyGive = "";
var theyGet = "";
function resetFoo() {
    foo.innerHTML = '<button onclick="startTurn();">START TURN</button><button onclick="addCard();">ADD CARD</button><button onclick="trade()">TRADE</button><button onclick="rollSeven()">ROLL 7</button><button onclick="rob()">ROB</button><button onclick="getRobbed()">GET ROBBED</button><button onclick="largestArmy()">LARGEST ARMY</button><button onclick="longestRoad()">LONGEST ROAD</button>';
    document.getElementById("hand").innerHTML = '<p>CARDS: ' + hand.length + '</p>';
}
function buildCity() {
    bar0 = 0;
    bar1 = 0;
    bar2 = 0;
    bar3 = 0;
    bar4 = 0;
    if (hand.includes("stone")&&settlements>0) {
        bar0 = hand.indexOf("stone") + 1;
        if (hand.includes("stone", bar0)) {
            bar1 = hand.indexOf("stone", bar0) + 1;
            if (hand.includes("stone", bar1)) {
                bar2 = hand.indexOf("stone", bar1) + 1;
                if (hand.includes("wheat")) {
                    bar3 = hand.indexOf("wheat") + 1;
                    if (hand.includes("wheat", bar3)) {
                        bar4 = hand.indexOf("wheat", bar3) + 1;
                        hand.splice(bar0, 1);
                        hand.splice(bar1, 1);
                        hand.splice(bar2, 1);
                        hand.splice(bar3, 1);
                        hand.splice(bar4, 1);
                        points += 1;
                        settlements -= 1;
                        foo.innerHTML = "<p>BUILD A CITY</p><br><button onclick='resetFoo();'>RETURN</button>";
                    }
                }
            }
        }
    }
}
function developmentCard() {
    bar0 = (Math.floor(Math.random() * 25) + 1);
    if (bar0 > 0 && bar0 < 15) {
        knights += 1;
    }
    if (bar0 > 14 && bar0 < 20) {
        victory += 1;
        points += 1;
    }
    if (bar0 > 19 && bar < 22) {
        monopoly += 1;
    }
    if (bar0 > 21 && bar0 < 24) {
        roadBuilding += 1;
    }
    if (bar0 > 23 && bar0 < 26) {
        yearOfPlenty += 1;
    }
}
function startTurn() {
    if (points > 9) {
        document.getElementById("victory").innerHTML = '<p>VICTORY CARDS: ' + victory + '</p>';
        foo.innerHTML = '<p>I WIN</p>';
    }
    else if (knights > 0) {
        foo.innerHTML = '<p>ROB PLAYER ' + (Math.floor(Math.random() * 3) + 1) + ' WITH KNIGHT</p><br><button onclick="resetFoo();">RETURN</button>';
        knights -= 1;
        knightsOutOfPlay += 1;
        document.getElementById("knights").innerHTML = '<p>KNIGHTS PLAYED: ' + knightsOutOfPlay + '</p><br><button onclick="resetFoo();">RETURN</button>';
    }
    else if (monopoly > 0) {
        foo.innerHTML = '<p>MONOPOLY ON ' + materials[Math.floor(Math.random() * materials.length)].toUpperCase() + '</p>';
        monopoly -= 1;
    }
    else if (roadBuilding > 0) {
        foo.innerHTML = 'PLAY ROAD BUIILDING';
        roadBuilding -= 1;
    }
    else if (yearOfPlenty > 0) {
        foo.innerHTML = '<p>YEAR OF PLENTY: ' + materials[Math.floor(Math.random() * materials.length)].toUpperCase() + ' AND ' + materials[Math.floor(Math.random() * materials.length)].toUpperCase() + '</p><br><button onclick="resetFoo();">RETURN</button>';
    }
    else if (hand.includes("sheep") && hand.includes("wheat") && hand.includes("wood") && hand.includes("brick")) {
        hand.splice(hand.indexOf("sheep"), 1);
        hand.splice(hand.indexOf("wheat"), 1);
        hand.splice(hand.indexOf("wood"), 1);
        hand.splice(hand.indexOf("brick"), 1);
        points += 1;
        settlements += 1;
        foo.innerHTML = "<p>BUILD A SETTLEMENT</p><br><button onclick='resetFoo();'>RETURN</button>";
    }
    else if (hand.includes("brick") && hand.includes("wood")) {
        hand.splice(hand.indexOf("brick"), 1);
        hand.splice(hand.indexOf("wood"), 1);
        foo.innerHTML = "<p>BUILD A ROAD</p><br><button onclick='resetFoo();'>RETURN</button>";
    }
    else if (hand.includes("sheep") && hand.includes("wheat") && hand.includes("stone")) {
        hand.splice(hand.indexOf("sheep"), 1);
        hand.splice(hand.indexOf("wheat"), 1);
        hand.splice(hand.indexOf("stone"), 1);
        developmentCard();
        foo.innerHTML = "<p>BUILD A DEVELOPMENT CARD</p><br><button onclick='resetFoo();'>RETURN</button>";
    }
    else {
        buildCity();
    }
}
function addCard() {
    foo.innerHTML = '<button onclick="addSheep();">SHEEP</button><button onclick="addWheat();">WHEAT</button><button onclick="addWood();">WOOD</button><button onclick="addStone();">STONE</button><button onclick="addBrick();">BRICK</button>';
}
function addSheep() {
    hand.push("sheep");
    resetFoo();
}
function addWheat() {
    hand.push("wheat");
    resetFoo();
}
function addWood() {
    hand.push("wood");
    resetFoo();
}
function addStone() {
    hand.push("stone");
    resetFoo();
}
function addBrick() {
    hand.push("brick");
    resetFoo();
}
function trade() {
    foo.innerHTML = '<div id="youGive"><p>YOU GIVE:</p><button onclick="youGive(\'sheep\');">SHEEP</button><button onclick="youGive(\'wheat\');">WHEAT</button><button onclick="youGive(\'wood\');">WOOD</button><button onclick="youGive(\'stone\');">STONE</button><button onclick="youGive(\'brick\');">BRICK</button></div><div id="youGet"><p>YOU GET:</p><button onclick="youGet(\'sheep\');">SHEEP</button><button onclick="youGet(\'wheat\');">WHEAT</button><button onclick="youGet(\'wood\');">WOOD</button><button onclick="youGet(\'stone\');">STONE</button><button onclick="youGet(\'brick\');">BRICK</button></div><button onclick="finishTrade();">TRADE</button>';
}
function youGive(material) {
    theyGive = material;
    document.getElementById("youGive").innerHTML = '<p>YOU GIVE: '+material.toUpperCase()+'</p>';
}
function youGet(material) {
    theyGet = material;
    document.getElementById("youGet").innerHTML = '<p>YOU GET: '+material.toUpperCase()+'</p>';
}
function finishTrade() {
    if (hand.includes(theyGet)) {
        hand.splice(hand.indexOf(theyGet), 1);
        hand.push(theyGive);
        foo.innerHTML = '<p>YOU GAVE: ' + theyGive.toUpperCase() + '<br>YOU GOT: ' + theyGet.toUpperCase() + '</p><br><button onclick="resetFoo();">RETURN</button>';
    }
    else {
        foo.innerHTML = '<p>I DON\'T HAVE THAT CARD</p><br><button onclick="resetFoo();">RETURN</button>';
    }
}
function rollSeven() {
    if (hand.length > 7) {
        hand.splice((Math.ceil(hand.length / 2)), (hand.length - (Math.ceil(hand.length / 2))));
    }
    resetFoo();
}
function rob() {
    foo.innerHTML = '<p>ROB PLAYER ' + (Math.floor(Math.random() * 3) + 1) + '</p><br><button onclick="resetFoo();">RETURN</button>';
}
function getRobbed() {
    bar0 = Math.floor(Math.random() * hand.length);
    foo.innerHTML = '<p>YOU GET ' + hand[bar0].toUpperCase() + '</p><br><button onclick="resetFoo();">RETURN</button>';
    hand.splice(bar0, 1);
}
function largestArmy() {
    foo.innerHTML = '<button onclick="largestArmyGain();">GAIN</button><button onclick="largestArmyLose();">LOSE</button>';
}
function largestArmyGain() {
    points += 2;
    resetFoo();
    document.getElementById("army").innerHTML = '<p>LARGEST ARMY</p>';
}
function largestArmyLose() {
    points -= 2;
    resetFoo();
    document.getElementById("army").innerHTML = '';
}
function longestRoad() {
    foo.innerHTML = '<button onclick="longestRoadGain();">GAIN</button><button onclick="longestRoadLose();">LOSE</button>';
}
function longestRoadGain() {
    points += 2;
    resetFoo();
    document.getElementById("road").innerHTML = '<p>LONGEST ROAD</p>';
}
function longestRoadLose() {
    points -= 2;
    resetFoo();
    document.getElementById("road").innerHTML = '';
}