const fs = require('fs');
const yaml = require('js-yaml');
module.exports = (msg,cmd,scmd) => {
  var ecoContents = fs.readFileSync('eco.yml', 'utf8');
  var eco = yaml.safeLoad(ecoContents);
  msg.channel.send("Dans votre portefeuille, il y a `"+eco[msg.author.id].money+" "+eco.setup.devise+"` !");
  var bothandlist = ["pierre","feuille","ciseaux"]
  var bothand = bothandlist[Math.floor(Math.random()*bothandlist.length)]
  var gain = 0;
  var e1 = "";
  var e2 = "";
  if (cmd.split(" ")[1] === "pierre") {
    e1 = ":punch:";
    if (bothand === "pierre") {
      gain = 0;
      e2 = ":punch:";
    } else if (bothand === "feuille") {
      gain = -10;
      e2 = ":raised_hand:";
    } else if (bothand === "ciseaux") {
      gain = 10;
      e2 = ":v:";
    }
    if (eco[msg.author.id] === undefined) {
      eco[msg.author.id] = {money: eco.setup.base+gain};
      let ecoyaml = yaml.safeDump(eco);
      fs.writeFileSync('eco.yml', ecoyaml, 'utf8');
      msg.channel.send({embed:{color:3447003,fields:[{name:"J'ai choisi",value:e2,inline:true},{name:"Vous avez choisi",value:e1,inline:true},{name:"Gain",value:gain+" "+eco.setup.devise},{name:"Sur votre compte",value:eco[msg.author.id].money+" "+eco.setup.devise}]}});
    } else if (eco[msg.author.id].money >= 10) {
      eco[msg.author.id].money += gain;
      let ecoyaml = yaml.safeDump(eco);
      fs.writeFileSync('eco.yml', ecoyaml, 'utf8');
      msg.channel.send({embed:{color:3447003,fields:[{name:"J'ai choisi",value:e2,inline:true},{name:"Vous avez choisi",value:e1,inline:true},{name:"Gain",value:gain+" "+eco.setup.devise},{name:"Sur votre compte",value:eco[msg.author.id].money+" "+eco.setup.devise}]}});
    } else {
      msg.channel.send("Pour parier, il te faut au moins 10 "+eco.setup.devise+" !")
    }
    var ecoContents = fs.readFileSync('eco.yml', 'utf8');
    var eco = yaml.safeLoad(ecoContents);
            
  } else if (cmd.split(" ")[1] === "feuille") {
    e1 = ":raised_hand:";
    if (bothand === "pierre") {
      gain = 10;
      e2 = ":punch:";
    } else if (bothand === "feuille") {
      gain = 0;
      e2 = ":raised_hand:";
    } else if (bothand === "ciseaux") {
      gain = -10;
      e2 = ":v:";
    }
    if (eco[msg.author.id] === undefined) {
      eco[msg.author.id] = {money: eco.setup.base+gain};
      let ecoyaml = yaml.safeDump(eco);
      fs.writeFileSync('eco.yml', ecoyaml, 'utf8');
      msg.channel.send({embed:{color:3447003,fields:[{name:"J'ai choisi",value:e2,inline:true},{name:"Vous avez choisi",value:e1,inline:true},{name:"Gain",value:gain+" "+eco.setup.devise},{name:"Sur votre compte",value:eco[msg.author.id].money+" "+eco.setup.devise}]}});
    } else if (eco[msg.author.id].money >= 10) {
      eco[msg.author.id].money += gain;
      let ecoyaml = yaml.safeDump(eco);
      fs.writeFileSync('eco.yml', ecoyaml, 'utf8');
      msg.channel.send({embed:{color:3447003,fields:[{name:"J'ai choisi",value:e2,inline:true},{name:"Vous avez choisi",value:e1,inline:true},{name:"Gain",value:gain+" "+eco.setup.devise},{name:"Sur votre compte",value:eco[msg.author.id].money+" "+eco.setup.devise}]}});
    } else {
      msg.channel.send("Pour parier, il te faut au moins 3 "+eco.setup.devise+" !")
    }
    var ecoContents = fs.readFileSync('eco.yml', 'utf8');
    var eco = yaml.safeLoad(ecoContents);
            
  } else if (cmd.split(" ")[1] === "ciseaux") {
    e1 = ":v:";
    if (bothand === "pierre") {
      gain = -10;
      e2 = ":punch:";
    } else if (bothand === "feuille") {
      gain = 10;
      e2 = ":raised_hand:";
    } else if (bothand === "ciseaux") {
      gain = 0;
      e2 = ":v:";
    }
    if (eco[msg.author.id] === undefined) {
      eco[msg.author.id] = {money: eco.setup.base+gain};
      let ecoyaml = yaml.safeDump(eco);
      fs.writeFileSync('eco.yml', ecoyaml, 'utf8');
      msg.channel.send({embed:{color:3447003,fields:[{name:"J'ai choisi",value:e2,inline:true},{name:"Vous avez choisi",value:e1,inline:true},{name:"Gain",value:gain+" "+eco.setup.devise},{name:"Sur votre compte",value:eco[msg.author.id].money+" "+eco.setup.devise}]}});
    } else if (eco[msg.author.id].money >= 10) {
      eco[msg.author.id].money += gain;
      let ecoyaml = yaml.safeDump(eco);
      fs.writeFileSync('eco.yml', ecoyaml, 'utf8');
      msg.channel.send({embed:{color:3447003,fields:[{name:"J'ai choisi",value:e2,inline:true},{name:"Vous avez choisi",value:e1,inline:true},{name:"Gain",value:gain+" "+eco.setup.devise},{name:"Sur votre compte",value:eco[msg.author.id].money+" "+eco.setup.devise}]}});
    } else {
      msg.channel.send("Pour parier, il te faut au moins 3 "+eco.setup.devise+" !")
    }
    var ecoContents = fs.readFileSync('eco.yml', 'utf8');
    var eco = yaml.safeLoad(ecoContents);
            
  } else {
    msg.channel.send("Il faut spécifier sur signe parier");
  }
}
