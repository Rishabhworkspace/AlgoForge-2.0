"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const authController_1 = require("../controllers/authController");
const authMiddleware_1 = require("../middleware/authMiddleware");
router.post('/', authController_1.registerUser);
router.post('/login', authController_1.loginUser);
router.post('/google', authController_1.googleAuth);
router.get('/me', authMiddleware_1.protect, authController_1.getMe);
exports.default = router;
