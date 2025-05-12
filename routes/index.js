var express = require('express');
var router = express.Router();

require('../models/connection');
const Place = require('../models/places');
const { checkBody } = require('../modules/checkBody');

//POST /places : ajout d’un marqueur en base de données (via req.body)
//exemple de requete POST/places : { nickname: 'Max', name: 'Lyon', latitude: 45.758, longitude: 4.835 }
//Exemple de réponse : { result: true }
router.post('/places', (req,res) => {
    Place.findOne({name:req.body.name}).then((data)=>{
        if (!checkBody(req.body, ['nickname', 'name', 'latitude', 'longitude'])) {
            res.json({ result: false, error: 'Missing or empty fields' });
            return;
          }
        else if (data === null){
            const newPlace = new Place({
                nickname: req.body.nickname,
                name: req.body.name,
                latitude: req.body.latitude,
                longitude: req.body.longitude,
            })

            newPlace.save().then(() => {
                res.json({ result: true })
            })
        }else{
            res.json({ result: false, error: 'User not found or wrong password' });
        }
    })
})

//GET /places/:nickname : récupération de tous les marqueurs d’un utilisateur en fonction de son surnom (via req.params)
//Exemple de réponse : { result: true, places: [{ nickname: 'Max', name: 'Lyon', latitude: 45.758, longitude: 4.835 }, ...] }
router.get('/places/:nickname', (req,res) => {
    Place.find({nickname: req.params.nickname}).then((data)=> {
        if (data){
            res.json({ result: true, places: data})
        } else {
            res.json({result:false})
        }
    })
})

//DELETE /places : suppression d’un marqueur à partir de son nom et du surnom de l’utilisateur (via req.body)
//Exemple de requête : DELETE /places > { nickname: 'Max', name: 'Lyon' }
//Exemple de réponse : { result: true }
router.delete('/places', (req,res)=>{
    Place.deleteOne({nickname:req.body.nickname, name:req.body.name}).then(()=>{
        res.json({result:true})
    })
})


module.exports = router;