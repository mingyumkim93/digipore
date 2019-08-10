module.exports=function(db){
    return {
        //first do get and post first
        getAll(cb){
            db.query("SELECT * FROM request",cb);
                    //sql, cb
        },
        get(id,cb){
            db.paramQuery("SELECT * FROM request where id=?",[id],
                        function({error,data}){
                        //sql, params, cb
                if (error) cb({error});
                else if (data.length) cb({data:data[0]});
                else cb({data:{}});                
            });
        },
        insert(request,cb){
            db.paramQuery("INSERT INTO request SET ?",request,({error,data}) => {
                if (error) cb({error});
                else this.get(data.insertId,cb);
            })
        },

        update(req,id,cb){
            db.paramQuery( `UPDATE request SET state=?, title=?, explanation=?, providing_user_id=?, requestedDayAndTime=?, acceptedDayAndTime=?, location=? where id=${id}`,
                            [req.state,req.title,req.explanation,req.providing_user_id,req.requestedDayAndTime,req.acceptedDayAndTime, req.location],function({error,data}){
               
                cb(data);
            });
        },

        delete(id,cb){
            db.paramQuery("DELETE from request where id=?",id,function({error,data}){
                cb(data);
            });
 
        }
    }
}