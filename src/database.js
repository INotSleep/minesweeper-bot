const { open, writeFile } = require("fs/promises");

var db = []

// Fixes empoty or not existing db file
open("../db.json", "r+").then(async (file: any) => {
  var rawFile = await file.read();
  var a = "";
	var fileContent = rawFile.buffer.toString();
	for (var i = 0; i < fileContent.length; i++) {
		if (fileContent[i] != Buffer.of(0).toString()) a+= fileContent[i];
	}
  db = a == "" ? [] : JSON.parse(a);
  await writeFile("db.json", JSON.stringify(db, null, 4));
  file.close();
});

function save(item) {
  open("db.json", "w").then(async(file) => {
		await file.write(JSON.stringify(item, null, 4));
	  file.close();
  });
};

exports.addItem = function (item) {
  db.push(item);
  save(db);
};

exports.insertData = function (data) {
  db = data;
  save(db);
};

exports.removeItem = function (item) {
  var index = db.indexOf(item);
  if (index == -1) return;
  db.splice(index, 1);
  save(db);
};

exports.changeItem = function (oldItem, newItem) {
  var index = db.indexOf(oldItem);
  if (index == -1) return;
  db[index] = newItem;
  save(db)
};

exports.find = function (item) {
  return db.indexOf(item);
};

exports.get = function (index) {
  return index < db.length ? db[index] : {};
}

exports.getDB = function () {
  return db;
}

exports.findGuild = function (guildId) {
  return db.indexOf(db.find(item => item.guildId == guildId));
}
