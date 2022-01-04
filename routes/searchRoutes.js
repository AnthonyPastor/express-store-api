const { Router } = require("express");
const {
  search,
  searchProductsByCatagory,
} = require("../controllers/searchController");

const router = Router();

router.get("/:collection/:term", search);
router.get("/:categoryId", searchProductsByCatagory);

module.exports = router;
