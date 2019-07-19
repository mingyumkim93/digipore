module.exports = function(app, db){
    let dao = require("./requestdao")(db);

    let getAllErrands = function(req, resp) {
        dao.getAll(function({error, data}) {
             resp.json(data);
        })
    };
    app.get("/api/requests", getAllErrands);

    let getErrand = function(req, resp){
        let id = Number(req.params.id);
        dao.get(id, function({error, data}){
            resp.json(data);
        })
    };
    app.get("/api/requests/:id", getErrand);

    let postErrand = function (req, resp) {
        dao.insert(req.body, function ({ error, data }) {
            resp.json(data);
        })
    }
    app.post("/api/requests", postErrand)
    

    app.put("/api/requests/:id",function(req,resp){
        dao.update(req.body,req.params.id,function({error,data}){
            resp.json(data);
        })
    })

}