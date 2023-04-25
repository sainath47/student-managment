const express = require( 'express')
const { register, login } = require('../controller/student.controller')
const router = express.Router()



router.post('/', register)
router.post('/login', login)




module.exports = router