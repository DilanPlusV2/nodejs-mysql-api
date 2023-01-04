const models = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

function signUp(req, res){
    models.User.findOne({where:{email:req.body.email}}).then(result =>{
        if(result){
            res.status(409).json({
                message: "Email existente"
            });
        }else{
            bcryptjs.genSalt(12, function(err, salt){
                bcryptjs.hash(req.body.password, salt, function(err, hash){
                    const user = {
                        nombres: req.body.nombres,
                        apellidos: req.body.apellidos,
                        email: req.body.email,
                        celular: req.body.celular,
                        edad: req.body.edad,
                        password: hash
                    }
                    models.User.create(user).then(result => {
                        res.status(201).json({
                            message: "Usuario registrado"
                        });
                    }).catch(error =>{
                        res.status(500).json({
                            message: "ERROR AL REGISTRAR",
                            error: error
                        });
                    });
                });
            });
        }
    }).catch(error =>{
        res.status(500).json({
            message: "ERROR AL REGISTRAR",
            error: error
        });
    }); 
}

function login(req, res){
    models.User.findOne({where:{email:req.body.email}}).then(user =>{
        if(user === null){
            res.status(401).json({
                message: "invalid credentials"
            });
        }else{
            bcryptjs.compare(req.body.password, user.password, function(err, result){
                if(result){
                    const token = jwt.sign({
                        email: user.email,
                        userId: user.id
                    }, process.env.JWT_KEY, function(err, token){
                        res.status(200).json({
                            message: "Authentication successful",
                            token: token
                        });
                    });
                }else{
                    res.status(401).json({
                        message: "invalid credentials"
                    });
                }
            });
        }
    }).catch(error =>{
        res.status(500).json({
            message: "Error to login"
        });
    });
}
function showUserId(req, res){
    const id = req.params.id;
    models.User.findByPk(id).then(result=>{
        if(result){        
        res.status(200).json(result);
    }else{
        res.status(404).json({
            message :"User not found"
        })
    }
    }).catch(error => {
        res.status(500).json({
            message :error
        })
    });
}
module.exports={
    signUp: signUp,
    login: login,
    showUserId
}