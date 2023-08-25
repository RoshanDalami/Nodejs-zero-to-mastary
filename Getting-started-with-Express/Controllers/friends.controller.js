const model = require('../Models/friends.model')

function getFriends(req,res){
    res.json(model.friends)
};

function postFriends(req,res){
    if(!req.body.name){
        res.status(400).json({error:'missing friend name'});
        return ;
    }
    const newFriend = {
        name : req.body.name, //req.body doesn't exist unless we parse data using middleware
        id: model.friends.length
    }
    model.friends.push(newFriend);
    res.json(newFriend)
};
function getIndividualFriend(req,res){
    const friendId = Number(req.params.friendId);
   
    const friend = model.friends[friendId]
    if(friend){
       res.status(200).json(friend)
    }else{
       res.status(404).json({error:'you have no friends'})
    }
   }


module.exports ={
    getFriends,
    postFriends,
    getIndividualFriend
}