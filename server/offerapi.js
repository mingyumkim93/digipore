module.exports = function (app, db){
    let dao = require("./offerdao")(db);
    app.post("/api/offer",function(req,res){
        dao.createOffer(req.body, function({err,data}){
            if (err) res.send(err);
            res.json(data);
        })
    })
}