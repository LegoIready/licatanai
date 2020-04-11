var foo = document.getElementById("foo"); //html body
var materials = ["wheat", "stone", "brick", "wood", "sheep"]; //list of possible cards
var hand = []; //current cards
var settlements = 1; //number of settlements
var citiesOutOfPlay = 0; //number of cities
var roadsOutOfPlay = 1; //number of roads
var points = 0; //number of points
var knights = 0; //number of knights in hand
var knightsOutOfPlay = 0; //number of knights played
var monopoly = 0; //number of monopoly cards in hand
var monopolyOutOfPlay = 0; //number of monopoly cards played
var roadBuilding = 0; //number of road building cards in hand
var roadBuildingOutOfPlay = 0; //number of road building cards played
var victory = 0; //number of victory cards
var yearOfPlenty = 0; //number of year of plenty cards in hand
var yearOfPlentyOutOfPlay = 0; //number of year of plenty cards played
var theyGive = ""; //trade input
var theyGet = ""; //trade output
var largestArmyGain = "no"; //player has largest army yes/no
var longestRoadGain = "no"; //player has longest road yes/no
var settlementPossible = "no"; //player can build a settlement yes/no
var addSheepBar0 = 1;
var addWheatBar0 = 1;
var addWoodBar0 = 1;
var addStoneBar0 = 1;
var addBrickBar0 = 1;
var monopolyBar0 = 0; //number of cards from monopoly
var monopolyBar1 = ""; //type of card from monopoly
var monopolyBar2 = []; //array of all cards from monopoly
var turnBar1 = 0;
var turnBar2 = 0;
var cityBar0 = 0;
var probation = 0;
var mobbedBar0 = "";
var tradeInBar2 = "";
var keep0 = "";
var keep1 = "";
var keep2 = "";
var keep3 = "";
var keep4 = "";
function resetFoo() {
    foo.innerHTML = '<button onclick="startTurn();">START TURN</button><button onclick="addCard();">ADD CARD</button><button onclick="loseCard();">LOSE CARD</button><button onclick="trade();">TRADE</button><button onclick="settlement();">SETTLEMENT POSSIBLE: ' + settlementPossible.toUpperCase() + '</button><button onclick="largestArmy();">LARGEST ARMY: ' + largestArmyGain.toUpperCase() + ' (' + knightsOutOfPlay + ')</button><button onclick="longestRoad();">LONGEST ROAD: ' + longestRoadGain.toUpperCase() + '</button><p>CARDS: ' + hand.length + '</p>';
    document.getElementById("endGame").innerHTML = '<button onclick="endGame();">END GAME</button>';
    turnBar1 = 0;
} //reset body to default
function resetMonopoly() {
    while (monopolyBar2.length < monopolyBar0) {
        monopolyBar2.push('\''+monopolyBar1+'\'');
    } //create the array
    foo.innerHTML = '<p>MONOPOLY ON ' + monopolyBar1.toUpperCase() + '</p><button onclick="monopolyBar0++;resetMonopoly();">+</button><p>' + monopolyBar0 + '</p><button onclick="monopolyBar0--;resetMonopoly();">-</button><button onclick="hand.push(' + monopolyBar2.join() + ');startTurn();">NEXT</button><button onclick="resetFoo();">RETURN</button>';
} //update the number of cards from monopoly
function buildCity() {
    bar0 = 0; //position of first stone
    bar1 = 0; //position of second stone
    bar2 = 0; //position of third stone
    bar3 = 0; //position of first wheat
    bar4 = 0; //position of second wheat
    if (hand.includes("stone")&&settlements>0&&citiesOutOfPlay<5) {
        bar0 = hand.indexOf("stone") + 1;
        if (hand.includes("stone", bar0)) {
            bar1 = hand.indexOf("stone", bar0) + 1;
            if (hand.includes("stone", bar1)) {
                bar2 = hand.indexOf("stone", bar1) + 1;
                if (hand.includes("wheat")) {
                    bar3 = hand.indexOf("wheat") + 1;
                    if (hand.includes("wheat", bar3)) {
                        bar4 = hand.indexOf("wheat", bar3) + 1;
                        hand.splice(hand.indexOf("stone"), 1); //remove stone
                        hand.splice(hand.indexOf("stone"), 1); //remove stone
                        hand.splice(hand.indexOf("stone"), 1); //remove stone
                        hand.splice(hand.indexOf("wheat"), 1); //remove wheat
                        hand.splice(hand.indexOf("wheat"), 1); //remove wheat
                        points += 1; //add a point
                        settlements -= 1; //remove a settlement
                        citiesOutOfPlay += 1; //add a city
                        foo.innerHTML = "<p>BUILD A CITY</p><button onclick=\"startTurn();\">NEXT</button><button onclick='resetFoo();'>RETURN</button>";
                        cityBar0 = 1;
                    } //test for a wheat
                } //test for a wheat
            } //test for a stone
        } //test for a stone
    } //test for a stone
} //check if city can be built. if yes, build it
function developmentCard() {
    bar0 = (Math.floor(Math.random() * 25) + 1); //the number that decides which development card is built
    if (bar0 > 0 && bar0 < 15) {
        knights += 1;
    } //build a knight card
    if (bar0 > 14 && bar0 < 20) {
        victory += 1;
        points += 1;
    } //build a victory card
    if (bar0 > 19 && bar0 < 22) {
        monopoly += 1;
    } //build a monopoly card
    if (bar0 > 21 && bar0 < 24) {
        roadBuilding += 1;
    } //build a road building card
    if (bar0 > 23 && bar0 < 26) {
        yearOfPlenty += 1;
    } //build a year of plenty card
} //build a random development card
function showHand() {
    document.getElementById("hand").innerHTML = '<p>' + (hand.join(', ')).toUpperCase() + '</p><button onclick="hideHand();">HIDE HAND</button>';
}
function hideHand() {
    document.getElementById("hand").innerHTML = '<button onclick="showHand();">SHOW HAND</button>';
}
function endGame() {
    foo.innerHTML = '<p>GAME RESULTS:<br>TOTAL POINTS: ' + points + '<br>ROADS: ' + roadsOutOfPlay + '<br>SETTLEMENTS: ' + settlements + '<br>CITIES: ' + citiesOutOfPlay + '<br>KNIGHTS: ' + knightsOutOfPlay + '<br>VICTORY CARDS: ' + victory + '<br>MONOPOLY: ' + monopolyOutOfPlay + '<br>ROAD BUILDING: ' + roadBuildingOutOfPlay + '<br>YEAR OF PLENTY: ' + yearOfPlentyOutOfPlay + '<br>LARGEST ARMY: ' + largestArmyGain.toUpperCase() + '<br>LONGEST ROAD: ' + longestRoadGain.toUpperCase() +'</p>';
    showHand();
    document.getElementById("endGame").innerHTML = '<button onclick="resetFoo();">RETURN</button>';
}

