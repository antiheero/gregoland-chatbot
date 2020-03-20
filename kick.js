module.exports = msg => {
	if (!msg.guild) return;
	const user = msg.mentions.users.first();
	if (user) {
		const msgmember = msg.guild.member(msg.author);
		const member = msg.guild.member(user);
		if (member) {
			const position = msgmember.highestRole.comparePositionTo(member.highestRole);
			if (position > 0) {
				member
					.kick()
					.then(() => {
						msg.channel.send(member+" a été expulsé !");
					})
					.catch(err => {
						msg.channel.send("Je suis désolé, mais je ne peux pas expulser "+member+" !")
					});
			} else {
				msg.channel.send("Vous ne pouvez pas expulser une personne ayant un rôle supérieur au vôtre !")
			}
		} else {
			msg.channel.send("L'utilisateur n'est pas dans le serveur")
		}
	} else {
		msg.channel.send("Vous n'avez mentionné personne !")
	}
}
