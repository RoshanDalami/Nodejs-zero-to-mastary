const express = require('express');

const friendsRouter = express.Router();
const friendsController = require("../Controllers/friends.controller");

friendsRouter.use((req,res,next)=>{
    next();
    console.log(req.ip);
});

friendsRouter.post("/", friendsController.postFriends);

friendsRouter.get("/", friendsController.getFriends);
friendsRouter.get("/:friendId", friendsController.getIndividualFriend);

module.exports = friendsRouter;