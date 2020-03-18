require('dotenv').config();
const fs = require('fs');
const yaml = require('js-yaml');
const Discord = require('discord.js');
const client = new Discord.Client();

const prefix = ["!", "/"];
const yamlContents = fs.readFileSync('messages.yml', 'utf8');
const data = yaml.safeLoad(yamlContents);
console.log("YAML-messages loaded.");

const ecojs = require('./eco');

// Files
const ymlattch = new Discord.MessageAttachment(yamlContents, "messages.yml");
const jsbuffer = fs.readFileSync('./index.js');
const jsattch = new Discord.MessageAttachment(jsbuffer, "index.js");

client.on('guildMemberAdd', member => {
  member.guild.systemChannel.send(
    `Bienvenue sur le serveur <@${member.user.id}> !`
  );
  if (member.guild.id === "681549703212564547") {
    member.guild.systemChannel.send("Vive le Parti unique !\nAu passage, il t'a accordé le rôle de Citoyen d'honneur !\nFinallement, le Parti t'accorde 100 ₲ ! Pour les recevoir, fais : ```\n!eco\n```");
    member.addRole("681556751509880889");
  } else if (member.guild.id === "689476199172407440") {
    member.addRole("689477316744970363");
  }
})

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', msg => {
  if (msg.channel.type === "text") {
    if (prefix.indexOf(msg.content[0]) >= 0) {
      try {
        var cmd = msg.content.slice(1);
        var scmd = cmd.split(" ")[0];
        console.log("'"+msg.content+"' was executed by "+msg.author.tag+" !");
        if (scmd === "listemojis") {
          if (msg.channel.id === "685181829577572423") {
            const emojiList = msg.guild.emojis.map((e, x) => (x + ' = ' + e) + ' | ' +e.name);
            for (var i = 0; i < emojiList.length; i++) {
              msg.channel.send(emojiList[i]);
            }
          } else if (msg.guild.id === "681549703212564547") {
            console.log("ok")
            msg.channel.send("Petit malin ! Utilise cette commande sur "+msg.guild.channels.get('685181829577572423').toString()+" ! Cette commande est beaucoup trop encombrante. Ce serait le bordel. Comprenez-nous ! :cry:")
          } else {
            msg.channel.send("Cette commande doit être impérativement effectuée sur ce serveur : https://discord.gg/RjxK6Wt")
          }
        } else if (scmd === "help") {
          if (msg.guild.id === "681549703212564547") {
            msg.channel.send("-- Aide des commandes --\nPréfixes :\n`"+prefix.join("`, `")+"` Exemples : `"+prefix.join("ping` = `")+"ping`\n- Économie :\n`eco get | set | add | remove`\n- Jeux :\n`pfc pierre | feuille | ciseaux`\n`chevaux <montant>`\n- Rôles achetables :\n`investir`\n- Commandes fixes (parfois aléatoires) :\n`"+Object.keys(data).join("` `")+"`\n- Commandes dynamiques :\n`help` `ping`\n- Développeurs :\n`listemojis` (uniquement sur "+msg.guild.channels.get('685181829577572423').toString()+")");
          } else {
            msg.channel.send("Ce bot est celui du serveur de GoldenVal RPD du Grégoland.\nhttps://discord.gg/RjxK6Wt");
            msg.channel.send("-- Aide des commandes --\nPréfixes :\n`"+prefix.join("`, `")+"` Exemples : `"+prefix.join("ping` = `")+"ping`\n- Économie :\n`eco get | set | add | remove`\n- Jeux :\n`pfc pierre | feuille | ciseaux`\n`chevaux <montant>`\n- Commandes fixes (parfois aléatoires) :\n`"+Object.keys(data).join("` `")+"`\n- Commandes dynamiques :\n`help` `ping`\n- Développeurs :\n`listemojis` (uniquement sur RPD du Grégoland)");
          }
        } else if (scmd === "ping") {
          msg.channel.send("Pong! :ping_pong:\nMon ping est de : `"+Math.round(client.ping)+" ms` !")
        } else if (scmd === "an") {
          msg.delete();
          msg.channel.send({embed: {
            color: msg.guild.members.get(msg.author.id).highestRole.color,
            author: {
              name: "Anonyme",
              icon_url: "https://image.flaticon.com/icons/png/512/36/36601.png"
            },
            description: msg.content.slice(4)
          }});
        } else if (scmd === "id") {
          msg.reply("Ton id est : `"+msg.author.id+"` !")
        } else if (scmd === "eco") {
          return ecojs(msg, cmd, scmd)
        } else if (scmd === "pfc") {
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
        } else if (scmd === "chevaux") {
          var ecoContents = fs.readFileSync('eco.yml', 'utf8');
          var eco = yaml.safeLoad(ecoContents);
          if (parseInt(cmd.split(" ")[1]) >= 0) {
            if (eco[msg.author.id].money >= parseInt(cmd.split(" ")[1])) {
              msg.channel.send("Vous pariez "+cmd.split(" ")[1]+" ₲ !");
              if (Math.floor(Math.random()*12) === 1) {
                msg.channel.send("Vous avez gagné "+cmd.split(" ")[1]*12+" ₲ !");
                var gain = parseInt(cmd.split(" ")[1])*12;
              } else {
                msg.channel.send("Vous avez perdu "+cmd.split(" ")[1]+" ₲ !");
                var gain = -1*parseInt(cmd.split(" ")[1]);
              }
              eco[msg.author.id].money += gain;
              let ecoyaml = yaml.safeDump(eco);
              fs.writeFileSync('eco.yml', ecoyaml, 'utf8');
              msg.channel.send("Dans votre portefeuille, il y a `"+eco[msg.author.id].money+" "+eco.setup.devise+"` !");
            } else {
              msg.channel.send("Il faut de l'argent pour parier ! Tête de linotte !")
            }
          } else {
            msg.channel.send("Veuillez spécifier un montant à parier !")
          }
        } else if (scmd === "investir") {
          if (msg.guild.id === "681549703212564547") {
            if (cmd.split(" ")[1] === "-y") {
              var ecoContents = fs.readFileSync('eco.yml', 'utf8');
              var eco = yaml.safeLoad(ecoContents);
              if (msg.guild.members.get(msg.author.id).roles.has("688340581860114455")) {
                msg.channel.send("Vous avez déjà le rôle")
              } else if (eco[msg.author.id].money >= 101) {
                eco[msg.author.id].money -= 101;
                msg.guild.members.get(msg.author.id).addRole("688340581860114455");
                msg.channel.send("Vous avez le rôle");
                let ecoyaml = yaml.safeDump(eco);
                fs.writeFileSync('eco.yml', ecoyaml, 'utf8');
                msg.channel.send("Dans votre portefeuille, il y a `"+eco[msg.author.id].money+" "+eco.setup.devise+"` !");
              } else {
                msg.channel.send("Vous n'avez pas assez d'argent")
              }
            } else {
              msg.channel.send("Le rôle auto-entrepreneur coûte 101 ₲");
              msg.channel.send("Pour l'obtenir : Tapez```\n!investir -y\n```");
            }
          } else {
            msg.channel.send("Faites cette commande sur RPD du Grégoland");
          }
        } else {
          var nb = msg.content.split(" ")[1]
          if (nb === undefined || data[scmd][parseInt(nb)-1] === undefined) {
            msg.channel.send(data[scmd][Math.floor(Math.random()*data[scmd].length)]);
          } else {
            msg.channel.send(data[scmd][parseInt(nb)-1]);
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  } else if (msg.channel.type === "dm") {
    if (prefix.indexOf(msg.content[0]) >= 0) {
      console.log("'"+msg.content+"' was executed by "+msg.author.tag+" in a dm channel !");
      var cmd = msg.content.slice(1);
      var scmd = cmd.split(" ")[0];
      if (scmd === "an") {
        client.guilds.get("681549703212564547").systemChannel.send({embed: {
          color: client.guilds.get("681549703212564547").get(msg.author.id).highestRole.color,
          author: {
            name: "Anonyme",
            icon_url: "https://image.flaticon.com/icons/png/512/36/36601.png"
          },
          description: msg.content.slice(4)
        }});
      }
    }
  }
})



client.login(process.env.BOT_TOKEN);
