const express = require('express')

const UserCtrl = require('../controller/user-ctrl')

const router = express.Router()

router.post('/adduser', UserCtrl.createUser)
router.get('/users', UserCtrl.getUsers)

module.exports = router