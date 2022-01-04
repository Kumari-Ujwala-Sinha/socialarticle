const Users = require("../models/userModel");

const userCtrl = {
  searchUser: async (req, res) => {
    try {
      const user = await Users.find({
        username: { $regex: req.query.username },
      })
        .limit(10)
        .select("username fullname avatar");
      res.json({ user });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUser:async(req, res)=>{
    try {
      const users = await Users.findById(req.params.id).select('-password').populate("followers following")
      if(!users) return res.status(400).json({ msg: "User does not exist"});
       
      res.json({ users });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateUser:async(req, res)=>{
    try {
      const {fullname, address, website, story, mobile, gender }= req.body

      if(!fullname) return res.status(400).json({ msg: "Fill the full name."});

       await Users.findOneAndUpdate({_id:req.user._id},{
        fullname, address, website, story, mobile, gender
       })
      res.json({msg:"Updated successfully"});
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
};

module.exports = userCtrl;
