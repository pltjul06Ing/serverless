const  express = require('express')
const  orders= require('../models/Order')
const {isAuthenticated,hasRoles} = require('../auth')
const router = express.Router()

router.get('/',(req,res)=>{
    orders.find()
    .exec()
    .then(x => res.status(200).send(x))

})

router.get('/:id',(req,res)=>{
    orders.findById(req.params.id)
        .exec()
        .then(x => res.status(200).send(x) )
})



router.post('/',(req,res) => {
    //const {_id} = req.user
    orders.create(req.body).then(x => res.status(201).send(x))
    
})
router.put('/:id',isAuthenticated,hasRoles(['user','admin']),(req  ,res) => {
    orders.findByIdAndUpdate(req.params.id, req.body)
    .then(()=> res.sendStatus(204))
})


router.delete('/:id',isAuthenticated,(req  ,res) => {
    orders.findByIdAndDelete(req.params.id).exec()
    .then(()=> res.sendStatus(204))
})

module.exports = router
