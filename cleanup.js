var argv = process.argv.slice(2);
if (argv.length != 1) {
  process.stderr.write("Provide path to be deleted. Received + `" + argv.join(",") + "`");
  process.exit(1)
}

var fs = require('fs');

var deleteRecursive = function (path) {
  if (fs.existsSync(path)) {
    if (fs.lstatSync(path).isDirectory()) {
      fs.readdirSync(path).forEach(function (file, index) {
        var currentPath = path + "/" + file;
        deleteRecursive(currentPath);
      });
      fs.rmdirSync(path);
    } else if (fs.lstatSync(path).isFile()) {
      fs.unlinkSync(path);
    } else {
      process.stderr.write("Path '" + path + "' neither file nor directory. Don't know what to do.");
      process.exit(2);
    }
  }
};

deleteRecursive(argv[0]);
