module.exports = msg => {
	if (!msg.guild) return;
	const user = msg.mentions.users.first();
	if (user) {
		const member = msg.guild.member(user);
		if (member) {
			const position = msgmember.highestRole.comparePositionTo(member.highestRole);
			if (position > 0) {
				member
					.ban()
					.then(() => {
						msg.channel.send(member+" a été banni !");
					})
					.catch(err => {
						msg.channel.send("Je suis désolé, mais je ne peux pas bannir "+member+" !")
					});
			} else {
				msg.channel.send("Vous ne pouvez pas bannir une personne ayant un rôle supérieur au vôtre !")
			}
		} else {
			msg.channel.send("L'utilisateur n'est pas dans le serveur")
		}
	} else {
		msg.channel.send("Vous n'avez mentionné personne !")
	}
}
