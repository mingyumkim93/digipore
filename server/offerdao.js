module.exports=function(db){
    return{
        createOffer(offer,cb){
            db.paramQuery("INSERT into offer set ?",offer,function({err,data}){
                if(err) cb(err)
                cb(data)
            })
        }
    }
}