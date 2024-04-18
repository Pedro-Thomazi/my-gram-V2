const UserController = require('../controller/UserController')

const router = require('express').Router()
const { imageUpload } = require('../helpers/image-upload')

router.post('/register', UserController.registerUser)
router.post('/login', UserController.loginUser)
router.patch('/update-user/:id', imageUpload.single('image'), UserController.updateUser)
router.get('/allusers', UserController.getAllUsers)
router.get('/get-user-by-id/:id', UserController.getUserById)
router.patch('/follow-user/:id', UserController.followUserById)
router.patch('/un-follow-user/:id', UserController.unFollowUserById)
router.patch('/remove-notifications', UserController.deleteNotifications)
router.get('/getuser', UserController.getUser)

module.exports = router