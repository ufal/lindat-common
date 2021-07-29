function standaloneHtml(actualContent, publicPath){
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <title>LINDAT/CLARIAH-CZ Research Infrastructure</title>
  <meta name="viewport" content="width=device-width" />
  <meta name="keywords" content="Language Resources, Infrastructure, Research,
          Natural Language Processing, Multimedia, Czech language, Computational
          Linguistics, Speech, Text, Corpus, Corpora" />
  <meta name="description" content="LINDAT CLARIAH-CZ Research Infrastructure" />
  <link href="${publicPath}public/css/lindat.css" rel="stylesheet" />
</head>
<body id="lindat-tools">
 ${actualContent}
</body>
</html>
  `
}

export {standaloneHtml};
