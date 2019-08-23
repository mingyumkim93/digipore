module.exports = function (app, db, passport, LocalStrategy, bcrypt) {

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
                bcrypt.compare(password, data[0].password, function (err, result) {
                    if (result == true) {
                        console.log("all clear")
                        return done(null, data[0])
                    }
                    else {
                        //console.log("Incorrect password!");
                        return done(null, false, { message: 'Incorrect password.' })
                    }
                }
                )
            })
        }
    ));

    app.post('/login',
        passport.authenticate('local'), function (req, res) {
            console.log("authentication is done successfully");
            res.redirect("/errands-list")
        });

    app.get('/api/user/:email', function (req, res) {
        if(req.isAuthenticated()){
            dao.getUserByEmail(req.params.email, function ({ err, data }) {
                delete data[0].password;
                res.json(data[0]);
            })
        }
        else
            res.sendStatus(404);
       
    });

    app.put('/api/user/:email', function (req, res) {
        if(req.isAuthenticate()){
            let saltRounds = 10;
            bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                if (err) res.send(err);
                req.body.password = hash;
                dao.updateUser(req.body, function ({ err, data }) {
                    if (err) res.send(err)
                    res.sendStatus(200);
                })
            })
        }
        else
            res.sendStatus(404);
       
    })

    app.post("/api/user", (req, res) => {
        dao.getUserByEmail(req.body.email, function ({ err, data }) {
            if (err) res.send(err);
            if (data[0]) res.send(404);
            else {
                let saltRounds = 10;
                bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                    if (err) res.send(err);
                    req.body.password = hash
                    dao.createUser(req.body, function ({ err, data }) {
                        if (err) res.send(err)
                        res.sendStatus(200);
                    });
                });
            }
        })
    });

    app.get("/logout", (req, res) => {
        if (req.session)
            req.session.destroy(err => console.log(err));
        
    })

}
