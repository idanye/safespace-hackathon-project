import express from 'express';
import {
    getAllExperts,
    getUnApprovedExperts,
    approveExpert,
} from '../controllers/adminController.js';


const router = express.Router();

/**
 * Read Only Permission Routes
 */
// GET all approved experts
router.get('/allExperts', getAllExperts);

// GET all unapproved experts
router.get('/unApprovedExperts', getUnApprovedExperts);


/**
 * Read and Write Permission Routes
 */
router.post('/approveExpert/:expertID', approveExpert);


export default router;