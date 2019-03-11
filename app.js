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

    if(session.message.user.name=="Jaison Schmidt" && session.message.text.toLowerCase().contains('melhor amigo')){
        session.send(`O Jonaaaaaas! :D`);
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

    if(session.message.text.toLowerCase().contains('meme ue')){
        session.send(`https://forum.gc.historygames.net/uploads/monthly_2016_07/64510606.jpg.71550efcca9d919f6bde8b2dcde4beeb.jpg`);
    } else if(session.message.text.toLowerCase().contains('meme is')){
        session.send(`https://rlv.zcache.com/its_something_meme_postcard-r048747b5c6b24a2381258f05fd149b78_vgbaq_8byvr_324.jpg`);
    } else if(session.message.text.toLowerCase().contains('manda nudes')){
        session.send(`https://img.ibxk.com.br/2015/06/15/15180943425877.png?w=1040`);
    } else if(session.message.text.toLowerCase().contains('tchau')){
        session.send(`Tchau ${session.message.user.name}! :D`);
    } 
    
    else if(session.message.text.toLowerCase().contains('bom dia!')){
        session.send(`Bom dia ${session.message.user.name}! :D`);
    } 

    else if(session.message.text.toLowerCase().contains('da bom dia')){
        var lastWord = session.message.text.split(" ");
        session.send(`Bom dia ${lastWord[lastWord.length-1]}! :D`);
    } 

    else if(session.message.text.toLowerCase().contains('boa tarde!')){
        session.send(`Boa tarde ${session.message.user.name}! :D`);
    } 
    else if(session.message.text.toLowerCase().contains('da boa tarde')){
        var lastWord = session.message.text.split(" ");
        session.send(`Boa tarde ${lastWord[lastWord.length-1]}! :D`);
    }  else if(session.message.text.toLowerCase().contains('quina')){
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

    } 
    else if(session.message.text.toLowerCase().contains('valeu man!')){
        session.send(`de nada man, tmj!`);
    } 
    else if(session.message.text.toLowerCase().contains('charadinha')){
        var url = "https://us-central1-kivson.cloudfunctions.net/charada-aleatoria"
        
        request({
            url: url,
            json: true
        }, function (error, response, body) {
            var retorno = body.results;
            session.send(body.pergunta);

            setTimeout(function(){
                body.resposta
            }, 5000);
        })
    } 
    else {
        session.send(lerolero());
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