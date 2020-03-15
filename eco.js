const fs = require('fs');
const yaml = require('js-yaml');
module.exports = (msg,cmd,scmd) => {
  if (cmd.split(" ")[1] === undefined) {
    var ecoContents = fs.readFileSync('eco.yml', 'utf8');
    var eco = yaml.safeLoad(ecoContents);
    if (msg.guild.members.get(cmd.split(" ")[2]) === undefined) {
      var id = msg.author.id;
      var pers = "Vous possédez : `";
    } else {
      var id = cmd.split(" ")[2];
      var pers = "<@"+id+"> `("+id+")`"+" possède : `";
    }
    if (eco[msg.author.id] === undefined) {
      eco[msg.author.id] = {money: eco.setup.base};
      let ecoyaml = yaml.safeDump(eco);
      fs.writeFileSync('eco.yml', ecoyaml, 'utf8');
    }
    msg.channel.send(pers+eco[msg.author.id].money+" "+eco.setup.devise+"` !");
  } else if (cmd.split(" ")[1] === "get") {
    var ecoContents = fs.readFileSync('eco.yml', 'utf8');
    var eco = yaml.safeLoad(ecoContents);
    if (cmd.split(" ")[2] === undefined) {
      var id = msg.author.id;
      var pers = "Vous possédez : `";
    } else if (msg.guild.members.get(cmd.split(" ")[2]) === undefined) {
      var id = msg.author.id;
      var pers = "Membre inconnu\nVous possédez : `";
    } else {
      var id = cmd.split(" ")[2];
      var pers = "<@"+id+"> `("+id+")`"+" possède : `";
    }
    if (eco[id] === undefined) {
      eco[id] = {money: eco.setup.base};
      let ecoyaml = yaml.safeDump(eco);
      fs.writeFileSync('eco.yml', ecoyaml, 'utf8');
    }
    msg.channel.send(pers+eco[id].money+" "+eco.setup.devise+"` !");
  } else if (cmd.split(" ")[1] === "add") {
    if (msg.guild.members.get(msg.author.id).roles.has("688093358673231999")) {
      if (parseInt(cmd.split(" ")[2]) === NaN) {
        msg.channel.send("Ce n'est pas un nombre !")
      } else {
        if (msg.guild.members.get(cmd.split(" ")[3]) === undefined) {
          var id = msg.author.id;
          var pers = "Vous possédez : `";
        } else {
          var id = cmd.split(" ")[3];
          var pers = "<@"+id+"> `("+id+")`"+" possède : `";
        }
        var ecoContents = fs.readFileSync('eco.yml', 'utf8');
        var eco = yaml.safeLoad(ecoContents);
        if (eco[id] === undefined) {
          eco[id] = {money: parseInt(cmd.split(" ")[2])};
          let ecoyaml = yaml.safeDump(eco);
          fs.writeFileSync('eco.yml', ecoyaml, 'utf8');
        } else {
          eco[id].money += parseInt(cmd.split(" ")[2]);
          let ecoyaml = yaml.safeDump(eco);
          fs.writeFileSync('eco.yml', ecoyaml, 'utf8');
        }
        var ecoContents = fs.readFileSync('eco.yml', 'utf8');
        var eco = yaml.safeLoad(ecoContents);
             
        msg.channel.send(pers+eco[id].money+" "+eco.setup.devise+"` !");
      }
    } else {
      msg.channel.send("Petit malin ! Tu n'as pas la permission");
    }
  } else if (cmd.split(" ")[1] === "set") {
    if (msg.guild.members.get(msg.author.id).roles.has("688093358673231999")) {
      if (cmd.split(" ")[2] === undefined) {
        msg.channel.send("Veuillez préciser un nombre !")
      } else if (parseInt(cmd.split(" ")[2]) === NaN) {
        msg.channel.send("Ce n'est pas un nombre !")
      } else {
        if (msg.guild.members.get(cmd.split(" ")[3]) === undefined) {
          var id = msg.author.id;
          var pers = "Vous possédez : `";
        } else {
          var id = cmd.split(" ")[3];
          var pers = "<@"+id+"> `("+id+")`"+" possède : `";
        }
        var ecoContents = fs.readFileSync('eco.yml', 'utf8');
        var eco = yaml.safeLoad(ecoContents);
        if (eco[id] === undefined) {
          eco[id] = {money: parseInt(cmd.split(" ")[2])};
          let ecoyaml = yaml.safeDump(eco);
          fs.writeFileSync('eco.yml', ecoyaml, 'utf8');
        } else {
          eco[id].money = parseInt(cmd.split(" ")[2]);
          let ecoyaml = yaml.safeDump(eco);
          fs.writeFileSync('eco.yml', ecoyaml, 'utf8');
        }
        var ecoContents = fs.readFileSync('eco.yml', 'utf8');
        var eco = yaml.safeLoad(ecoContents);
              
        msg.channel.send(pers+eco[id].money+" "+eco.setup.devise+"` !");
      }
    } else {
      msg.channel.send("Petit malin ! Tu n'as pas la permission\nEn effet, il te manque le rôle 'Banquier Central' :dollar:");
    }
  } else if (cmd.split(" ")[1] === "remove") {
    if (msg.guild.members.get(msg.author.id).roles.has("688093358673231999")) {
      if (parseInt(cmd.split(" ")[2]) === NaN) {
        msg.channel.send("Ce n'est pas un nombre !")
      } else {
        if (msg.guild.members.get(cmd.split(" ")[3]) === undefined) {
          var id = msg.author.id;
          var pers = "Vous possédez : `";
        } else {
          var id = cmd.split(" ")[3];
          var pers = "<@"+id+"> `("+id+")`"+" possède : `";
        }
        var ecoContents = fs.readFileSync('eco.yml', 'utf8');
        var eco = yaml.safeLoad(ecoContents);
        if (eco[id] === undefined) {
        eco[id] = {money: -1*parseInt(cmd.split(" ")[2])};
        let ecoyaml = yaml.safeDump(eco);
        fs.writeFileSync('eco.yml', ecoyaml, 'utf8');
      } else {
        eco[id].money -= parseInt(cmd.split(" ")[2]);
        let ecoyaml = yaml.safeDump(eco);
        fs.writeFileSync('eco.yml', ecoyaml, 'utf8');
      }
      var ecoContents = fs.readFileSync('eco.yml', 'utf8');
      var eco = yaml.safeLoad(ecoContents);
              
      msg.channel.send(pers+eco[id].money+" "+eco.setup.devise+"` !");
      }
    }
  }
}
