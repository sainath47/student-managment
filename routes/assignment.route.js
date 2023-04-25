const express = require( 'express')
const { createAssignment } = require('../controller/assignment.controller')
const router = express.Router()



router.post('/', createAssignment)




module.exports = router