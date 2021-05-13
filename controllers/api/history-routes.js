// lesson routes
const router = require('express').Router();
const {History, User, Lesson } = require('../../models/');

// return last 20 results from history table 
router.get('/', async (req, res) => {
    try {
        // Query history and pull just lesson title and username, send that back with history data
        const history = await History.findAll(
            {   include: 
                [
                    { model: Lesson, attributes: ['title'] },
                    { model: User, attributes: ['username'] }
                ],
                limit: 10, 
                order: [['id', 'DESC']] 
            }
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
        // get history for user including lesson name 
        const history = await History.findAll(
            {   
                where: { user_id: req.params.id },
                include: 
                [
                    { model: Lesson, attributes: ['title'] }
                ],
                limit: 10, 
                order: [['id', 'DESC']] 
            }
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
        // return every history entry for specific lesson, include username and lesson title name
        const history = await History.findAll(
            {
                where: { lesson_id: req.params.id },
                include: 
                [
                    { model: User, attributes: ['username'] },
                    { model: Lesson, attributes: ['title'] },
                ],
                limit: 10, 
                order: [['id', 'DESC']] 
            }

        );

        res.json(history);
    }
    catch(error) {
        res.json(error);
    }
});

module.exports = router;