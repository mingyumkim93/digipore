module.exports=function(db){
    return {
        getAllUsers(cb){
            db.query("SELECT * FROM user",cb);
                    //sql, cb
        }
    }
}
