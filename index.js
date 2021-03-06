const { Client, Collection, Intents } = require('discord.js');
const intents = new Intents(32767);
const client = new Client({intents});
require('dotenv').config();

const fs = require('fs');

client.commands = new Collection();

 const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

 for (const file of commandFiles) {
     const command = require(`./commands/${file}`);
     client.commands.set(command.data.name, command);
 }



client.on('ready', ()=> {

    console.log('Listo.');

    client.user.setPresence({
        status:'online',
        activities:[{
            name:'Minecraft',
            type:'PLAYING',
            }]
    })

});



client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'Hubo un error al ejecutar este comando!', ephemeral: true });
	}
});

client.login(process.env.token);