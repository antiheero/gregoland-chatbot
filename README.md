# Gregoland ChatBot
## Qu'est-ce que c'est ?
Globalement, c'est un bot discord que l'on peut intégrer à un serveur. Il possède des fonctions de modération, d'économie...

## Qu'a-t-il de plus qu'un autre bot discord ?
Bah, c'est moi qui l'ai fait, c'est mon mien à moi que j'ai fait **moi-même**.

## Quelles sont ses fonctions ?
- [X] Module d'économie
- [X] Module de modération (fonctions !kick et !ban)
- [ ] Module de filtrations des vulgarités (on peut y bosser)
- [X] Module de pari sur des chevaux virtuels !
- [X] Module de Pierre-feuille-ciseaux
- [X] Module d'anonymisation des messages à deux niveaux (!an et !an+)
- [ ] Module de cafetière

## Comment l'intégrer à mon serveur ?
Si vous voulez le mettre tel quel, utilisez [ce lien](https://discordapp.com/api/oauth2/authorize?client_id=684464572333293605&permissions=8&scope=bot) !

Sinon, vous pouvez cloner le répertoire, mais il y a quelques variables d'environnement à régler :
- BOT_TOKEN
- CLIENT_ID
- CLIENT_SECRET

Tutoriel pas-à-pas en 20 étapes :
1. Allez sur [le portail développeur de Discord](https://discordapp.com/developers/).
2. Créez une application (New Application).
3. Éditez les informations (personnalisez le bot avec un nom, un avatar).
4. Mettez en lieu sûr les valeurs "Client ID" et "Client Secret".
5. Dans l'onglet OAuth2, sélectionnez "Bot" et ouvrez l'url donnée.
6. Ajoutez votre bot a serveur.
7. Dans l'onglet Bot, cliquez sur "Add Bot".
8. Cliquez sur "Copy" dans la partie TOKEN.
9. Notez-le dans un endroit sûr.
10. Créez un compte ou connectez-vous sur [Heroku](heroku.com).
11. Créez une application.
12. Dans l'onglet "Deploy", liez votre application à Github et précisez ce répertoire.
13. Déployez l'application.
14. Dans l'onglet "Resources", activez "worker".
15. Configurez les secrets dans l'onglet "Settings" :
    - BOT_TOKEN : le token que vous avez mis en lieu sûr;
    - CLIENT_ID : l'identifiant que vous avez mis en lieu sûr;
    - CLIENT_SECRET : la dernière valeur que vous avez mis en lieu sûr.
16. Validez.
17. Retournez sur Discord.
18. Attribuez un rôle au bot.
19. Donnez-lui les permissions administrateur.
20. Profitez bien !
