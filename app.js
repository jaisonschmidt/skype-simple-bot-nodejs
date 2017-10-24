/*
    

THIS IS A SIMPLE AND ACADEMIC SKYPE BOT USING NODEJS



*/

const restify = require('restify');
const builder = require('botbuilder');
const lerolero = require('lerolero');
const request = require("request");


var users = [];
var calaboca = false;

//=========================================================
// Bot Setup
//=========================================================
var server = restify.createServer();

server.listen(process.env.port || process.env.PORT || 8080, function () {
   console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot
var connector = new builder.ChatConnector({
    appId: process.env.appId || 'YOUR_VALUE',
    appPassword: process.env.appPassword || "YOUR_PASS"
});

var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

// Bot on
bot.on('contactRelationUpdate', function (message) {
    if (message.action === 'add') {
        var name = message.user ? message.user.name : null;
        var reply = new builder.Message()
                .address(message.address)
                .text("Oi %s... Obrigado por me adicionar!", name || 'pessoa legal');
        bot.send(reply);
    } else {
        // delete their data
    }
});

bot.on('typing', function (message) {
  // User is typing
});

bot.on('deleteUserData', function (message) {
    // User asked to delete their data
});

//=========================================================
// Bots Dialogs
//=========================================================
String.prototype.contains = function(content){
  return this.indexOf(content) !== -1;
}

bot.dialog('/', function (session) {
    
    //users.push({ name : session.message.user.name, address : session.message.address });

    if(session.message.user.name=="Jaison Schmidt" && session.message.text.toLowerCase().contains('calaboca')){
        session.send(`Ta bom!`);
        calaboca = true;
        return true;
    }

    if(session.message.user.name=="Jaison Schmidt" && session.message.text.toLowerCase().contains('pode falar')){
        session.send(`Heeeeeee`);
        calaboca = false;
        return true;
    }

    if(calaboca==true && session.message.user.name!="Jaison Schmidt"){
        return true;
    }

    if(session.message.text.toLowerCase().trim() == "ue"){
        session.send(`https://forum.gc.historygames.net/uploads/monthly_2016_07/64510606.jpg.71550efcca9d919f6bde8b2dcde4beeb.jpg`);
    } else  if(session.message.text.toLowerCase().contains('diga algo')){
        session.send(lerolero());
    } else if(session.message.text.toLowerCase().contains('quina')){
        var arr = []
    
        while(arr.length < 5){
            var randomnumber = Math.ceil(Math.random()*80)
            if(arr.indexOf(randomnumber) > -1) continue;
            arr[arr.length] = randomnumber;
        }
        
        session.send(arr.sort(function(a, b){return a-b}).toString());

    } else if (session.message.text.toLowerCase().contains('previsao do tempo')){

        var url = "https://api.hgbrasil.com/weather/?format=json&woeid=455896"
        
        request({
            url: url,
            json: true
        }, function (error, response, body) {
            var amanha = body.results.forecast[1];
            session.send(`Em ${amanha.date} a previsao é de ${amanha.description}. Minima de ${amanha.min} e maxima de ${amanha.max}.`);
        })

    } else {
        session.send(`Não entendi ${session.message.user.name}.`);
    }

    // link [jaison.com.br](https://jaison.com.br)

});

/*
setInterval(function(){
    for(var i = 0; i < users.length; i++){
        sendProactiveMessage(users[i].address, "Todos bem? :D");
    }
}, 15000);
*/

function sendProactiveMessage(address, message) {
    var msg = new builder.Message().address(address);
    msg.text(message);
    msg.textLocale('en-US');
    bot.send(msg);
}