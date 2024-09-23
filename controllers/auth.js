const loginfn = async(req, res) => {
    res.status(200).json({message : "Login"});
}

const signupfn = async(req, res) => {
    res.status(200).json({message : "SignUp"});
}

module.exports = {loginfn, signupfn};