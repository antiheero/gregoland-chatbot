const fs = require('fs');
const yaml = require('js-yaml');
const Discord = require('discord.js');
const client = new Discord.Client();
const BOT_TOKEN = process.env.BOT_TOKEN;

const cool = require('cool-ascii-faces');
const cats = require("cat-ascii-faces");
const vaca = require("vaca");
const qrcode = require("qrcode");

console.log("Logging in with this token : \""+BOT_TOKEN+"\" !")

const prefix = ["!", "/"];
const yamlContents = fs.readFileSync('messages.yml', 'utf8');
const data = yaml.safeLoad(yamlContents);
console.log("YAML-messages loaded.");

const ecojs = require('./eco');
const pfc = require('./pfc');
const chevaux = require('./chevaux');
const kick = require('./kick');
const ban = require('./ban');
const help = require('./help');

// Files
const ymlattch = new Discord.MessageAttachment(yamlContents, "messages.yml");
const jsbuffer = fs.readFileSync('./index.js');
const jsattch = new Discord.MessageAttachment(jsbuffer, "index.js");

client.on('guildMemberAdd', member => {
	member.send(
		`Bienvenue sur le serveur <@${member.user.id}> !`
	);
	if (member.guild.id === "681549703212564547") {
		member.addRole("681556751509880889")
		member.send("Vive le Parti unique !\nTu as reçu ton rôle !\nLe Parti t'accorde 100 ₲ ! Pour les recevoir, fais : ```\n!eco\n```");
	} else if (member.guild.id === "689476199172407440") {
		member.addRole("689477316744970363");
	}
})

client.on('messageReactionAdd', (messageReaction,user) => {
	const guild = client.guilds.get("681549703212564547");
	console.log(">1");
	if (messageReaction.message.guild === "681549703212564547" && messageReaction.message.id === "693541563330199583") {
		const member = guild.member(user);
		member.addRole("681556751509880889");
		console.log(">2");
		if (messageReaction.emoji.toString() === "🇦") {
			member.addRole("686214959168094208");
			console.log(">3");
		} else if (messageReaction.emoji.toString() === "🇧") {
			member.addRole("686214873507823655");
			console.log(">3");
		} else if (messageReaction.emoji.toString() === "🇨") {
			member.addRole("693530176469991505");
			console.log(">3");
		}
	}
})

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
})

client.on('messageDelete', msg => {
	console.log("This message : \""+msg.content+"\" ("+msg.author.tag+") was deleted !")
})

client.on('messageUpdate', (oldmsg,newmsg) => {
	console.log("This message : \""+oldmsg.content+"\" ("+oldmsg.author.tag+") was updated to \""+newmsg.content+"\" !")
})

client.on('message', msg => {
	const guild = client.guilds.get("681549703212564547");
	if (msg.channel.type === "text") {
		if (prefix.indexOf(msg.content[0]) >= 0) {
			try {
				var cmd = msg.content.slice(1);
				var scmd = cmd.split(" ")[0];
				console.log("'"+msg.content+"' was executed by "+msg.author.tag+" on '"+msg.guild.name+"'.'"+msg.channel.name+"' !");
				if (scmd === "help") {
					return help(client,prefix,msg)
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
				} else if (scmd === "kick") {
					return kick(msg)
				} else if (scmd === "ban") {
					return ban(msg)
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
				} else if (scmd === "avatar") {
					msg.channel.send("Your avatar :",{files:[msg.author.avatarURL]})
				} else if (scmd === "face") {
					msg.channel.send("```\n"+cool()+"\n```");
				} else if (scmd === "cow") {
					msg.channel.send("```\n"+vaca()+"\n```");
				} else if (scmd === "cat") {
					msg.channel.send("```\n"+cats()+"\n```");
				} else if (scmd === "qr") {
					var qrtext = cmd.slice(3);
					var qropts = {
						errorCorrectionLevel: 'H',
						type: 'image/jpeg',
						quality: 0.5,
						margin: 2,
						color: {
							"dark":"#00000000",
							"light":"#FFFFFFFF"
						}
					};
					qrcode.toDataURL(qrtext,qropts,
						function (err,url) {
							if (err) {
								msg.channel.send("Oops, there was an error !");
								console.log(err);
							} else {
								msg.channel.send(url);
							}
						}
					);
				} else if (scmd === "cr") {
					const users = msg.mentions.users.array();
					const user = users[0];
					if (user) {
						const msgmember = msg.guild.member(msg.author);
						const member = msg.guild.member(user);
						if (users.length === 1) {
							if (member) {
								if (msg.guild.owner === msgmember) {
									msg.channel.send("Vous êtes le propriétaire du serveur ! Par conséquent, vous avez toutes les permissions !")
								} else if (msg.guild.owner === member) {
									msg.channel.send(member+" est le propriétaire du serveur et a toutes les permissions !")
								}
								const position = msgmember.highestRole.comparePositionTo(member.highestRole);
								if (position < 0) {
									msg.channel.send("Vous avez un rôle inférieur à "+member+" (à "+-1*position+" rôle(s)) !");
								} else if (position === 0) {
									msg.channel.send("Vous avez des rôles égaux");
								} else if (position > 0) {
									msg.channel.send("Vous avez un rôle supérieur à "+member+" (à "+position+" rôle(s)) !")
								}
							} else {
								msg.channel.send("L'utilisateur n'est pas dans le serveur")
							}
						} else {
							const user2 = users[1];
							if (user2) {
								const member2 = msg.guild.member(user2);
								if (member2) {
									if (msg.guild.owner === member) {
										msg.channel.send(member+" est le propriétaire du serveur et a toutes les permissions !")
									} else if (msg.guild.owner === member2) {
										msg.channel.send(member2+" est le propriétaire du serveur et a toutes les permissions !")
									}
									const position = member2.highestRole.comparePositionTo(member.highestRole);
									if (position < 0) {
										msg.channel.send(member2+" a un rôle inférieur à "+member+" (à "+-1*position+" rôle(s)) !");
									} else if (position === 0) {
										msg.channel.send(member+" et "+member2+" des rôles égaux");
									} else if (position > 0) {
										msg.channel.send(member2+" a un rôle supérieur à "+member+" (à "+position+" rôle(s)) !")
									}
								} else {
									msg.channel.send("Un utilisateur n'est pas dans le serveur")
								}
							}
						}
					} else {
						msg.channel.send("Personne n'est mentionné !")
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
		} else {
			console.log(msg.author.tag+" said \""+msg.content+"\" on '"+msg.guild.name+"'.'"+msg.channel.name+"' !");
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
			} else {
				console.log(msg.author.tag+" said \""+msg.content+"\" in a dm channel")
			}
		} catch (e) {
			console.log(e);
		}
	}
})

client.login(BOT_TOKEN);
