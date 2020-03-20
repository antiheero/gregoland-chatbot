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
const pfc = require('./pfc');
const chevaux = require('./chevaux');

// Files
const ymlattch = new Discord.MessageAttachment(yamlContents, "messages.yml");
const jsbuffer = fs.readFileSync('./index.js');
const jsattch = new Discord.MessageAttachment(jsbuffer, "index.js");

client.on('guildMemberAdd', member => {
  member.send(
    `Bienvenue sur le serveur <@${member.user.id}> !`
  );
  if (member.guild.id === "681549703212564547") {
    member.send("Vive le Parti unique !\nAu passage, il t'a accordé le rôle de Citoyen d'honneur !\nFinallement, le Parti t'accorde 100 ₲ ! Pour les recevoir, fais : ```\n!eco\n```");
    member.addRole("681556751509880889");
  } else if (member.guild.id === "689476199172407440") {
    member.addRole("689477316744970363");
  }
})

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
})

client.on('message', msg => {
  const guild = client.guilds.get("681549703212564547");
  if (msg.channel.type === "text") {
    if (prefix.indexOf(msg.content[0]) >= 0) {
      try {
        var cmd = msg.content.slice(1);
        var scmd = cmd.split(" ")[0];
        console.log("'"+msg.content+"' was executed by "+msg.author.tag+" on '"+msg.guild.name+"'.'"+msg.channel.name+"' !");
        if (scmd === "listemojis") {
          if (msg.channel.id === "685181829577572423") {
            const emojiList = msg.guild.emojis.map((e, x) => (x + ' = ' + e) + ' | `' +e.name+"`").join("\n");
            msg.channel.send({embed:{fields:[{'name': '681557736084865174', 'value': '<:burn:681557736084865174> = burn'}, {'name': '681617629030776842', 'value': '<:vote:681617629030776842> = vote'}, {'name': '682335438719156234', 'value': '<:water:682335438719156234> = water'}, {'name': '682534876318007320', 'value': '<:block_anvil:682534876318007320> = block_anvil'}, {'name': '682534876448161832', 'value': '<:block_beacon:682534876448161832> = block_beacon'}, {'name': '682534876607676418', 'value': '<:block_dragonhead:682534876607676418> = block_dragonhead'}, {'name': '682534876678979584', 'value': '<:block_bedrock:682534876678979584> = block_bedrock'}, {'name': '682534876783837216', 'value': '<:block_chest:682534876783837216> = block_chest'}, {'name': '682534876905603083', 'value': '<:block_enchantingtable:682534876905603083> = block_enchantingtable'}, {'name': '682534876951478272', 'value': '<:block_cobblestone:682534876951478272> = block_cobblestone'}, {'name': '682534877014523931', 'value': '<:block_dragonegg:682534877014523931> = block_dragonegg'}, {'name': '682534877022781573', 'value': '<:block_craftingtable:682534877022781573> = block_craftingtable'}, {'name': '682534877031170048', 'value': '<:block_dirt:682534877031170048> = block_dirt'}, {'name': '682534877110861858', 'value': '<:block_commandblock:682534877110861858> = block_commandblock'}, {'name': '682534877152673858', 'value': '<:block_diamond:682534877152673858> = block_diamond'}, {'name': '682534877287284736', 'value': '<:block_furnace:682534877287284736> = block_furnace'}, {'name': '682534877454794754', 'value': '<:block_gold:682534877454794754> = block_gold'}, {'name': '682534877479829541', 'value': '<:block_magma:682534877479829541> = block_magma'}, {'name': '682534877492412416', 'value': '<:block_iron:682534877492412416> = block_iron'}, {'name': '682534877496606722', 'value': '<:block_jukebox:682534877496606722> = block_jukebox'}, {'name': '682534877609852939', 'value': '<:block_oakdoor:682534877609852939> = block_oakdoor'}, {'name': '682534877681156127', 'value': '<:block_spawner:682534877681156127> = block_spawner'}, {'name': '682534877685481472', 'value': '<:block_glowstone:682534877685481472> = block_glowstone'}, {'name': '682534877773561869', 'value': '<:block_oakleaves:682534877773561869> = block_oakleaves'}, {'name': '682534877815767040', 'value': '<:block_grass:682534877815767040> = block_grass'}, {'name': '682534877832151050', 'value': '<:block_melon:682534877832151050> = block_melon'}, {'name': '682534877874225194', 'value': '<:zombiehead:682534877874225194> = zombiehead'}, {'name': '682534877999923230', 'value': '<:block_oaklog:682534877999923230> = block_oaklog'}, {'name': '682534878033608711', 'value': '<:block_pumpkin:682534878033608711> = block_pumpkin'}, {'name': '682534878171889684', 'value': '<:block_tnt:682534878171889684> = block_tnt'}, {'name': '682534878256037890', 'value': '<:block_ice:682534878256037890> = block_ice'}, {'name': '682534878260101145', 'value': '<:creeperhead:682534878260101145> = creeperhead'}, {'name': '682534878335598611', 'value': '<:block_wool:682534878335598611> = block_wool'}, {'name': '682534878339661834', 'value': '<:block_stone:682534878339661834> = block_stone'}, {'name': '682534878620811264', 'value': '<:block_bookshelf:682534878620811264> = block_bookshelf'}, {'name': '682534878633263154', 'value': '<:block_redstone:682534878633263154> = block_redstone'}, {'name': '682534878645846016', 'value': '<:block_glass:682534878645846016> = block_glass'}, {'name': '682534878646239232', 'value': '<:block_oakplanks:682534878646239232> = block_oakplanks'}, {'name': '682534878679662597', 'value': '<:block_enderchest:682534878679662597> = block_enderchest'}, {'name': '682534878687920128', 'value': '<:mcfirestatic:682534878687920128> = mcfirestatic'}, {'name': '682535382516105231', 'value': '<:block_snow:682535382516105231> = block_snow'}, {'name': '682535382893461534', 'value': '<:block_sponge:682535382893461534> = block_sponge'}, {'name': '682535552666697760', 'value': '<:block_sand:682535552666697760> = block_sand'}, {'name': '682535788130467843', 'value': '<:skeletonhead:682535788130467843> = skeletonhead'}, {'name': '682535966170415114', 'value': '<:block_oakstairs:682535966170415114> = block_oakstairs'}, {'name': '682536723187892224', 'value': '<:block_bed:682536723187892224> = block_bed'}, {'name': '682536989509156865', 'value': '<:block_slime:682536989509156865> = block_slime'}, {'name': '682537382691602442', 'value': '<:mctorch:682537382691602442> = mctorch'}, {'name': '682537664888569896', 'value': '<:block_farmland:682537664888569896> = block_farmland'}, {'name': '682598303145263119', 'value': '<:flag_go:682598303145263119> = flag_go'}],color:255,title:"Liste des emojis"}})
          } else if (msg.guild.id === "681549703212564547") {
            console.log("ok")
            msg.channel.send("Petit malin ! Utilise cette commande sur "+msg.guild.channels.get('685181829577572423').toString()+" ! Cette commande est beaucoup trop encombrante. Ce serait le bordel. Comprenez-nous ! :cry:")
          } else {
            msg.channel.send("Cette commande doit être impérativement effectuée sur ce serveur : https://discord.gg/RjxK6Wt")
          }
        } else if (scmd === "help") {
          if (msg.guild.id === "681549703212564547") {
            msg.channel.send({embed:{author:{name:"Chat Bot",icon_url:client.user.avatarURL},color:0,title:"Aide des commandes",fields:[{name:"Préfixes : `"+prefix.join("`, `")+"`",value:"Exemples : `"+prefix.join("ping` = `")+"ping`"},{name:"- Économie :",value:"`eco get | set | add | remove`"},{name:"- Jeux :",value:"`pfc pierre | feuille | ciseaux`\n`chevaux <cheval> <montant>`"},{name:"- Rôles achetables :",value:"`investir` `grandir` `affaires`"},{name:"- Commandes fixes (parfois aléatoires) :",value:"`"+Object.keys(data).join("` `")+"`"},{name:"- Commandes dynamiques :",value:"\n`help` `ping`"},{name:"- Développeurs :",value:"`listemojis` (uniquement sur "+msg.guild.channels.get('685181829577572423').toString()+")"}]}});
          } else {
            msg.channel.send("Ce bot est celui du serveur de GoldenVal RPD du Grégoland.\nhttps://discord.gg/RjxK6Wt");
            msg.channel.send({embed:{author:{name:"Chat Bot",icon_url:client.user.avatarURL},color:0,title:"Aide des commandes",fields:[{name:"Préfixes : `"+prefix.join("`, `")+"`",value:"Exemples : `"+prefix.join("ping` = `")+"ping`"},{name:"- Économie :",value:"`eco get | set | add | remove`"},{name:"- Jeux :",value:"`pfc pierre | feuille | ciseaux`\n`chevaux <montant>`"},{name:"- Commandes fixes (parfois aléatoires) :",value:"`"+Object.keys(data).join("` `")+"`"},{name:"- Commandes dynamiques :",value:"\n`help` `ping`"},{name:"- Développeurs :",value:"`listemojis` (uniquement sur RPD du Grégoland)"}]}});
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
          return ecojs(guild, msg, cmd, scmd)
        } else if (scmd === "pfc") {
          return pfc(msg, cmd, scmd)
        } else if (scmd === "chevaux") {
          return chevaux(msg, cmd, scmd)
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
        } else if (scmd === "grandir") {
          if (msg.guild.id === "681549703212564547") {
            if (cmd.split(" ")[1] === "-y") {
              var ecoContents = fs.readFileSync('eco.yml', 'utf8');
              var eco = yaml.safeLoad(ecoContents);
              if (msg.guild.members.get(msg.author.id).roles.has("688386606012432399")) {
                msg.channel.send("Vous avez déjà le rôle")
              } else if (!msg.guild.members.get(msg.author.id).roles.has("688340581860114455")) {
                msg.channel.send("Il vous manque le rôle Auto-entrepreneur. Pour l'obtenir : faites```\n!investir\n```")
              } else if (eco[msg.author.id].money >= 500) {
                eco[msg.author.id].money -= 500;
                msg.guild.members.get(msg.author.id).addRole("688386606012432399");
                msg.channel.send("Vous avez le rôle");
                let ecoyaml = yaml.safeDump(eco);
                fs.writeFileSync('eco.yml', ecoyaml, 'utf8');
                msg.channel.send("Dans votre portefeuille, il y a `"+eco[msg.author.id].money+" "+eco.setup.devise+"` !");
              } else {
                msg.channel.send("Vous n'avez pas assez d'argent")
              }
            } else {
              msg.channel.send("Le rôle Entrepreneur expérimenté coûte 500 ₲");
              msg.channel.send("Pour l'obtenir : Tapez```\n!grandir -y\n```");
            }
          } else {
            msg.channel.send("Faites cette commande sur RPD du Grégoland");
          }
        } else if (scmd === "affaires") {
          if (msg.guild.id === "681549703212564547") {
            if (cmd.split(" ")[1] === "-y") {
              var ecoContents = fs.readFileSync('eco.yml', 'utf8');
              var eco = yaml.safeLoad(ecoContents);
              if (msg.guild.members.get(msg.author.id).roles.has("688386756940136465")) {
                msg.channel.send("Vous avez déjà le rôle")
              } else if (!msg.guild.members.get(msg.author.id).roles.has("688386606012432399")) {
                msg.channel.send("Il vous manque le rôle Entrepreneur expérimenté. Pour l'obtenir : faites```\n!grandir\n```")
              } else if (eco[msg.author.id].money >= 9999) {
                eco[msg.author.id].money -= 9999;
                msg.guild.members.get(msg.author.id).addRole("688386756940136465");
                msg.channel.send("Vous avez le rôle");
                let ecoyaml = yaml.safeDump(eco);
                fs.writeFileSync('eco.yml', ecoyaml, 'utf8');
                msg.channel.send("Dans votre portefeuille, il y a `"+eco[msg.author.id].money+" "+eco.setup.devise+"` !");
              } else {
                msg.channel.send("Vous n'avez pas assez d'argent")
              }
            } else {
              msg.channel.send("Le rôle Investisseur privilégié coûte 9999 ₲");
              msg.channel.send("Pour l'obtenir : Tapez```\n!affaires -y\n```");
            }
          } else {
            msg.channel.send("Faites cette commande sur RPD du Grégoland");
          }
        } else {
          try {
            var nb = msg.content.split(" ")[1]
            if (nb === undefined || data[scmd][parseInt(nb)-1] === undefined) {
              msg.channel.send(data[scmd][Math.floor(Math.random()*data[scmd].length)]);
            } else {
              msg.channel.send(data[scmd][parseInt(nb)-1]);
            }
          } catch (e) {}
        }
      } catch (e) {
        console.log(e);
      }
    }
  } else if (msg.channel.type === "dm") {
    try {
      if (prefix.indexOf(msg.content[0]) >= 0) {
        console.log("'"+msg.content+"' was executed by "+msg.author.tag+" in a dm channel !");
        var cmd = msg.content.slice(1);
        var scmd = cmd.split(" ")[0];
        if (scmd === "an") {
          client.guilds.get("681549703212564547").systemChannel.send({embed: {
            color: client.guilds.get("681549703212564547").members.get(msg.author.id).highestRole.color,
            author: {
              name: "Anonyme",
              icon_url: "https://image.flaticon.com/icons/png/512/36/36601.png"
            },
            description: msg.content.slice(4)
          }});
        } else if (scmd === "an+") {
          client.guilds.get("681549703212564547").systemChannel.send({embed: {
            color: 0,
            author: {
              name: "Anonyme",
              icon_url: "https://image.flaticon.com/icons/png/512/36/36601.png"
            },
            description: msg.content.slice(5)
          }});
        } else if (scmd === "id") {
          msg.reply("Ton id est : `"+msg.author.id+"` !")
        } else if (scmd === "eco") {
          return ecojs(guild, msg, cmd, scmd)
        } else if (scmd === "pfc") {
          return pfc(msg, cmd, scmd)
        } else if (scmd === "chevaux") {
          return chevaux(msg, cmd, scmd)
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
})

client.login(process.env.BOT_TOKEN);
