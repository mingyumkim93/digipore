module.exports = function (app, db, passport, LocalStrategy) {

    let dao = require("./userdao")(db);
    dao.getAllUsers(function ({ error, data }) {
        users = data;
    });

    passport.serializeUser(function (user, done) {
        console.log(user);
        done(null, user.id);
    });
    passport.deserializeUser(function (id, done) {
        console.log(id);
        dao.getUserById(id, function ({ error, data }) {
            if (error) console.log("Error happened on querying an user")
            console.log("data[0] in deserializeUser " + data[0])
            done(null, data[0])
        });
    });

    passport.use(new LocalStrategy({
        usernameField: 'emailInput',
        passwordField: 'passwordInput'
    },
        function (username, password, done) {
            dao.getUserByEmail(username, function ({ error, data }) {
                if (error) return done(error);
                if (!data[0]) {
                    console.log("Incorrect email!");
                    return done(null, false, { message: 'Incorrect email.' })
                }
                else if (password !== data[0].password) {
                    console.log("Incorrect password!");
                    return done(null, false, { message: 'Incorrect password.' })
                }
                console.log("all clear")
                return done(null, data[0])
            })
        }
    ));

    app.post('/login',
        passport.authenticate('local'), function (req, res) {
            console.log("authentication is done successfully");
            res.redirect("/errands-list")
        });

    app.get('/api/user/:email',function(req,res){
        dao.getUserByEmail(req.params.email,function({err, data}){
            delete data[0].password;
            res.json(data[0]);
        })
    });

    app.post("/api/user",(req,res)=>{
        dao.getUserByEmail(req.body.email, function({err, data}){
            if (err) res.send(err);
            if (data[0]) res.send(404);
            else {
                dao.createUser(req.body, function ({ err, data }) {
                    res.sendStatus(200);
                });
            }
        })
    });
    
}
