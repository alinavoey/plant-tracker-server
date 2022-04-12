const express = require('express')
const passport = require('passport')

const router = express.Router()

const Plant = require('../models/plant')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404

const requireOwnership = customErrors.requireOwnership
const requireToken = passport.authenticate('bearer', { session: false })

// create plant: POST
router.post('/plants', requireToken, (req, res, next) => {
    const plant = req.body.plant
    plant.owner = req.user.id

    Plant.create(plant)
        .then(plant => res.status(201).json({ plant: plant.toObject() }))
        .catch(next)
})

// index show all plants: GET
router.get('/plants', requireToken, (req, res, next) => {
    Plant.find({ owner: req.user.id })
        .then(plants => plants.map(plant => plant.toObject() ))
        .then(plants => res.json({ plants: plants }))
        .catch(next)
})

// show one plant: GET
router.get('/plants/:id', requireToken, (req, res, next) => {
    const id = req.params.id

    Plant.findById(id)
    .then(handle404)
    .then(plant => res.status(200).json({ plant: plant.toObject() }))
    .catch(next)
})

// update one plant: PATCH
router.patch('/plants/:id', requireToken, (req, res, next) => {
    const id = req.params.id
    const plantData = req.body.plant

    Plant.findById(id)
        .then(handle404)
        .then(plant => requireOwnership(req, plant))
        .then(plant => {
            return plant.updateOne(plantData)
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

// delete one plant: DELETE
router.delete('/plants/:id', requireToken, (req, res, next) => {
    const id = req.params.id
    Plant.findById(id)
        .then(handle404)
        .then(plant => requireOwnership(req, plant))
        .then(plant => {
            plant.deleteOne()
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

module.exports = router