import express from "express";
import "dotenv/config";

//This will help connect to the database
import db from "../db/connection.js";

//Db Collection
const dbCollection = "PlayerData";
//old collection is "records"

//This help convert the id from string to ObjectID for the _id
import { ObjectId } from "mongodb";

/*
Router is an instance of the express router
We use it to define our routes
The router will be added as a middleware and will take control of the requests starting with the path /record
*/
const router = express.Router();

//This section will help get a list of all the characters
router.get("/characters", async (req, res) => {
  //console.log("Get requested");
  let collection = await db.collection(dbCollection);
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

//This is to get all the players. (EOSIDs)

//const result = await cursor.toArray();

router.get("/players", async (req, res) => {
  async function eosidcount() {
    const agg = [
      {
        $group: {
          _id: "$eosid",
        },
      },
      {
        $count: "uniqueeosid",
      },
    ];

    const aggCursor = collection.aggregate(agg);
    
    await aggCursor.forEach((uniqueeosidtotal) => {
      console.log(`total unique eosid is ${uniqueeosidtotal.count}`);
    });
  }

  //console.log("Get requested");
  const agg = [{ $group: { _id: "$eosid", count: { $sum: 1 } } }];
  const PAGE_SIZE = 25;
  const page = parseInt(req.query.page || "0");
  let collection = await db.collection(dbCollection);
  const totalPlayers = await collection.countDocuments({});
  //const totalplayers = await totalPlayers.toArray()
  const totalPages = Math.ceil(totalPlayers / PAGE_SIZE);
  let results = await collection
    .find({})
    .limit(PAGE_SIZE)
    .skip(PAGE_SIZE * page)
    .toArray();
  res.json({
    totalPages: totalPages,
    totalPlayers: totalPlayers,
    results: results,
  });
  onsole.log(
    `Total player count is ${totalPlayers} and total pages is ${totalPages} and total unique players is ${eosidcount()}`
  );
  for await (const doc of agg) {
  console.log(doc);}
});

//This is to get a single record by id
router.get("/:id", async (req, res) => {
  console.log(`Get by ID requested.  Requested id is ${req.params.id}`);
  let collection = await db.collection(dbCollection);
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not Found").status(404);
  else res.send(result).status(200);
});

//Get Tribe memeber list
router.get("/tribe/:tribe", async (req, res) => {
  console.log(`Get tribe requested.  Requested tribe is ${req.params.tribe}`);
  let collection = await db.collection(dbCollection);
  let results = await collection.find({ tribe: req.params.tribe }).toArray();
  res.send(results).status(200);
});

//This section creates a new record. Need to change this to match the original backend so there is only 1.
router.post("/", async (req, res) => {
  try {
    let newDocument = {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    };
    let collection = await db.collection(dbCollection);
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error adding record");
  }
});

//This section is to update a record  **Should be able to delete since we won't be updating players.**
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level,
      },
    };

    let collection = await db.collection(dbCollection);
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error updating record");
  }
});

//This section is to delete a record **Should be able to delete since we won't be deleting player records**
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection(dbCollection);
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting record");
  }
});

//The below are from the original backend api.  Will need to test in dev kit.

//Adding new players when first joining server
router.post(`/players/add/:id`, (req, res) => {
  const newPlayer = req.body;
  db.collection(dbCollection)
    .findOneAndUpdate(
      { implantid: req.params.id },
      {
        $set: newPlayer,
      },
      { upsert: true, returnNewDocument: true }
    )
    .then((result) => {
      res.status(200).json(result);
      console.log("-- New player Information added --");
      console.log(updates);
    })
    .catch((err) => {
      res.status(500).json({ error: `Could not add player` });
      console.log("Error adding player information");
    });
});

//Updates players when they respawn.
router.post(`/players/update/:id`, (req, res) => {
  const updates = req.body;

  db.collection(dbCollection)
    .findOneAndUpdate(
      { implantid: req.params.id },
      {
        $set: {
          charactername: req.body.charactername,
          implantid: req.body.implantid,
          charLevel: req.body.charLevel,
          tribe: req.body.tribe,
          gender: req.body.gender,
          allnotes: req.body.allnotes,
          bttse: req.body.bttse,
          bttab: req.body.bttab,
          bttext: req.body.bttext,
          chibiLevel: req.body.chibiLevel,
          bosses: req.body.bosses,
          offline: req.body.offline,
        },
        $inc: { playTime: req.body.playTime },
      },
      { upsert: true, returnNewDocument: true }
    )
    .then((result) => {
      res.status(200).json(result);
      console.log("Player Information Updated");
    })
    .catch((err) => {
      res.status(500).json({ error: `Could not update player` });
      console.log("Error updating player information");
    });
});

//Adding to tokens to players accounts by EOS ID
router.post(`/tokens/:eos`, (req, res) => {
  const updates = req.body;

  db.collection(playerData)
    .findOneAndUpdate(
      { eosid: req.params.eos },
      { $inc: updates },
      { upsert: true, returnNewDocument: true }
    )
    .then((result) => {
      res.status(200).json(result);
      console.log("Tokens added");
      console.log(updates);
    })
    .catch((err) => {
      res.status(500).json({ error: `Could not update player` });
      console.log("Error adding player information");
      console.log(updates);
    });
});

export default router;
