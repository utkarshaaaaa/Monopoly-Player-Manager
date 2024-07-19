const express = require("express");

const router = express.Router();
const user = require("./schema");

//Create Player

router.route("/create").post(async (req, res) => {
  try {
    const { name, image, amount, game_id, lap_money } = req.body;

    if (!name || !game_id || !amount) {
      return res
        .status(400)
        .json({ message: "Please fill up all the required details." });
    }

    const newUser = await user.create({
      Player_name: name,
      image: image,
      amount,
      game_id,
      lap_money,
    });

    if (newUser) {
      console.log(`User created with ID: ${newUser._id}`);
      return res.status(201).json({ user: newUser });
    } else {
      return res.status(500).json({ message: "Failed to create user." });
    }
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
});

//Add credits after one lap

router.route("/lap:id").post(async (req, res) => {
  try {
    const id = req.params.id;
    const player = await user.findOne({ _id: id });

    const player_Amount = Number(player.amount) + Number(player.lap_money);

    user.findOneAndUpdate(
      { _id: id },
      { $set: { amount: player_Amount } },
      { new: true },
      (err, data) => {
        if (err) {
          console.log("Data updation Failed");
        }
        res.status(200).json({ updated_lap_amount_details: data });
      }
    );

    console.log(player_Amount);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//Pay credits to Other Player

// router.route('/transfer:id').post( async(req,res)=>{

//     const id=req.params.id
//     const{player_id,amountSend}=req.body

//     if(!id){
//         throw new Error("ID is required")
//     }

//     const reciever_Player= await user.findById({_id:id})
//     const senders_Player =await user.findById({_id:player_id})

//     const reciever_Player_amount= (reciever_Player.amount) +(amountSend)

//     await user.findOneAndUpdate({_id:id},{$set:{amount:reciever_Player_amount}},{new: true},(err,data)=>{
//         if(err){
//             throw err
//         }

//         res.status(200).json({senders:data})

//     }).clone().catch((err)=>{console.log(err)})

//     const senders_player_amount=senders_Player.amount - amountSend

//     await user.findOneAndUpdate({_id:player_id},{$set:{amount:senders_player_amount}},{new: true})
//     res.status(200).json({senders:senders_Player,reciever:reciever_Player})

// })

router.route("/transfer/:id").post(async (req, res) => {
  try {
    const id = req.params.id;
    const { player_id, amountSend } = req.body;

    if (!id || !player_id || !amountSend) {
      return res.status(400).json({
        message: "ID, player_id, and amountSend are required fields.",
      });
    }

    const receiverPlayer = await user.findById(id);
    const senderPlayer = await user.findById(player_id);

    if (id == receiverPlayer._id) {
      res.json({ message: "Cannot transfer to same id" });
      console.log("not allowed");
    }

    if (senderPlayer.amount < amountSend) {
      res.json({ message: "not enough balance" });
    }

    if (!receiverPlayer || !senderPlayer) {
      return res
        .status(404)
        .json({ message: "Receiver or sender player not found." });
    }

    receiverPlayer.amount += parseInt(amountSend);
    await receiverPlayer.save();

    senderPlayer.amount -= parseInt(amountSend);
    await senderPlayer.save();

    res.status(200).json({ sender: senderPlayer, receiver: receiverPlayer });
  } catch (error) {
    console.error("Error transferring amount:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

//Display All the Players using Game id

router.route("/players_details:game_id").post(async (req, res) => {
  try {
    const Game_Id = req.params.game_id;

    if (!Game_Id) {
      res.status(400).json({ message: "Create Game Id" });
    }

    const Players_details = await user.find({ game_id: Game_Id });

    res.status(200).json({ players: Players_details });
  } catch (error) {
    res.status(400).json({ err: error });
  }
});

//Adding Properties

router.route("/properties_Buying:id").post(async (req, res) => {
  try {
    const { property } = req.body;
    const id = req.params.id;

    const current_Player = await user.findOne({ _id: id });

    // const copyCurrentPlayer=[...current_Player.properties]

    // const checkingPropertyExistance=current_Player.properties.filter((e)=>{
    //     return  e.toString() === property.toString().toUpperCase()
    // })

    console.log("Name added");
    const updated_Properties = [
      ...current_Player.properties,
      property.toUpperCase(),
    ];

    await user
      .findOneAndUpdate(
        { _id: id },
        { $set: { properties: updated_Properties } },
        { new: true },
        (err, data) => {
          if (err) {
            throw err;
          }

          res.status(200).json({ updated_properties_details: data });
        }
      )
      .clone()
      .catch((err) => {
        console.log(err);
      });
    console.log(updated_Properties);
  } catch (error) {
    console.error("Error adding property:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

//Pay to Bank

router.route("/pay_Bank:id").post(async (req, res) => {
  const { pay_Bank } = req.body;
  const player_id = req.params.id;

  const current_player = await user.findOne({ _id: player_id });

  if (current_player.amount < pay_Bank) {
    res.json({ message: "not enough balance" });
  }
  const player_Updated_Amount = current_player.amount - pay_Bank;

  user.findOneAndUpdate(
    { _id: player_id },
    { $set: { amount: player_Updated_Amount } },
    { new: true },
    (err, data) => {
      if (err) {
        console.log(" Amount updation Failed");
      }

      res.status(200).json({ updated_player_amount: data });
    }
  );
});

//Adding amount by bank

router.route("/adding_Credits:id").post(async (req, res) => {
  const { amount } = req.body;

  const id = req.params.id;

  if (!id) {
    res.status(400).json({ error: "ID is missing " });
  }

  const player_Details = await user.findOne({ _id: id });

  if (amount < 0) {
    res.json({ eror_Message: "Enter positive Amount" });
  }

  const updated_Amount = player_Details.amount + Number(amount);

  user.findOneAndUpdate(
    { _id: id },
    { $set: { amount: updated_Amount } },
    { new: true },
    (err, data) => {
      if (err) {
        throw new err();
      }

      res.status(200).json({ updated_player_amount: data });
    }
  );
});

//get Player data by id

router.route("/player_info:id").get(async (req, res) => {
  try {
    const id = req.params.id;

    const PlayerInfo = await user.findOne({ _id: id });
    res.status(200).json({ info: PlayerInfo });
  } catch (error) {
    console.log(error);
  }
});

//get players data by game_id
router.route("/Players_data:game_id").get(async (req, res) => {
  try {
    const gameId = req.params.game_id;

    if (!gameId) {
      res.status(400).json({ error: "Game ID required" });
    }

    const PlayerData = await user.find({ game_id: gameId });
    res.status(200).json({ info: PlayerData });
  } catch (error) {
    res.status(500).json({ message: "server error" });
    console.log(error);
  }
});
module.exports = router;
