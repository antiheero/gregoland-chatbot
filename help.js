const fs = require('fs');
const yaml = require('js-yaml');
const yamlContents = fs.readFileSync('messages.yml', 'utf8');
const data = yaml.safeLoad(yamlContents);
module.exports = (client,prefix,msg) => {
	if (msg.guild.id === "681549703212564547") {
		msg.channel.send({embed:{author:{name:"Chat Bot",icon_url:client.user.avatarURL},color:0,title:"Aide des commandes",fields:[{name:"Préfixes : `"+prefix.join("`, `")+"`",value:"Exemples : `"+prefix.join("ping` = `")+"ping`"},{name:"- Hierarchie",value:"`cr` (compare role: compare les rôles de deux personnes)"},{name:"- Économie :",value:"`eco get | set | add | remove`"},{name:"- Jeux :",value:"`pfc pierre | feuille | ciseaux`\n`chevaux <cheval> <montant>`"},{name:"- Rôles achetables :",value:"`investir` `grandir` `affaires`"},{name:"- Commandes fixes (parfois aléatoires) :",value:"`"+Object.keys(data).join("` `")+"`"},{name:"- Modération",value:"`kick` `ban`"},{name:"- Commandes dynamiques :",value:"`help` `ping`"},{name:"- Développeurs :",value:"`listemojis` (uniquement sur "+msg.guild.channels.get('685181829577572423').toString()+")"}]}});
	} else {
		msg.channel.send("Ce bot est celui du serveur de GoldenVal RPD du Grégoland.\nhttps://discord.gg/RjxK6Wt");
		msg.channel.send({embed:{author:{name:"Chat Bot",icon_url:client.user.avatarURL},color:0,title:"Aide des commandes",fields:[{name:"Préfixes : `"+prefix.join("`, `")+"`",value:"Exemples : `"+prefix.join("ping` = `")+"ping`"},{name:"- Hierarchie",value:"`cr` (compare role: compare les rôles de deux personnes)"},{name:"- Économie :",value:"`eco get | set | add | remove`"},{name:"- Jeux :",value:"`pfc pierre | feuille | ciseaux`\n`chevaux <montant>`"},{name:"- Commandes fixes (parfois aléatoires) :",value:"`"+Object.keys(data).join("` `")+"`"},{name:"- Modération",value:"`kick` `ban`"},{name:"- Commandes dynamiques :",value:"\n`help` `ping`"},{name:"- Développeurs :",value:"`listemojis` (uniquement sur RPD du Grégoland)"}]}});
	}
}
