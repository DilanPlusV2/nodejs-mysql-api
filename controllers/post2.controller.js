const models = require('../models');
//Guardar
function save(req, res){
    const post = {
        nombres: req.body.nombres,
        fecha: req.body.fecha,
        hora: req.body.hora,
        descripcion: req.body.descripcion,
        estado: req.body.estado
    }
    models.Post2.create(post).then(result =>{
        res.status(201).json({
            message: "Exitoo",
            post: result
        });
    }).catch(error=>{
        res.status(500).json({
            message: "ERROR",
            error: error
        });
    });
}
//Buscar por id
function show(req, res){
    const id = req.params.id;
    models.Post2.findByPk(id).then(result=>{
        if(result){        
        res.status(200).json(result);
    }else{
        res.status(404).json({
            message :"Post not found"
        })
    }
    }).catch(error => {
        res.status(500).json({
            message :error
        })
    });
}
//Buscar por nombre para barra de busqueda
function Mostrar(req, res){
    models.Post2.findAll({where:{nombres:req.params.nombres}}).then(clienta =>{
        if(clienta){
            res.status(200).json(clienta);
        }else{
            res.status(404).json({
                message:"User non-existent"
            });
        }
    }).catch(error=>{
        res.status(500).json({
            message:"Error",
            error: error
        });
    });
}
//ver todo
function index(req, res){
    models.Post2.findAll().then(result => {
        res.status(200).json(result);
    }).catch(error=>{
        res.status(500).json({
            message :error
        })
    });
}
//actualizar
function update(req, res){
    const id = req.params.id;
    const updatedPost ={
        nombres: req.body.nombres,
        fecha: req.body.fecha,
        hora: req.body.hora,
        descripcion: req.body.descripcion,
        estado: req.body.estado
    }
    models.Post2.update(updatedPost,{where: {id:id}}).then(result =>{
        res.status(200).json({
            message: "Actualizado",
            post: result
        })
    }).catch(error =>{
        res.status(500).json({
            message: "ERROR ACTUALIZANDO",
            error: error
        })
    });
}
//Eliminar
function destroy(req, res){
    const id = req.params.id;

    models.Post2.destroy({where:{id:id}}).then(result =>{
        res.status(200).json({
            message: "Eliminado",
            result: result
        })
    }).catch(error =>{
        res.status(500).json({
            message: "ERROR ELIMINANDO",
            error: error
        })
    });
}
module.exports = {
    save: save,
    show: show,
    index: index,
    update: update,
    Mostrar: Mostrar,
    destroy: destroy
}