module.exports=function(app,db){
    let dao=require("./requestdao")(db);

    app.get("/api/requests",function(req,resp){
        dao.getAll(function({error,data}){
             resp.json(data);
        })
    });

    app.get("/api/requests/:id",function(req,resp){
        let id=Number(req.params.id);
        dao.get(id,function({error,data}){
            resp.json(data);
        })
    });

    app.get("/api/requests/:id/users",function(req,resp){
        let id=Number(req.params.id);
        dao.getBooks(id,function({error,data}){
            resp.json(data);
        })

    });

    app.post("/api/requests",function(req,resp){
        dao.insert(req.body,function({error,data}){
            resp.json(data);
        })
    });

}