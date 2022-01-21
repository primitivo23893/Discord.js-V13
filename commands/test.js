const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('Ejecute un test en consola.')
		.addUserOption(option => option.setName('target').setDescription('The user\'s avatar to show')),
	async execute(interaction) {

        console.log(interaction)
        return interaction.reply('TEST')
	},
};