//vvv needCard for smart functions
function needCard() {
    bar0 = 0;
    bar1 = "";
    bar2 = 0;
    bar3 = 0;
    bar4 = 0;
    bar5 = 0;
    if (hand.includes("stone")) {
        bar0 += 1;
        bar2 = hand.indexOf("stone") + 1;
        keep0 = "stone";
    }
    if (hand.includes("stone", bar2)) {
        bar0 += 1;
        bar3 = hand.indexOf("stone", bar2) + 1;
        keep1 = "stone";
    }
    if (hand.includes("stone", bar3)) {
        bar0 += 1;
        bar4 = hand.indexOf("stone", bar3) + 1;
        keep2 = "stone";
    }
    else {
        bar1 = "stone";
    }
    if (hand.includes("wheat")) {
        bar0 += 1;
        bar5 = hand.indexOf("wheat") + 1;
        keep3 = "wheat";
    }
    if (hand.includes("wheat", bar5)) {
        bar0 += 1;
        keep4 = "wheat";
    }
    else {
        bar1 = "wheat";
    }
    if (bar0 == 4 && settlements > 0) {
        return bar1;
    }
    else if (bar0 == 5 && settlements > 0) {
        return;
    }
    bar0 = 0;
    keep0 = "";
    keep1 = "";
    keep2 = "";
    keep3 = "";
    keep4 = "";
    if (hand.includes("wheat")) {
        bar0 += 1;
        keep0 = "wheat";
    }
    else {
        bar1 = "wheat";
    }
    if (hand.includes("sheep")) {
        bar0 += 1;
        keep1 = "sheep";
    }
    else {
        bar1 = "sheep";
    }
    if (hand.includes("brick")) {
        bar0 += 1;
        keep2 = "brick";
    }
    else {
        bar1 = "brick";
    }
    if (hand.includes("wood")) {
        bar0 += 1;
        keep3 = "wood";
    }
    else {
        bar1 = "wood";
    }
    if (bar0 == 3 && settlementPossible == "yes") {
        return bar1;
    }
    else if (bar0 == 4 && settlementPossible == "yes") {
        return;
    }
    bar0 = 0;
    keep0 = "";
    keep1 = "";
    keep2 = "";
    keep3 = "";
    keep4 = "";
    if (hand.includes("brick")) {
        bar0 += 1;
        keep0 = "brick";
    }
    else {
        bar1 = "brick";
    }
    if (hand.includes("wood")) {
        bar0 += 1;
        keep1 = "wood";
    }
    else {
        bar1 = "wood";
    }
    if (bar0 == 1 && settlementPossible == "no") {
        return bar1;
    }
    else if (bar0 == 2 && settlementPossible == "no") {
        return;
    }
    bar0 = 0;
    keep0 = "";
    keep1 = "";
    keep2 = "";
    keep3 = "";
    keep4 = "";
    if (hand.includes("wheat")) {
        bar0 += 1;
        keep0 = "wheat";
    }
    else {
        bar1 = "wheat";
    }
    if (hand.includes("sheep")) {
        bar0 += 1;
        keep1 = "sheep";
    }
    else {
        bar1 = "sheep";
    }
    if (hand.includes("stone")) {
        bar0 += 1;
        keep2 = "stone";
    }
    else {
        bar1 = "stone";
    }
    if (bar0 == 2) {
        return bar1;
    }
    else if (bar0 == 3) {
        return;
    }
    bar0 = 0;
    keep0 = "";
    keep1 = "";
    keep2 = "";
    keep3 = "";
    keep4 = "";
}

