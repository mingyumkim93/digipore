module.exports = function (app, db) {
    
    let dao = require("./reviewdao")(db);
    app.post("/api/review",(req,res)=>{
        dao.createReview(req.body, function({err, data}){
            if (err) res.send(err);
            console.log(data);
        })
    });

    app.get("/api/review/:email",function(req,res){
        dao.getReviewByEmail(req.params.email,function({err,data}){
            if(err) res.send(err);
            res.json(data)
        })

    });
}
