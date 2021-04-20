const fetch = require("node-fetch");
const Discord = require('discord.js');

const prefix = "/";

const client = new Discord.Client();

client.login(process.env.token);

async function getPrice() {
  let raw = await fetch('https://api.coinbase.com/v2/prices/ltc-usd/spot');
    let json = await raw.json()
      return json.data.amount
};

async function main() {
  let ltcPrice = await getPrice()
  await client.user.setActivity(`$${ltcPrice}`, { type: 'WATCHING' })
    .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
    .catch(err => console.log(err));
};

setInterval(() => main(), 30000);