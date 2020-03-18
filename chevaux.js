const fs = require('fs');
const yaml = require('js-yaml');
module.exports = (msg,cmd,scmd) => {
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
}
