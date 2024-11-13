const express = require("express");
const router = express.Router();
const { threadController } = require("../../../controllers");

const { Authentication, Authorization } = require("../../../middleware");

router.post("/create-thread", Authentication, Authorization, threadController.createThread);
router.get("/thread-list", Authentication, Authorization, threadController.getThreads);
router.get("/thread-list/:id", Authentication, Authorization, threadController.getThreadById);
router.patch("/edit-thread/:id", Authentication, Authorization, threadController.updateThread);
router.delete("/delete-thread/:id", Authentication, Authorization, threadController.deleteThread);
router.patch("/update-thread-status/:id", Authentication, Authorization, threadController.updateThreadStatus);

module.exports = router;
