var colours = ["red","blue","green","white"];
var cards = [];
var count = 0;
function OnPageLoad(){

    $("#levels").append("<p><i>Levels shown here</i></p><br/>")
    $("#cards").append("<p><i>Cards shown here</i></p><br/>");
    $("#newdeck").click(NewScenario);   
    
    $("#draw").click(function() {
        if(count < cards.length) {
            dispCard(count);
            count++;
        }
        return false;
    });
}

function NewScenario(){
    CleanUp();
    
    var scen = $("#scenario").val();
    var play = $("#players").val();
    var diff = $("#difficulty").val();
    var race = $("#race").val();
    
    NewLevels(scen, play, diff);
    NewDeck(scen, race);
}

function CleanUp(){
    cards = [];
    count = 0;
    $("#cards").html("");
    $("#levels").html("");
}

function NewLevels(scenario, players, difficulty){
    $("#levels").html("<p>City level(s): "
            + CityLevels(scenario, players, difficulty)
            + "</p>");
    $("#levels").append("<p>Volkare level: " 
            + VolkareLevels(scenario, players, difficulty)
            + "</p>");
    return false;
}

function NewDeck(scenario, race) {

    for(i = 0; i < NumberOfWounds(scenario, race); i++) {
        var card = {
            type: "wound",
            colour: ""
        };
        cards.push(card);
    }

    for(s in  colours) {
        var col = colours[s];
        _(4).times(function(){
            var card = {
              type: "action",
              colour: col
            };
            cards.push(card);   
        });
        var card = {
            type: "spell",
            colour: col
        };
        cards.push(card);
    }
    cards = _.shuffle(cards);
    $("#cards").html("<p><b>Deck Created</b></p>");
    return false;
}

function NumberOfWounds(scenario, race) {
    var map = {
        vReturn: {
            fair: 18,
            tight: 15,
            thrilling: 12
        },
        vQuest: {
            fair: 20,
            tight: 16,
            thrilling: 12
        }
    };

    return map[scenario][race];
}

function CityLevels(scenario, players, difficulty) {
    var map = {
        vReturn: {
            solo: {
                daring: 4,
                heroic: 6,
                legendary: 10
            },
            two: {
                daring: 6,
                heroic: 9,
                legendary: 14
            },
            three: {
                daring: 8,
                heroic: 12,
                legendary: 18
            },
            four: {
                daring: 10,
                heroic: 16,
                legendary: 22
            }
        },
        vQuest: {
            solo: {
                daring: 3,
                heroic: 4,
                legendary: 4
            },
            two: {
                daring: 4,
                heroic: 4,
                legendary: 5
            },
            three: {
                daring: 4,
                heroic: 5,
                legendary: 5
            },
            four: {
                daring: 5,
                heroic: 5,
                legendary: 6
            }
        }
    };
    
    return map[scenario][players][difficulty];
}

function VolkareLevels(scenario, players, difficulty) {
    var map = {
        vReturn: {
            solo: {
                daring: 5,
                heroic: 8,
                legendary: 12
            },
            two: {
                daring: 10,
                heroic: 16,
                legendary: 24
            },
            three: {
                daring: 15,
                heroic: 24,
                legendary: 36
            },
            four: {
                daring: 20,
                heroic: 32,
                legendary: 48
            }
        },
        vQuest: {
            solo: {
                daring: 8,
                heroic: 10,
                legendary: 14
            },
            two: {
                daring: 14,
                heroic: 18,
                legendary: 26
            },
            three: {
                daring: 20,
                heroic: 26,
                legendary: 38
            },
            four: {
                daring: 26,
                heroic: 34,
                legendary: 50
            }
        }
    };
    
    return map[scenario][players][difficulty];
}

function dispCard(cardNum) {
    var cardsLeft = cards.length - (cardNum + 1);
    var card = cards[cardNum];
 	$("#cards").prepend('<span class="' + card.colour + ' ' + card.type + '">' 
                + card.colour + ' ' + card.type + '</span> (' + cardsLeft + ' left)<br/>');   
}
