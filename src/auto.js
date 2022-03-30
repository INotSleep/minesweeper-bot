const generateGame = require("./generateGame.js");
const { getDB, findChannel, removeItem, get } = require("database.js");

module.exports = function startAuto(client) {
  setInterval(async() => {
    var db = getDB()
    for (var item of db ) {
      var channel = await client.channels.fetch(channelId).catch(e => {
        removeItem(get(findChannel(channelId)));
        continue;
      }
      channel.send(generateGame(db.inputs[0], db.inputs[1], db.inputs[2], false, db.inputs[3]))
    }
  }, 60*1000);
}
