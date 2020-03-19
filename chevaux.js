const fs = require('fs');
const yaml = require('js-yaml');

module.exports = (msg,cmd,scmd) => {
  const usermsg = msg;
  var ecoContents = fs.readFileSync('eco.yml', 'utf8');
  var eco = yaml.safeLoad(ecoContents);
  if (parseInt(cmd.split(" ")[1]) >= 1 && parseInt(cmd.split(" ")[1]) <= 12 && parseInt(cmd.split(" ")[2]) >= 0) {
    if (eco[msg.author.id].money >= parseInt(cmd.split(" ")[2])) {
      msg.channel.send("Vous pariez "+cmd.split(" ")[2]+" ₲ sur le cheval "+cmd.split(" ")[1]+" !");
      msg.channel.send({embed:{title:"Course de chevaux",description:"01. :racehorse:\n02. :racehorse:\n03. :racehorse:\n04. :racehorse:\n05. :racehorse:\n06. :racehorse:\n07. :racehorse:\n08. :racehorse:\n09. :racehorse:\n10. :racehorse:\n11. :racehorse:\n12. :racehorse:"}})
	.then(message => {
	  const chevaux = [0,0,0,0,0,0,0,0,0,0,0,0];
	  const spaces = ["."];
	  for (var i = 0;i<120;i++) {
	    spaces.push(spaces[i]+".")
	  }
	  while (Math.floor(Math.max(...chevaux)) < 80) {
	    for (var i = 0;i<chevaux.length;i++) {
	      chevaux[i] += Math.floor(Math.random()*35);
	    }
	    message.edit(chevaux[parseInt(cmd.split(" ")[1])-1]+"/"+Math.max(...chevaux),{embed:{title:"Course de chevaux",description:"01. "+spaces[chevaux[0]]+":racehorse:\n02. "+spaces[chevaux[1]]+":racehorse:\n03. "+spaces[chevaux[2]]+":racehorse:\n04. "+spaces[chevaux[3]]+":racehorse:\n05. "+spaces[chevaux[4]]+":racehorse:\n06. "+spaces[chevaux[5]]+":racehorse:\n07. "+spaces[chevaux[6]]+":racehorse:\n08. "+spaces[chevaux[7]]+":racehorse:\n09. "+spaces[chevaux[8]]+":racehorse:\n10. "+spaces[chevaux[9]]+":racehorse:\n11. "+spaces[chevaux[10]]+":racehorse:\n12. "+spaces[chevaux[11]]+":racehorse:"}})
	      .then(msg => {
		if (parseInt(msg.content.split("/")[1]) >= 80) {
		  if (msg.content.split("/")[0] === msg.content.split("/")[1]) {
		    msg.channel.send("Vous avez gagné "+cmd.split(" ")[2]*12+" ₲ !");
		    var gain = parseInt(cmd.split(" ")[2])*12;
		  } else {
		    msg.channel.send("Vous avez perdu "+cmd.split(" ")[2]+" ₲ !");
		    var gain = -1*parseInt(cmd.split(" ")[2]);
		  }
		  eco[usermsg.author.id].money += gain;
		  let ecoyaml = yaml.safeDump(eco);
		  fs.writeFileSync('eco.yml', ecoyaml, 'utf8');
		  msg.channel.send("Dans votre portefeuille, il y a `"+eco[usermsg.author.id].money+" "+eco.setup.devise+"` !");
		}
	      });
	  }
	});
    } else {
      msg.channel.send("Il faut de l'argent pour parier ! Tête de linotte !")
    }
  } else {
    msg.channel.send("Veuillez spécifier un cheval et montant à parier!")
  }
}
