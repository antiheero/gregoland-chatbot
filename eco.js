const fs = require('fs');
module.exports = (msg,cmd,scmd) => {
	if (cmd.split(" ")[1] === undefined) {
		var ecoContents = fs.readFileSync('eco.json', 'utf8');
		var eco = JSON.parse(ecoContents);
		if (msg.channel.type === "dm") {
			var id = msg.author.id;
			var pers = "Vous possédez : `";
		} else if (msg.mentions.members.first() === undefined) {
			var id = msg.author.id;
			var pers = "Vous possédez : `";
		} else {
			var id = msg.mentions.members.first().id;
			var pers = "<@"+id+"> `("+id+")`"+" possède : `";
		}
		if (eco[msg.guild.id][id] === undefined) {
			eco[msg.guild.id][msg.author.id] = {money: eco.setup.base};
			let ecojson = JSON.stringify(eco);
			fs.writeFileSync('eco.json', ecojson, 'utf8');
		}
		msg.channel.send(pers+eco[msg.guild.id][msg.author.id].money+" "+eco.setup.devise+"` !");
	} else if (cmd.split(" ")[1] === "get") {
		var ecoContents = fs.readFileSync('eco.json', 'utf8');
		var eco = JSON.parse(ecoContents);
		if (msg.channel.type === "dm") {
			var id = msg.author.id;
			var pers = "Vous possédez : `";
		} else if (msg.mentions.members.first() === undefined) {
			var id = msg.author.id;
			var pers = "Vous possédez : `";
		} else {
			var id = msg.mentions.members.first().id;
			var pers = "<@"+id+"> `("+id+")`"+" possède : `";
		}
		if (eco[msg.guild.id][id] === undefined) {
			eco[msg.guild.id][msg.author.id] = {money: eco.setup.base};
			let ecojson = JSON.stringify(eco);
			fs.writeFileSync('eco.json', ecojson, 'utf8');
		}
		msg.channel.send(pers+eco[msg.guild.id][msg.author.id].money+" "+eco.setup.devise+"` !");
	} else if (cmd.split(" ")[1] === "add") {
		if (msg.guild.member(msg.author.id).hasPermission(8)) {
			if (cmd.split(" ")[2] === undefined) {
				msg.channel.send("Veuillez préciser un nombre !")
			} else if (parseInt(cmd.split(" ")[2]) === NaN) {
				msg.channel.send("Ce n'est pas un nombre !")
			} else {
				if (msg.channel.type === "dm") {
					var id = msg.author.id;
					var pers = "Vous possédez : `";
				} else if (msg.mentions.members.first() === undefined) {
					var id = msg.author.id;
					var pers = "Vous possédez : `";
				} else {
					var id = msg.mentions.members.first().id;
					var pers = "<@"+id+"> `("+id+")`"+" possède : `";
				}
				var ecoContents = fs.readFileSync('eco.json', 'utf8');
				var eco = JSON.parse(ecoContents);
				if (eco[msg.guild.id][id] === undefined) {
					eco[msg.guild.id][id] = {money: eco.setup.base+parseInt(cmd.split(" ")[2])};
					let ecojson = JSON.stringify(eco);
					fs.writeFileSync('eco.json', ecojson, 'utf8');
				} else {
					eco[msg.guild.id][id].money += parseInt(cmd.split(" ")[2]);
					let ecojson = JSON.stringify(eco);
					fs.writeFileSync('eco.json', ecojson, 'utf8');
				}
				var ecoContents = fs.readFileSync('eco.json', 'utf8');
				var eco = JSON.parse(ecoContents);
							
				msg.channel.send(pers+eco[msg.guild.id][id].money+" "+eco.setup.devise+"` !");
			}
		} else {
			msg.channel.send("Petit malin ! Tu n'as pas la permission");
		}
	} else if (cmd.split(" ")[1] === "set") {
		if (msg.guild.member(msg.author.id).hasPermission(8)) {
			if (cmd.split(" ")[2] === undefined) {
				msg.channel.send("Veuillez préciser un nombre !")
			} else if (parseInt(cmd.split(" ")[2]) === NaN) {
				msg.channel.send("Ce n'est pas un nombre !")
			} else {
				if (msg.channel.type === "dm") {
					var id = msg.author.id;
					var pers = "Vous possédez : `";
				} else if (msg.mentions.members.first() === undefined) {
					var id = msg.author.id;
					var pers = "Vous possédez : `";
				} else {
					var id = msg.mentions.members.first().id;
					var pers = "<@"+id+"> `("+id+")`"+" possède : `";
				}
				var ecoContents = fs.readFileSync('eco.json', 'utf8');
				var eco = JSON.parse(ecoContents);
				if (eco[msg.guild.id][id] === undefined) {
					eco[msg.guild.id][id] = {money: parseInt(cmd.split(" ")[2])};
					let ecojson = JSON.stringify(eco);
					fs.writeFileSync('eco.json', ecojson, 'utf8');
				} else {
					eco[msg.guild.id][id].money = parseInt(cmd.split(" ")[2]);
					let ecojson = JSON.stringify(eco);
					fs.writeFileSync('eco.json', ecojson, 'utf8');
				}
				var ecoContents = fs.readFileSync('eco.json', 'utf8');
				var eco = JSON.parse(ecoContents);
							
				msg.channel.send(pers+eco[msg.guild.id][id].money+" "+eco.setup.devise+"` !");
			}
		} else {
			msg.channel.send("Petit malin ! Tu n'as pas la permission");
		}
	} else if (cmd.split(" ")[1] === "remove") {
		if (msg.guild.member(msg.author.id).hasPermission(8)) {
			if (cmd.split(" ")[2] === undefined) {
				msg.channel.send("Veuillez préciser un nombre !")
			} else if (parseInt(cmd.split(" ")[2]) === NaN) {
				msg.channel.send("Ce n'est pas un nombre !")
			} else {
				if (msg.channel.type === "dm") {
					var id = msg.author.id;
					var pers = "Vous possédez : `";
				} else if (msg.mentions.members.first() === undefined) {
					var id = msg.author.id;
					var pers = "Vous possédez : `";
				} else {
					var id = msg.mentions.members.first().id;
					var pers = "<@"+id+"> `("+id+")`"+" possède : `";
				}
				var ecoContents = fs.readFileSync('eco.json', 'utf8');
				var eco = JSON.parse(ecoContents);
				if (eco[msg.guild.id][id] === undefined) {
					eco[msg.guild.id][id] = {money: eco.setup.base-parseInt(cmd.split(" ")[2])};
					let ecojson = JSON.stringify(eco);
					fs.writeFileSync('eco.json', ecojson, 'utf8');
				} else {
					eco[msg.guild.id][id].money -= parseInt(cmd.split(" ")[2]);
					let ecojson = JSON.stringify(eco);
					fs.writeFileSync('eco.json', ecojson, 'utf8');
				}
				var ecoContents = fs.readFileSync('eco.json', 'utf8');
				var eco = JSON.parse(ecoContents);
							
				msg.channel.send(pers+eco[msg.guild.id][id].money+" "+eco.setup.devise+"` !");
			}
		} else {
			msg.channel.send("Petit malin ! Tu n'as pas la permission");
		}
	}
}
