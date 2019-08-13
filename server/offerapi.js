module.exports = function (app, db){
    let dao = require("./offerdao")(db);
    app.post("/api/offer",function(req,res){
        dao.createOffer(req.body, function({err,data}){
            res.json(data);
        })
    });

    app.get('/api/offer/:id',function(req,res){
        dao.getOffersByErrandId(req.params.id,function({err,data}){
            res.json(data);
        })
    })

    app.put('/api/offer/:id',function(req,res){
        dao.updateOffer(req.body,req.params.id,function({err,data}){
            res.json(data);
        })
    })
}