const generateGame = require("./generateGame.js");
const { getDB, findChannel, removeItem, get } = require("./database.js");

module.exports = function startAuto(client) {
  setInterval(async() => {
    var db = getDB()
    for (var item of db ) {
      var channel = await client.channels.fetch(item.channelId).catch(e => {
        removeItem(get(findChannel(item.channelId)));
      })
      if (!channel) return;
	  channel.send(generateGame(item.inputs[0], item.inputs[1], item.inputs[2], false, item.inputs[3]))
    }
  }, 60*1000);
}
