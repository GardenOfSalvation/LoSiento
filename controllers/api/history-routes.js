// lesson routes
const router = require('express').Router();
const History = require('../../models/History');

// return last 20 results from history table 
router.get('/', async (req, res) => {
    try {
        const history = await History.findAll(
            {   limit: 20   },
            {   order: [['id', 'DESC']] }
        );

        res.json(history);
    }
    catch(error) {
        res.json(error);
    }
});

// return last 10 results for user by user_id
router.get('/user/:id', async (req, res) => {
    try {
        const history = await History.findAll(
            {   where: { user_id: req.params.id } },
            {   limit: 10   }   
        );

        res.json(history);
    }
    catch(error) {
        res.json(error);
    }
});

// return last 10 results for user by lesson id
router.get('/lesson/:id', async (req, res) => {
    try {
        const history = await History.findAll(
            {   where: { lesson_id: req.params.id } },
            {   limit: 10   }   
        );

        res.json(history);
    }
    catch(error) {
        res.json(error);
    }
});

module.exports = router;