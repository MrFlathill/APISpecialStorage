const express = require("express");
const app = express();
const fs = require('fs');
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const swaggerUi = require('swagger-ui-express');

const jsyaml = require('js-yaml');
var spec = fs.readFileSync('swagger.yml', 'utf8');
var swaggerDocument = jsyaml.load(spec);

// Import of Routers
const tankRouter = require("./tank/tank.router.js");
const clientRouter = require("./client/client.router.js");
const bottomRouter = require("./bottom/bottom.router.js");
// XML Body Parser
const xmlparser = require("express-xml-bodyparser");
app.use(xmlparser({ explicitRoot: false }));

// We have to allow all traffic so we dont get a CORS-Error (Cross-Origin-Ressource-Sharing)
app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    response.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept,Authorization"
    );
    next();
});

// Definition off diffrent Routes
// We use the MC model (Model Controller)
app.use("/api/v1/tank", tankRouter);
app.use("/api/v1/client", clientRouter);
app.use("/api/v1/bottom", bottomRouter);

// Swagger UI
app.use(
    '/api/v1/',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);
app.listen(8090, () => console.log("Web-Service listen on port 8090"));