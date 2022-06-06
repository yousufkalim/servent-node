/**
 * chats CRUD controllers
 * @author Shuja Naqvi
 */

const Chat = require("../models/Chats");
const io = require("../index");
const socket = require("../index");

/**
 * Msg by Admin
 * @param {object} req
 * @param {object} res
 */
exports.msgByAdmin = async (req, res) => {
  try {
    let existingChat = await Chat.findOne({
      home_admin: req.body.home_admin,
      servant: req.body.servant,
    });
    if (io.socket) {
      io.socket.emit(`${req.body.servant}Listen  Messsage`, {
        message: `${req.body.message}`,
      });
    }
    const message = {
      message: req.body.message,
      sender: req.body.home_admin,
      receiver: req.body.servant,
    };
    if (!existingChat) {
      req.body.message = message;
      const chat = await Chat.create(req.body);
      return res.json({ success: true, chat }); //Success
    }
    existingChat.message.push(message);
    await existingChat.save();
    // Done
    res.json({ success: true, existingChat }); //Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Msg by Servant
 * @param {object} req
 * @param {object} res
 */
exports.msgByServant = async (req, res) => {
  try {
    const existingChat = await Chat.findOne({
      home_admin: req.body.home_admin,
      servant: req.body.servant,
    });
    const message = {
      message: req.body.message,
      sender: req.body.servant,
      receiver: req.body.home_admin,
    };
    if (io.socket) {
      io.socket.emit(`${req.body.home_admin}Listen  Messsage`, {
        message: `${req.body.message}`,
      });
    }
    if (!existingChat) {
      req.body.message = message;
      const chat = await Chat.create(req.body);
      return res.json({ success: true, chat }); //Success
    }
    existingChat.message.push(message);
    await existingChat.save();
    // Done
    res.json({ success: true, existingChat }); //Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Get chat by id
 * @param {object} req
 * @param {object} res
 */
exports.getById = async (req, res) => {
  try {
    const chatId = req.params.chatId; // Getting chat id from URL parameter
    const chat = await Chat.findById(chatId)
      .populate("home_admin")
      .populate("servant");
    res.json({ success: true, chat }); // Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Get chat by  Admin id
 * @param {object} req
 * @param {object} res
 */
exports.getAdminChats = async (req, res) => {
  try {
    const chat = await Chat.find({
      home_admin: req.params.home_admin,
    }).populate("servant");
    res.json({ success: true, chat }); // Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Get chat by  servant id
 * @param {object} req
 * @param {object} res
 */
exports.getServantChats = async (req, res) => {
  try {
    const chat = await Chat.find({ servant: req.params.servant }).populate(
      "home_admin"
    );
    res.json({ success: true, chat }); // Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
/*

{ 
  "$set": {[`message.$[outer].${seen}`]: "seen"} 
},
*/
//readMsg

exports.readMsg = async (req, res) => {
  try {
    const chat = await Chat.findOneAndUpdate(
      {
        _id: req.body.chatId,
        "message.status": "un_seen",
        "message.receiver": req.body.receiverId,
      },
      //   {
      //     $set: { [`message.$[outer].$.status`]: "seen" },
      //   },
      //   {
      //     new: true,
      //   }
      { $set: { "message.$[el].status": "seen" } },
      {
        arrayFilters: [
          { "el.receiver": req.body.receiverId, "el.status": "un_seen" },
        ],
        new: true,
      }
    )
      .populate("home_admin")
      .populate("servants");
    res.json({ success: true, chat }); // Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
