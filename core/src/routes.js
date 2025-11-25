const express = require("express");
const router = express();
const {getAllCheckers, getCheck, postCheck, editCheck} = require('./controllers/checkupController')
const {loginUser, getAllUsers, postUser, putUser, deleteUser} = require('./controllers/userController')

router.get("/checkers", getAllCheckers)
router.get("/check/:id", getCheck)
router.post("/postcheck", postCheck)
router.put("/editCheck/:id", editCheck)

router.get("/loginUser", loginUser);
router.get("/users", getAllUsers);
router.post("/user", postUser);
router.put("/user/:id", putUser);
router.delete("/user/:id", deleteUser);


module.exports = router