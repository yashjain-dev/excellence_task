const express = require('express');

const router = express.Router();

const candidateController = require('../controllers/candidate')

router.get('/',candidateController.showAll);

router.post('/createCandidate',candidateController.createCandidate);
router.post('/createCandidateScore',candidateController.createCandidateScore);
router.get('/maxScoreOf',candidateController.maxScoreOf);
router.get('/averageScore',candidateController.averageScore);


module.exports = router;