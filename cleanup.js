var argv = process.argv.slice(2);
if(argv.length != 1){
  process.stderr.write("Provide path to be deleted. Received + `" + argv.join(",") + "`");
  process.exit(1)
}

var fs = require('fs');

var deleteFolderRecursive = function(path){
  if(fs.existsSync(path)){
    fs.readdirSync(path).forEach(function(file, index){
      var currentPath = path + "/" + file;
      if(fs.lstatSync(currentPath).isDirectory()){
        deleteFolderRecursive(currentPath);
      }else{
        fs.unlinkSync(currentPath);
      }
    });
    fs.rmdirSync(path);
  }
};

deleteFolderRecursive(argv[0]);
