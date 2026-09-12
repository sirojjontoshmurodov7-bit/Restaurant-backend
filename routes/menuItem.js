const express = require("express");

const router = express.Router();

const upload = require("../middlewares/upload");

const {
  getMenuItems,
  getMenuItem,
  createMenuItem,
  editMenuItem,
  deleteMenuItem,
} = require("../controllers/menuItemController");

router.get("/", getMenuItems);

router.get("/:id", getMenuItem);

router.post("/", upload.single("image"), createMenuItem);

router.put("/:id", editMenuItem);

router.delete("/:id", deleteMenuItem);

module.exports = router;