var fs = require('fs');
var langMap = {"en": null};
var langDir = "./lang";
var files = fs.readdirSync(__dirname + '/' + langDir);
files.forEach(function(file) {
    var lang = file.slice(0,-5);//get rid of json suffix; -5 ~ .json
    langMap[lang] = require('./lang/' + file);
});
module.exports = langMap;
