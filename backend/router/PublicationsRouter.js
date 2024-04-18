const PublicationsController = require('../controller/PublicationsController')
const router = require('express').Router()

const { imageUpload } = require('../helpers/image-upload')

router.post('/create-publi', imageUpload.array('images'), PublicationsController.createPubli)
router.get('/my-publications', PublicationsController.getMyPublications)
router.get('/publication/:id', PublicationsController.getPublicationById)
router.get('/user-publications/:id', PublicationsController.getPublicationsById)
router.patch('/comments/:id', PublicationsController.addComment)
router.delete('/remove-publication/:id', PublicationsController.removePublication)
router.patch('/denounce-publication/:id', PublicationsController.getPublicationByIdAndAddDenounce)
router.get('/', PublicationsController.getAllPublis)

module.exports = router