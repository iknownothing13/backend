const express= require('express');
const router             = express.Router();

const nodeController = require('../controllers/NodeController');


router.get('/', nodeController.index)
router.post('/store', nodeController.store)
router.post('/update', nodeController.update)
router.post('/delete', nodeController.destroy)
//always put the request with params at the end only
router.post('/show', nodeController.show)
module.exports = router;