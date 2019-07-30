module.exports = function(app, db){
    let users=[];
    let dao = require("./userdao")(db);
    dao.getAllUsers(function({error, data}) {
        users=data;
        console.log(users);
    });
    /*
    let getAllUsers = function(req, resp) {
        dao.getAllUsers(function({error, data}) {
            users=data;
            console.log(users);
        })
    };
    app.get("/login", getAllUsers);*/
    // change it to app.post and do login process with passport.js
}
