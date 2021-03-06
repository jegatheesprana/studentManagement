const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const useController = require('../controllers/userController')

//landing page
router.get('/', (req, res) => {
    res.render('index', { teachersNum: 10 })
})
router.get('/login', authController.viewLogin)
router.post('/login', authController.login)
router.get('/logout', authController.logout)
router.post('/registerPrincipal', authController.registerPrincipal)

router.use((req, res, next) => {
    if ((req.isAuthenticated())) {
        res.locals.type = req.user.type;
        res.locals.name = req.user.name;
        res.locals.url = req.originalUrl;
        next();
    } else {
        res.redirect('/login')
    }
});

router.get('/dashboard', useController.viewDashboard)
// router.use('/admin', require('./admin'))
router.use('/users', require('./users'))
router.use('/classes', require('./classes'))
router.use('/timetables', require('./timetables'))
router.use('/attendance', require('./attendance'))
router.use('/exams', require('./exams'))
router.use('/notices', require('./notices'))
router.use('/comments', require('./comment'))
router.use('/reports', require('./reports'))
router.use('/children', require('./children'))
router.use('/activities', require('./activities'))

module.exports = router