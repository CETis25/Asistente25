require('dotenv').config();
let express = require('express');
let Nuts = require('nuts-serve').Nuts;

let app = express();

console.log(process.env.GITTOKEN);

let nuts = Nuts({
    // GitHub configuration
    repository: "HakkinDavid/Asistente",
    username: "HakkinDavid",
    token: process.env.GITTOKEN
});

app.use('/api', nuts.router);
app.use(express.static("public"));
app.listen(process.env.PORT || 3000);