module.exports = function(app, db){
    let dao = require("./erranddao")(db);

    let getAllErrands = function(req, resp) {
        dao.getAll(function({error, data}) {
             resp.json(data);
        })
    };
    app.get("/api/errands", getAllErrands);

    let getErrand = function(req, resp){
        let id = Number(req.params.id);
        dao.get(id, function({error, data}){
            resp.json(data);
        })
    };
    app.get("/api/errands/:id", getErrand);

    let postErrand = function (req, resp) {
        dao.insert(req.body, function ({ error, data }) {
            resp.json(data);
        })
    }
    app.post("/api/errands", postErrand)
    
    updataErrand = function(req,resp){
        dao.update(req.body,req.params.id,function({error,data}){
            resp.json(data);
        })
    }
    app.put("/api/errands/:id", updataErrand);

    deleteErrand = function(req,resp){
        dao.delete(req.params.id,function({error,data}){
            resp.json(data);
        })
    }
    app.delete("/api/errands/:id",deleteErrand);

}