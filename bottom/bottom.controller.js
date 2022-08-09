const bottomModel = require("./bottom.model");
const jsonXml = require("jsontoxml");

function listBottomsAction(request, response) {
    const sort = request.query.sort ? request.query.sort : "";
    bottomModel
        .getAllBottoms(sort)
        .then((bottoms) =>
            response.format({
                "application/xml": () => {
                    bottoms = bottoms.map((bottom) => ({ bottom }));
                    response.send(`<bottoms>${jsonXml(bottoms)}</bottoms>`);
                },
                "application/json": () => response.json(bottoms),
                default: () => response.json(bottoms),
            })
        )
        .catch((error) =>
            response.format({
                "application/xml": () =>
                    response.status(error === "Database error" ? 500 : 400).send(error),
                "application/json": () =>
                    response.status(error === "Database error" ? 500 : 400).json(error),
                default: () =>
                    response.status(error === "Database error" ? 500 : 400).json(error),
            })
        );
}

function viewBottomAction(request, response) {
    bottomModel
        .getBottomById(request.params.bid)
        .then((bottom) =>
            response.format({
                "application/xml": () => response.send(`<bottom>${jsonXml(bottom)}</bottom>`),
                "application/json": () => response.json(bottom),
                default: () => response.json(bottom),
            }))
        .catch((error) =>
            response.format({
                "application/xml": () =>
                    response.status(error === "Database error" ? 500 : 400).send(error),
                "application/json": () =>
                    response.status(error === "Database error" ? 500 : 400).json(error),
                default: () =>
                    response.status(error === "Database error" ? 500 : 400).json(error),
            })
        );
}

function insertBottomAction(request, response) {
    const bottom = {
        bid: parseInt(request.body.bid, 10),
        bname: request.body.bname,
        bdescription: request.body.bdescription,
        bheight: parseInt(request.body.bheight, 10),
        bdiameter: parseInt(request.body.bdiameter, 10),
        bvolume: parseFloat(request.body.bvolume),
        bprice: parseFloat(request.body.bprice),
    };
    bottomModel
        .insertBottom(bottom)
        .then((res) =>
            response.format({
                "application/xml": () => response.status(201).send(res),
                "application/json": () => response.status(201).json(res),
                default: () => response.status(201).json(res),
            }))
        .catch((error) =>
            response.format({
                "application/xml": () =>
                    response.status(error === "Database error" ? 500 : 400).send(error),
                "application/json": () =>
                    response.status(error === "Database error" ? 500 : 400).json(error),
                default: () =>
                    response.status(error === "Database error" ? 500 : 400).json(error),
            }));
}

function updateBottomAction(request, response) {
    const bottom = {
        bid: parseInt(request.body.bid, 10),
        bname: request.body.bname,
        bdescription: request.body.bdescription,
        bheight: parseInt(request.body.bheight, 10),
        bdiameter: parseInt(request.body.bdiameter, 10),
        bvolume: parseFloat(request.body.bvolume),
        bprice: parseFloat(request.body.bprice),
    };
    bottomModel
        .updateBottom(bottom)
        .then((res) =>
            response.format({
                "application/xml": () => response.send(res),
                "application/json": () => response.json(res),
                default: () => response.json(res),
            }))
        .catch((error) =>
            response.format({
                "application/xml": () =>
                    response.status(error === "Database error" ? 500 : 400).send(error),
                "application/json": () =>
                    response.status(error === "Database error" ? 500 : 400).json(error),
                default: () =>
                    response.status(error === "Database error" ? 500 : 400).json(error),
            }));
}

function removeBottomAction(request, response) {
    bottomModel
        .deleteBottom(request.params.bid)
        .then((res) =>
            response.format({
                "application/xml": () => response.send(res),
                "application/json": () => response.json(res),
                default: () => response.json(res),
            }))
        .catch((error) =>
            response.format({
                "application/xml": () =>
                    response.status(error === "Database error" ? 500 : 400).send(error),
                "application/json": () =>
                    response.status(error === "Database error" ? 500 : 400).json(error),
                default: () =>
                    response.status(error === "Database error" ? 500 : 400).json(error),
            })
        );
}

module.exports = {
    listBottomsAction,
    viewBottomAction,
    insertBottomAction,
    updateBottomAction,
    removeBottomAction,
}