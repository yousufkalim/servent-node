/**
 * chats CRUD routes
 * @author Shuja Naqvi
 */
const router = require("express").Router();
const chats = require("../controllers/chats");
const {
  validateChat,
  validateGetServantChat,
  validateGetAdminChat,
  isValidated,
} = require("../middleware/validators");

/**
 * ////////////////////////// Routes /////////////////////////
 * @method post create chats
 * @method get chats verify chats
 */

//
// Create - send msg
router.post("/msgByAdmin", validateChat, isValidated, chats.msgByAdmin);
// Create - send msg
router.post("/msgByServant", validateChat, isValidated, chats.msgByServant);
//Get- get msg by chatId
router.get("/:chatId", chats.getById);
//Get-ServantChats
router.get("/getServantChats/:servantId", chats.getServantChats);
//Get-getAdminChats
router.get("/getAdminChats/:adminId", chats.getAdminChats);
//Put- Read Msg
router.put("/readMsg", chats.readMsg);

module.exports = router;
