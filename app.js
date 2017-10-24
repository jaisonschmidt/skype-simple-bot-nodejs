var restify = require('restify');
var builder = require('botbuilder');
const lerolero = require('lerolero');

//=========================================================
// Bot Setup
//=========================================================
// Setup Restify Server
var server = restify.createServer();

server.listen(process.env.port || 8080, function () {
   console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot
var connector = new builder.ChatConnector({
    appId: process.env.appId || 'YOUR_VALUE',
    appPassword: process.env.appId || "YOUR_PASS"
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

    // session.message.text.toLowerCase().contains('hello')

    if(session.message.text.toLowerCase().contains('@JSBot')){
        
        if(session.message.text.toLowerCase().contains('diga oi')){
            session.send(`Oie!`);
        }

        if(session.message.text.toLowerCase().contains('diga algo')){
            session.send(lerolero());
        }

    }

});