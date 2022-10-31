require('dotenv').config();
let express = require('express');
let Nuts = require('nuts-serve').Nuts;

let app = express();

let nuts = Nuts({
    // GitHub configuration
    repository: "HakkinDavid/Asistente",
    token: process.env.GITTOKEN
});

app.use('#api', nuts.router);
app.use(express.static("public"));
app.listen(process.env.PORT || 3000);