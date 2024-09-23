const clientloginfn = async(req, res) => {
    res.status(200).json({msg : "Client Login"});
}

const adminloginfn = async(req, res) => {
    res.status(200).json({msg : "Admin Login"});
}

const signupfn = async(req, res) => {
    res.status(200).json({msg : "SignUp"});
}

module.exports = {clientloginfn, adminloginfn, signupfn};