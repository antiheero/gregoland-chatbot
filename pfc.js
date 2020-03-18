const fs = require('fs');
const yaml = require('js-yaml');
module.exports = (msg,cmd,scmd) => {
  var ecoContents = fs.readFileSync('eco.yml', 'utf8');
  var eco = yaml.safeLoad(ecoContents);
  msg.channel.send("Dans votre portefeuille, il y a `"+eco[msg.author.id].money+" "+eco.setup.devise+"` !");
  var bothandlist = ["pierre","feuille","ciseaux"]
  var bothand = bothandlist[Math.floor(Math.random()*bothandlist.length)]
  var gain = 0
  if (cmd.split(" ")[1] === "pierre") {
    if (bothand === "pierre") {
      gain = 0;
    } else if (bothand === "feuille") {
      gain = -3;
    } else if (bothand === "ciseaux") {
      gain = 3;
    }
    if (eco[msg.author.id] === undefined) {
      msg.channel.send("J'ai choisi "+bothand+" !");
      eco[msg.author.id] = {money: eco.setup.base+gain};
      let ecoyaml = yaml.safeDump(eco);
      fs.writeFileSync('eco.yml', ecoyaml, 'utf8');
      msg.channel.send("Maintenant, il y a `"+eco[msg.author.id].money+" "+eco.setup.devise+"` sur votre compte !");
    } else if (eco[msg.author.id].money >= 3) {
      msg.channel.send("J'ai choisi "+bothand+" !");
      eco[msg.author.id].money += gain;
      let ecoyaml = yaml.safeDump(eco);
      fs.writeFileSync('eco.yml', ecoyaml, 'utf8');
      msg.channel.send("Maintenant, il y a `"+eco[msg.author.id].money+" "+eco.setup.devise+"` sur votre compte !");
    } else {
      msg.channel.send("Pour parier, il te faut au moins 3 "+eco.setup.devise+" !")
    }
    var ecoContents = fs.readFileSync('eco.yml', 'utf8');
    var eco = yaml.safeLoad(ecoContents);
            
  } else if (cmd.split(" ")[1] === "feuille") {
    if (bothand === "pierre") {
      gain = 3
    } else if (bothand === "feuille") {
      gain = 0
    } else if (bothand === "ciseaux") {
      gain = -3
    }
    if (eco[msg.author.id] === undefined) {
      msg.channel.send("J'ai choisi "+bothand+" !");
      eco[msg.author.id] = {money: eco.setup.base+gain};
      let ecoyaml = yaml.safeDump(eco);
      fs.writeFileSync('eco.yml', ecoyaml, 'utf8');
      msg.channel.send("Maintenant, il y a `"+eco[msg.author.id].money+" "+eco.setup.devise+"` sur votre compte !");
    } else if (eco[msg.author.id].money >= 3) {
      msg.channel.send("J'ai choisi "+bothand+" !");
      eco[msg.author.id].money += gain;
      let ecoyaml = yaml.safeDump(eco);
      fs.writeFileSync('eco.yml', ecoyaml, 'utf8');
      msg.channel.send("Maintenant, il y a `"+eco[msg.author.id].money+" "+eco.setup.devise+"` sur votre compte !");
    } else {
      msg.channel.send("Pour parier, il te faut au moins 3 "+eco.setup.devise+" !")
    }
    var ecoContents = fs.readFileSync('eco.yml', 'utf8');
    var eco = yaml.safeLoad(ecoContents);
            
  } else if (cmd.split(" ")[1] === "ciseaux") {
    if (bothand === "pierre") {
      gain = -3
    } else if (bothand === "feuille") {
      gain = 3
    } else if (bothand === "ciseaux") {
      gain = 0
    }
    if (eco[msg.author.id] === undefined) {
      msg.channel.send("J'ai choisi "+bothand+" !");
      eco[msg.author.id] = {money: eco.setup.base+gain};
      let ecoyaml = yaml.safeDump(eco);
      fs.writeFileSync('eco.yml', ecoyaml, 'utf8');
      msg.channel.send("Maintenant, il y a `"+eco[msg.author.id].money+" "+eco.setup.devise+"` sur votre compte !");
    } else if (eco[msg.author.id].money >= 3) {
      msg.channel.send("J'ai choisi "+bothand+" !");
      eco[msg.author.id].money += gain;
      let ecoyaml = yaml.safeDump(eco);
      fs.writeFileSync('eco.yml', ecoyaml, 'utf8');
      msg.channel.send("Maintenant, il y a `"+eco[msg.author.id].money+" "+eco.setup.devise+"` sur votre compte !");
    } else {
      msg.channel.send("Pour parier, il te faut au moins 3 "+eco.setup.devise+" !")
    }
    var ecoContents = fs.readFileSync('eco.yml', 'utf8');
    var eco = yaml.safeLoad(ecoContents);
            
  } else {
    msg.channel.send("Il faut spécifier sur signe parier");
  }
}