function keepCard(card) {
    return card == keep0 || card == keep1 || card == keep2 || card == keep3 || card == keep4;
}
function startTurn() {
    if (turnBar1 == 0) {
        turnBar0 = Math.floor(Math.random() * 36) + 1;
        turnBar1 = 1;
        probation = 0;
        turnBar2 = 0;
        if (turnBar0 > 0 && turnBar0 < 2) {
            foo.innerHTML = '<p>ROLL A 2</p><button onclick="startTurn();">NEXT</button><button onclick="resetFoo();">RETURN</button>';
        }
        if (turnBar0 > 1 && turnBar0 < 3) {
            foo.innerHTML = '<p>ROLL A 12</p><button onclick="startTurn();">NEXT</button><button onclick="resetFoo();">RETURN</button>';
        }
        if (turnBar0 > 2 && turnBar0 < 5) {
            foo.innerHTML = '<p>ROLL A 3</p><button onclick="startTurn();">NEXT</button><button onclick="resetFoo();">RETURN</button>';
        }
        if (turnBar0 > 4 && turnBar0 < 7) {
            foo.innerHTML = '<p>ROLL AN 11</p><button onclick="startTurn();">NEXT</button><button onclick="resetFoo();">RETURN</button>';
        }
        if (turnBar0 > 6 && turnBar0 < 10) {
            foo.innerHTML = '<p>ROLL A 4</p><button onclick="startTurn();">NEXT</button><button onclick="resetFoo();">RETURN</button>';
        }
        if (turnBar0 > 9 && turnBar0 < 13) {
            foo.innerHTML = '<p>ROLL A 10</p><button onclick="startTurn();">NEXT</button><button onclick="resetFoo();">RETURN</button>';
        }
        if (turnBar0 > 12 && turnBar0 < 17) {
            foo.innerHTML = '<p>ROLL A 5</p><button onclick="startTurn();">NEXT</button><button onclick="resetFoo();">RETURN</button>';
        }
        if (turnBar0 > 16 && turnBar0 < 21) {
            foo.innerHTML = '<p>ROLL A 9</p><button onclick="startTurn();">NEXT</button><button onclick="resetFoo();">RETURN</button>';
        }
        if (turnBar0 > 20 && turnBar0 < 26) {
            foo.innerHTML = '<p>ROLL A 6</p><button onclick="startTurn();">NEXT</button><button onclick="resetFoo();">RETURN</button>';
        }
        if (turnBar0 > 25 && turnBar0 < 31) {
            foo.innerHTML = '<p>ROLL AN 8</p><button onclick="startTurn();">NEXT</button><button onclick="resetFoo();">RETURN</button>';
        }
        if (turnBar0 > 30 && turnBar0 < 37) {
            foo.innerHTML = '<p>ROLL A 7</p><button onclick="rollSeven();rob();">NEXT</button><button onclick="resetFoo();">RETURN</button>';
        }
    } //roll the dice
    else if (turnBar1 == 1) {
        if (points > 9) {
            foo.innerHTML = '<p>I WIN<br>GAME RESULTS:<br>TOTAL POINTS: ' + points + '<br>ROADS: ' + roadsOutOfPlay + '<br>SETTLEMENTS: ' + settlements + '<br>CITIES: ' + citiesOutOfPlay + '<br>KNIGHTS: ' + knightsOutOfPlay + '<br>VICTORY CARDS: ' + victory + '<br>MONOPOLY: ' + monopolyOutOfPlay + '<br>ROAD BUILDING: ' + roadBuildingOutOfPlay + '<br>YEAR OF PLENTY: ' + yearOfPlentyOutOfPlay + '<br>LARGEST ARMY: ' + largestArmyGain.toUpperCase() + '<br>LONGEST ROAD: ' + longestRoadGain.toUpperCase() + '</p>';
            showHand(); //show hand
            document.getElementById("endGame").innerHTML = '<button onclick="resetFoo();">RETURN</button>';
            return;
        } //player wins
        if (probation == 0) {
            if (knights > 0) {
                foo.innerHTML = '<p>ROB PLAYER ' + (Math.floor(Math.random() * 3) + 1) + ' WITH KNIGHT</p><button onclick="hand.push(\'sheep\');startTurn();">SHEEP</button><button onclick="hand.push(\'wheat\');startTurn();">WHEAT</button><button onclick="hand.push(\'wood\');startTurn();">WOOD</button><button onclick="hand.push(\'stone\');startTurn();">STONE</button><button onclick="hand.push(\'brick\');startTurn();">BRICK</button><button onclick="startTurn();">NEXT</button><button onclick="resetFoo();">RETURN</button>';
                knights -= 1; //remove a knight card from hand
                knightsOutOfPlay += 1; //expend a knight card
                return;
            } //use a knight card
            if (monopoly > 0) {
                monopolyBar1 = materials[Math.floor(Math.random() * materials.length)]; //type of card from monopoly
                resetMonopoly(); //update the number of cards from monopoly
                monopoly -= 1; //remove a monopoly card from hand
                monopolyOutOfPlay += 1; //expend a monopoly card
                return;
            } //use a monopoly card
            if (roadBuilding > 0) {
                foo.innerHTML = '<p>PLAY ROAD BUIILDING</p><button onclick="startTurn();">NEXT</button><button onclick="resetFoo();">RETURN</button>';
                roadBuilding -= 1; //remove a road building card from hand
                roadBuildingOutOfPlay += 1; //expend a road building card
                return;
            } //use a road building card
            if (yearOfPlenty > 0) {
                bar0 = materials[Math.floor(Math.random() * materials.length)]; //type of card 1 from year of plenty
                bar1 = materials[Math.floor(Math.random() * materials.length)]; //type of card 2 from year of plenty
                hand.push(bar0); //add card 1 to hand
                hand.push(bar1); //add card 2 to hand
                foo.innerHTML = '<p>YEAR OF PLENTY: ' + bar0.toUpperCase(); + ' AND ' + bar1.toUpperCase(); + '</p><button onclick="startTurn();">NEXT</button><button onclick="resetFoo();">RETURN</button>';
                yearOfPlenty -= 1; //remove a year of plenty card from hand
                yearOfPlentyOutOfPlay += 1; //expend a year of plenty card
                return;
            } //use a year of plenty card
        }
        bar1 = 0;
        tradeInBar2 = "";
        bar3 = 0;
        bar4 = "";
        for (i = 0; i < materials.length; i++) {
            bar0 = materials[i];
            while (hand.includes(bar0)&&bar3<4) {
                bar1 += 1;
                hand.splice(hand.indexOf(bar0), 1);
                bar3 += 1;
            }
            if (bar1 < 4) {
                bar1 = 0;
                while (bar3 > 0) {
                    hand.push(bar0);
                    bar3 -= 1;
                }
            }
            else {
                tradeInBar2 = materials[i];
                break;
            }
        }
        if (tradeInBar2 != "") {
            if (!needCard()) {
                do {
                    bar4 = materials[Math.floor(Math.random() * materials.length)];
                }
                while (bar4 == tradeInBar2);
                hand.push(bar4);
                foo.innerHTML = '<p>TRADE IN 4 ' + tradeInBar2.toUpperCase() + ' FOR ' + bar4.toUpperCase() + '</p><button onclick=\"startTurn();\">NEXT</button><button onclick="resetFoo();">RETURN</button>';
                return;
            }
            else {
                bar4 = needCard();
                hand.push(bar4);
                foo.innerHTML = '<p>TRADE IN 4 ' + tradeInBar2.toUpperCase() + ' FOR ' + bar4.toUpperCase() + '</p><button onclick=\"startTurn();\">NEXT</button><button onclick="resetFoo();">RETURN</button>';
                return;
            }
        }
        bar5 = "";
        bar6 = "";
        bar7 = 0;
        bar8 = 0;
        bar9 = 0;
        bar10 = 0;
        bar11 = 0;
        if (settlements < 6 && settlementPossible == "yes" && hand.includes("sheep") && hand.includes("wheat") && hand.includes("wood") && hand.includes("brick")) {
            hand.splice(hand.indexOf("sheep"), 1); //remove sheep
            hand.splice(hand.indexOf("wheat"), 1); //remove wheat
            hand.splice(hand.indexOf("wood"), 1); //remove wood
            hand.splice(hand.indexOf("brick"), 1); //remove brick
            points += 1; //add a point
            settlements += 1; //add a settlement
            foo.innerHTML = "<p>BUILD A SETTLEMENT</p><button onclick=\"startTurn();\">NEXT</button><button onclick='resetFoo();'>RETURN</button>";
            return;
        } //build a settlement
        buildCity(); //check if a city can be built. if yes, build it
        if (cityBar0 == 1) {
            cityBar0 = 0;
            return;
        }
        if (roadsOutOfPlay < 16 && hand.includes("brick") && hand.includes("wood")) {
            hand.splice(hand.indexOf("brick"), 1); //remove brick
            hand.splice(hand.indexOf("wood"), 1); //remove wood
            roadsOutOfPlay += 1; //add a road
            foo.innerHTML = "<p>BUILD A ROAD</p><button onclick=\"startTurn();\">NEXT</button><button onclick='resetFoo();'>RETURN</button>";
            return;
        } //build a road
        if ((knights + knightsOutOfPlay + victory + yearOfPlenty + yearOfPlentyOutOfPlay + roadBuilding + roadBuildingOutOfPlay + monopoly + monopolyOutOfPlay) < 26 && hand.includes("sheep") && hand.includes("wheat") && hand.includes("stone")) {
            hand.splice(hand.indexOf("sheep"), 1); //remove sheep
            hand.splice(hand.indexOf("wheat"), 1); //remove wheat
            hand.splice(hand.indexOf("stone"), 1); //remove stone
            developmentCard(); //add a development card
            probation = 1;
            foo.innerHTML = "<p>BUILD A DEVELOPMENT CARD</p><button onclick=\"startTurn();\">NEXT</button><button onclick='resetFoo();'>RETURN</button>";
            return;
        } //build a development card
        if (needCard() && hand.every(keepCard) == false && turnBar2 == 0) {
            bar6 = needCard();
            do {
                bar5 = hand[Math.floor(Math.random() * hand.length)];
            }
            while (bar5 == bar6 || bar5 == keep0 || bar5 == keep1 || bar5 == keep2 || bar5 == keep3 || bar5 == keep4);
            foo.innerHTML = '<p>I WILL GIVE ' + bar5.toUpperCase() + ' FOR ' + bar6.toUpperCase() + '</p><button onclick="hand.splice(hand.indexOf(bar5),1);hand.push(bar6);startTurn();">YES</button><button onclick="turnBar2=1;startTurn();">NO</button><button onclick="resetFoo();">RETURN</button>';
            return;
        }
        turnBar1 = 0;
        resetFoo();
    }
}
function addCard() {
    foo.innerHTML = '<button onclick="addSheep();">SHEEP</button><button onclick="addWheat();">WHEAT</button><button onclick="addWood();">WOOD</button><button onclick="addStone();">STONE</button><button onclick="addBrick();">BRICK</button><button onclick="resetFoo();">RETURN</button>';
}
function loseCard() {
    foo.innerHTML = '<button onclick="getRobbed();">ROBBERY</button><button onclick="getMobbed();">MONOPOLY</button><button onclick="resetFoo();">RETURN</button>';
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
    foo.innerHTML = '<div id="youGive"><p>YOU GIVE:</p></div><button onclick="youGive(\'sheep\');">SHEEP</button><button onclick="youGive(\'wheat\');">WHEAT</button><button onclick="youGive(\'wood\');">WOOD</button><button onclick="youGive(\'stone\');">STONE</button><button onclick="youGive(\'brick\');">BRICK</button><div id="youGet"><p>YOU GET:</p></div>';
    if (hand.includes("sheep")) {
        foo.innerHTML += '<button class="available" onclick="youGet(\'sheep\');">SHEEP</button>';
    } //if sheep in hand
    else {
        foo.innerHTML += '<button onclick="youGet(\'sheep\');">SHEEP</button>';
    } //if sheep not in hand
    if (hand.includes("wheat")) {
        foo.innerHTML += '<button class="available" onclick="youGet(\'wheat\');">WHEAT</button>';
    } //if wheat in hand
    else {
        foo.innerHTML += '<button onclick="youGet(\'wheat\');">WHEAT</button>';
    } //if wheat not in hand
    if (hand.includes("wood")) {
        foo.innerHTML += '<button class="available" onclick="youGet(\'wood\');">WOOD</button>';
    } //if wood in hand
    else {
        foo.innerHTML += '<button onclick="youGet(\'wood\');">WOOD</button>';
    } //if wood not in hand
    if (hand.includes("stone")) {
        foo.innerHTML += '<button class="available" onclick="youGet(\'stone\');">STONE</button>';
    } //if stone in hand
    else {
        foo.innerHTML += '<button onclick="youGet(\'stone\');">STONE</button>';
    } //if stone not in hand
    if (hand.includes("brick")) {
        foo.innerHTML += '<button class="available" onclick="youGet(\'brick\');">BRICK</button>';
    } //if brick in hand
    else {
        foo.innerHTML += '<button onclick="youGet(\'brick\');">BRICK</button>';
    } //if brick not in hand
    foo.innerHTML += '<button onclick="finishTrade();">TRADE</button><button onclick="resetFoo();">RETURN</button>';
} //trade cards
function youGive(material) {
    theyGive = material; //type of card input
    document.getElementById("youGive").innerHTML = '<p>YOU GIVE: '+material.toUpperCase()+'</p>';
} //update card type input
function youGet(material) {
    theyGet = material; //type of card output
    document.getElementById("youGet").innerHTML = '<p>YOU GET: '+material.toUpperCase()+'</p>';
} //update card type output
function finishTrade() {
    bar0 = 0;
    bar1 = 0;
    bar2 = 0;
    bar3 = 0;
    bar4 = 0;
    bar5 = 0;
    if (hand.includes(theyGet)) {
        if (hand.includes("stone")) {
            bar0 += 1;
            bar2 = hand.indexOf("stone") + 1;
        }
        if (hand.includes("stone", bar2)) {
            bar0 += 1;
            bar3 = hand.indexOf("stone", bar2) + 1;
        }
        if (hand.includes("stone", bar3)) {
            bar0 += 1;
            bar4 = hand.indexOf("stone", bar3) + 1;
        }
        if (hand.includes("wheat")) {
            bar0 += 1;
            bar5 = hand.indexOf("wheat") + 1;
        }
        if (hand.includes("wheat", bar5)) {
            bar0 += 1;
        }
        if (bar0 > 3 && settlements > 0 && (hand.includes(theyGive) || (theyGive != "stone" && theyGive != "wheat"))) {
            foo.innerHTML = '<p>I WILL NOT TRADE THAT</p><button onclick="resetFoo();">RETURN</button>';
            bar1 = 1;
        }
        bar0 = 0;
        if (!hand.includes("wheat")) {
            bar0 += 1;
        }
        if (!hand.includes("sheep")) {
            bar0 += 1;
        }
        if (!hand.includes("brick")) {
            bar0 += 1;
        }
        if (!hand.includes("wood")) {
            bar0 += 1;
        }
        if (bar0 < 2 && settlementPossible == "yes" && (hand.includes(theyGive) || (theyGive != "brick" && theyGive != "wood" && theyGive != "sheep" && theyGive != "wheat"))) {
            foo.innerHTML = '<p>I WILL NOT TRADE THAT</p><button onclick="resetFoo();">RETURN</button>';
            bar1 = 1;
        }
        bar0 = 0;
        if (!hand.includes("brick")) {
            bar0 += 1;
        }
        if (!hand.includes("wood")) {
            bar0 += 1;
        }
        if (bar0 < 2 && settlementPossible == "no" && (hand.includes(theyGive) || (theyGive != "brick" && theyGive != "wood"))) {
            foo.innerHTML = '<p>I WILL NOT TRADE THAT</p><button onclick="resetFoo();">RETURN</button>';
            bar1 = 1;
        }
        bar0 = 0;
        if (!hand.includes("wheat")) {
            bar0 += 1;
        }
        if (!hand.includes("sheep")) {
            bar0 += 1;
        }
        if (!hand.includes("stone")) {
            bar0 += 1;
        }
        if (bar0 < 2 && (hand.includes(theyGive) || (theyGive != "wheat" && theyGive != "sheep" && theyGive != "stone"))) {
            foo.innerHTML = '<p>I WILL NOT TRADE THAT</p><button onclick="resetFoo();">RETURN</button>';
            bar1 = 1;
        }
        bar0 = 0;
        if (bar1 == 0) {
            hand.splice(hand.indexOf(theyGet), 1); //remove output from hand
            hand.push(theyGive); //add input to hand
            foo.innerHTML = '<div><p>YOU GAVE: ' + theyGive.toUpperCase() + '</p></div><div><p>YOU GOT: ' + theyGet.toUpperCase() + '</p><button onclick="resetFoo();">RETURN</button></div>';
        }
    } //trade successful
    else {
        foo.innerHTML = '<p>I DON\'T HAVE THAT CARD</p><button onclick="resetFoo();">RETURN</button>';
    } //trade unsuccessful
} //remove output from hand
function rollSeven() {
    needCard();
    bar0 = 0;
    if (hand.length > 7) {
        bar0 = hand.length - Math.ceil(hand.length / 2);
    }
    bar1 = 0;
    if (hand.every(keepCard) == false) {
        while (bar1 < bar0 && hand.every(keepCard) == false) {
            bar2 = Math.floor(Math.random() * hand.length);
            if (hand[bar2] != keep0 && hand[bar2] != keep1 && hand[bar2] != keep2 && hand[bar2] != keep3 && hand[bar2] != keep4) {
                hand.splice(bar2, 1);
                bar1 += 1;
            }
        }
    }
    if (hand.every(keepCard) == true) {
        console.log("c");
        while (bar1 < bar0) {
            console.log("d");
            bar2 = Math.floor(Math.random() * hand.length);
            hand.splice(bar2, 1);
            bar1 += 1;
        }
    }
} //remove half of hand
function rob() {
    foo.innerHTML = '<p>ROB PLAYER ' + (Math.floor(Math.random() * 3) + 1) + '</p><button onclick="hand.push(\'sheep\');startTurn();">SHEEP</button><button onclick="hand.push(\'wheat\');startTurn();">WHEAT</button><button onclick="hand.push(\'wood\');startTurn();">WOOD</button><button onclick="hand.push(\'stone\');startTurn();">STONE</button><button onclick="hand.push(\'brick\');startTurn();">BRICK</button><button onclick="startTurn();">NEXT</button><button onclick="resetFoo();">RETURN</button>';
} //rob a player
function getRobbed() {
    bar0 = Math.floor(Math.random() * hand.length);
    foo.innerHTML = '<p>YOU GET ' + hand[bar0].toUpperCase() + '</p><br><button onclick="resetFoo();">RETURN</button>';
    hand.splice(bar0, 1);
}
function getMobbed() {
    bar1 = 0;
    if (mobbedBar0 == "") {
        foo.innerHTML = '<button onclick="mobbedBar0=\'sheep\';getMobbed();">SHEEP</button><button onclick="mobbedBar0=\'wheat\';getMobbed();">WHEAT</button><button onclick="mobbedBar0=\'wood\';getMobbed();">WOOD</button><button onclick="mobbedBar0=\'stone\';getMobbed();">STONE</button><button onclick="mobbedBar0=\'brick\';getMobbed();">BRICK</button><button onclick="resetFoo();">RETURN</button>';
    }
    while (hand.includes(mobbedBar0)) {
        hand.splice(hand.indexOf(mobbedBar0), 1);
        bar1 += 1;
    }
    if (mobbedBar0 != "") {
        foo.innerHTML = '<p>YOU GET ' + bar1 + ' ' + mobbedBar0.toUpperCase() + '</p><button onclick="resetFoo();">RETURN</button>';
        mobbedBar0 = "";
    }
}
function settlement() {
    if (settlementPossible == "no") {
        settlementPossible = "yes";
    }
    else if (settlementPossible == "yes") {
        settlementPossible = "no";
    }
    resetFoo();
}
function largestArmy() {
    if (largestArmyGain == "no"&&knightsOutOfPlay>2) {
        largestArmyGain = "yes";
        points += 2;
    }
    else if (largestArmyGain == "yes") {
        largestArmyGain = "no";
        points -= 2;
    }
    resetFoo();
}
function longestRoad() {
    if (longestRoadGain == "no") {
        longestRoadGain = "yes";
        points += 2;
    }
    else if (longestRoadGain == "yes") {
        longestRoadGain = "no";
        points -= 2;
    }
    resetFoo();
}
