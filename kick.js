module.exports = (msg,cmd,scmd) => {
	if (!msg.guild) return;
	const user = msg.mentions.users.first();
	if (user) {
		const member = msg.guild.member(user);
		if (member) {
			member
				.kick()
				.then(() => {
					msg.channel.send(member+" a été expulsé !");
				})
				.catch(err => {
					msg.channel.send("Je suis désolé, mais je ne peux pas expulser "+member+" !")
				});
		} else {
			msg.channel.send("L'utilisateur n'est pas dans le serveur")
		}
	} else {
		msg.channel.send("Vous n'avez mentionné personne !")
	}
}
