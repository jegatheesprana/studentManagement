const express = require('express')
const router = express.Router()
const reportsController = require('../controllers/reportsController')

router.get('/attendances', reportsController.viewAttendanceClassReport)
router.get('/attendances/:classId', reportsController.viewAttendanceReport)
router.get('/classResults', reportsController.viewClassReportSelect)
router.get('/classResults/:classId', reportsController.viewClassReport)
router.get('/results', reportsController.resultSelectExamReport)
router.get('/results/:examId', reportsController.findWithResultReport)
router.get('/students/', reportsController.listAllStudent)
router.get('/students/:studentId', reportsController.viewStudent)

module.exports = router