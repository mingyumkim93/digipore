class Auth{
    
    constructor(){
        this.authenticated = false;
        this.currentId="";
    }

    login(cb){
        this.authenticated = true;
        cb();
    }

    logout(cb){
        this.authenticated = false;
        cb();
    }

    //what's diffrent from auth.authenticated ?
    isAuthenticated(){
        return this.authenticated;
    }
}

export default new Auth();