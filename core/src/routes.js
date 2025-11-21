const express = require("express");
const router = express();
const {getAllCheckers, getCheck, postCheck} = require('./controllers/checkupController')
const {getUser, getAllUsers, postUser, putUser, deleteUser} = require('./controllers/userController')

router.get("/checkers", getAllCheckers)
router.get("/check/:id", getCheck)
router.post("/postcheck", postCheck)


router.get("/user/:id", getUser);
router.get("/users", getAllUsers);
router.post("/user", postUser);
router.put("/user/:id", putUser);
router.delete("/user/:id", deleteUser);


module.exports = router