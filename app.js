var restify = require('restify');
var builder = require('botbuilder');
const lerolero = require('lerolero');

//=========================================================
// Bot Setup
//=========================================================
// Setup Restify Server
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
    
    if(session.message.text.toLowerCase().contains('diga oi')){
        session.send(`Oie!`);
    } else  if(session.message.text.toLowerCase().contains('diga algo')){
        session.send(lerolero());
    } else if(session.message.text.toLowerCase().contains('numeros da quina')){
        var arr = []
    
        while(arr.length < 5){
            var randomnumber = Math.ceil(Math.random()*80)
            if(arr.indexOf(randomnumber) > -1) continue;
            arr[arr.length] = randomnumber;
        }
        
        session.send(arr.sort(function(a, b){return a-b}).toString());
    } else {
        session.send(`Não entendi. Procura no [Google](http://google.com)!`);
    }

    // link [jaison.com.br](https://jaison.com.br)

});