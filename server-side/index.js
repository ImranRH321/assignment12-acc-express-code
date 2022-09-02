// const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const app = express();
const ObjectId = require("mongodb").ObjectId;
const port = process.env.PORT || 5000;
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const dbConnect = require('./utls/dbConntect');
const toolsRoute = require("./routes/v1/tools.routes")
const viewCount = require('./middleware/viewCount'); 
const errorHandle = require("./middleware/errorHandle");


//___MiddleWare___\\
app.use(cors());
app.use(express.json());
app.use(express.static('publick'))
app.set('view engine', 'ejs') 
// app.use(viewCount) 



// Apply the rate limiting middleware to all requests
// app.use(limiter)


app.use('/api/v1/tools', toolsRoute) 

dbConnect()



const jwtVaryFy = (req, res, next) => {
  const autHeader = req.headers.authorization;
  if (!autHeader) {
    return res.status(403).send({ messages: "unAuthorization access" });
  }
  const token = autHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
    if (err) {
      return res.status(401).send({ messages: "forbidden access" });
    }
    req.decoded = decoded;
    next();
  });
};

/* ------------------------------------ */
async function run() {
  try {
//     client.connect();
//     const serviceCollection = client.db("Car_ware_Tools").collection("services");
//     const orderCollection = client.db("Car_ware_Tools").collection("orders");
//     const userCollection = client.db("Car_ware_Tools").collection("users");
//     const paymentCollection = client.db("Car_ware_Tools").collection("payments");
//     const myProfileCollection = client.db("Car_ware_Tools").collection("myProfile");
//     const ratingCollection = client.db("Car_ware_Tools").collection("rating");

//     //   _________Services_Collection_________
//     app.get("/service", async (req, res) => {
//       const result = await serviceCollection.find().toArray();
//       res.send(result);
//     });

//     app.get("/service/:id", jwtVaryFy, async (req, res) => {
//       const id = req.params.id;
//       const result = await serviceCollection
//         .find({ _id: ObjectId(id) })
//         .toArray();
//       res.send(result);
//     });

//     // _______user_Get________
//     app.get("/user", jwtVaryFy, async (req, res) => {
//       const result = await userCollection.find({}).toArray();
//       res.send(result);
//     });

//     //   _________Ratting________
//     // app.post("/rating", async (req, res) => {
//     //   const result = await ratingCollection.insertOne(req.body);
//     //   res.send(result);
//     // });

//     // // _______Ratting_Get________
//     // app.get("/rating", async (req, res) => {
//     //   const result = await ratingCollection.find({}).toArray();
//     //   res.send(result);
//     // });
 
     
  
    

//     //   _________Orders_Collection_POST_________
//     app.post("/order", async (req, res) => {
//       console.log("----->", req.body);
//       const result = await orderCollection.insertOne(req.body);
//       res.send(result);
//     });
//     //   _________Orders_Collection_GET_________
//     app.get("/order", jwtVaryFy, async (req, res) => {
//       const email = req.query.email;
//       const decodedEmail = req.decoded.email;
//       if (decodedEmail === email) {
//         const result = await orderCollection
//           .find({ userEmail: email })
//           .toArray();
//         return res.send(result);
//       } else {
//         return res.status(401).send({ messages: "forbidden access" });
//       }
//     });

//     //   _________Orders_Collection_Deleted_id_________
//     app.delete("/order/:id", async (req, res) => {
//       const id = req.params.id;
//       const result = await orderCollection.deleteOne({ _id: ObjectId(id) });
//       res.send(result);
//     });

//     // ______________addProduct________________
//     app.post("/addProduct", jwtVaryFy, async (req, res) => {
//       const result = await serviceCollection.insertOne(req.body);
//       res.send(result);
//     });

//     // _____________AllProduct___________
//     app.get("/allProducts", jwtVaryFy, async (req, res) => {
//       const result = await serviceCollection.find().toArray();
//       res.send(result);
//     });

//     //   _________AllProduct_Deleted_id_________
//     app.delete("/allProduct/:id", async (req, res) => {
//       const id = req.params.id;
//       const result = await serviceCollection.deleteOne({ _id: ObjectId(id) });
//       console.log(result);
//       res.send(result);
//     });

//     // __________Manage _Product_all__________
//     app.get("/manage", jwtVaryFy, async (req, res) => {
//       const result = await orderCollection.find().toArray();
//       res.send(result);
//     });

//     //  ___Manage_Deleted_single_product________
//     app.delete("/manage/:id", async (req, res) => {
//       const id = req.params.id;
//       console.log("id", id);
//       const result = await orderCollection.deleteOne({ _id: ObjectId(id) });
//       res.send(result);
//     });

//     //  ______userCollection______
//     app.put("/user", async (req, res) => {
//       const email = req.query.email;
//       const user = req.body;
//       const filter = { email: email };
//       const options = { upsert: true };
//       const updateDoc = {
//         $set: user,
//       };
//       const result = await userCollection.updateOne(filter, updateDoc, options);
//       const token = jwt.sign(
//         { email: email },
//         process.env.ACCESS_TOKEN_SECRET,
//         { expiresIn: "12h" }
//       );
//       res.send({ result, token });
//     });

//     // _____________admin_email_____________
//     app.get("/admin/:email", jwtVaryFy, async (req, res) => {
//       const email = req.params.email;
//       const user = await userCollection.findOne({ email: email });
//       const isAdmin = user.role === "admin";
//       res.send({ admin: isAdmin });
//     });

//     //  ___________admin_Deleted_user________
//     app.delete("/admin/:email", async (req, res) => {
//       const email = req.params.email;
//       const result = await userCollection.deleteOne({ email: email });
//       res.send(result);
//     });

//     // __________make_admin________
//     app.put("/user/admin/:id", jwtVaryFy, async (req, res) => {
//       const email = req.params.id;
//       const requester = req.decoded.email;
//       const requesterAccount = await userCollection.findOne({
//         email: requester,
//       });
//       if (requesterAccount.role === "admin") {
//         const filter = { email: email };
//         const updateDoc = {
//           $set: {
//             role: "admin",
//           },
//         };
//         const result = await userCollection.updateOne(filter, updateDoc);
//         res.send(result);
//       } else {
//         res.status(403).send({ messages: "unAuthorization access" });
//       }
//     });

//     // --------Payment_confirm_pending-----------
//     app.patch("/paymentConfirm/:id", async (req, res) => {
//       const id = req.params.id;
//       console.log(id);
//       const statusText = req.body.statusText;
//       const filter = { _id: ObjectId(id) };
//       const updateDoc = {
//         $set: {
//           status: statusText,
//         },
//       };
//       const result = await orderCollection.updateOne(filter, updateDoc);
//       res.send(result);
//     });

//     // ------------UpdateProfile____________
//     app.put("/myProfile", async (req, res) => {
//       const email = req.query.email;
//       const user = req.body;
//       const filter = { email: email };
//       const options = { upsert: true };
//       const updateDoc = {
//         $set: user,
//       };
//       const result = await myProfileCollection.updateOne(
//         filter,
//         updateDoc,
//         options
//       );
//       res.send(result);
//     });
//     //  __myProfileGet__
//     app.get("/myProfile/:email", jwtVaryFy, async (req, res) => {
//       const email = req.params.email;
//       const result = await myProfileCollection.findOne({ email: email });
//       res.send(result);
//     });

//     //   _______Orders_id______
//     app.get("/order/:id", jwtVaryFy, async (req, res) => {
//       const id = req.params.id;
//       const result = await orderCollection.findOne({ _id: ObjectId(id) });
//       res.send(result);
//     });

//     // _________Payment__________
//     app.post("/create-payment-intent", async (req, res) => {
//       const service = req.body;
//       const price = service.price;
//       const amount = price * 100;
//       const paymentIntent = await stripe.paymentIntents.create({
//         amount: amount,
//         currency: "usd",
//         payment_method_types: ["card"],
//       });
//       res.send({
//         clientSecret: paymentIntent.client_secret,
//       });
//     });
// console.log('hi ');
//     // ______________patch_______________
//     app.patch("/payment/:id", async (req, res) => {
//       const id = req.params.id;
//       const payment = req.body;
//       const filter = { _id: ObjectId(id) };
//       const updateDoc = {
//         $set: {
//           paid: true,
//           status: "pending",
//           transactionId: payment.transactionId,
//         },
//       };
//       const result = await paymentCollection.insertOne(payment);
//       const updatedBooking = await orderCollection.updateOne(filter, updateDoc);
//       res.send(updateDoc);
//     });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);
/* ----------------------------------------------------------------------- */
app.get("/", (req, res) => {
  // res.send("Project is running"); 
  // res.sendFile(__dirname + '/publick/test.html')
  // res.sendFile(__dirname + '/publick/wow.png')
  res.render('home.ejs', {
    id: 2,
    user: {
      name: 'test name jeef'
    }
  })
});

app.all("*", (req, res) => {
  res.send("No found Data")
})

app.use(errorHandle) 

app.listen(port, () => {
  console.log(`Project Running Braked port ${port}`);
});


process.on('unhandledRejection', (error) => {
  console.log(error.name, error.message);
  app.close(()=> {
    process.exit(1)
  })
})