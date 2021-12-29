const valid=({ email, password, fullname, username, cf_password})=>{
    const err={}
    if(!fullname){
        err.fullname="Please Enter your Full Name"
    }else if(fullname.length>25){
        err.fullname=" Full Name must be less than 25 characters"
    }
    if(!username){
        err.username="Please Enter your User Name"
    }else if(username.length>25){
        err.username=" User Name must be less than 25 characters"
    }
    if(!email){
        err.email="Please Enter your Email"
    }else if(!validateEmail(email)){
        err.email="Email format is incorrect"
    }
    if(!password){
        err.password="Please Enter your Password"
    }else if(password.length<6){
        err.password="Password must be aleast 6 characters"
    }
    if(password !== cf_password){
        err.cf_password="Confirm password must be same as password"
    }
    return {
        errMsg:err,
        errLength:Object.keys(err).length
    }

}

function validateEmail(email) {
    // eslint-disable-next-line
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export default valid