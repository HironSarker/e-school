const express = require("express");
const cors = require("cors");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const app = express();
const stripe = require("stripe")(process.env.PAYMENT_SECRET_KEY);
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

const verifyJWT = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res
      .status(401)
      .send({ error: true, message: "Unauthorized access" });
  }

  const token = authorization.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .send({ error: true, message: "Unauthorized access" });
    }

    req.decoded = decoded;
    next();
  });
};

app.get("/", (req, res) => {
  res.send("E-School is Running");
});

app.listen(port, () => {
  console.log(`E-School is Running on port: ${port}`);
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8tb7t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    // Database Collections ------------------------------------------------------------------
    const eSchoolDB = client.db("eSchoolDB");
    const usersCollection = eSchoolDB.collection("users");
    const coursesCollection = eSchoolDB.collection("courses");
    const bookingsCollection = eSchoolDB.collection("bookings");
    const paymentsCollection = eSchoolDB.collection("payments");

    app.post("/jwt", (req, res) => {
      const user = req.body;

      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
      });

      res.send({ token });
    });

    // Verify Admin --------------------------------------------------------------
    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;

      const query = { email: email };

      const user = await usersCollection.findOne(query);

      if (user?.role !== "admin") {
        return res
          .status(403)
          .send({ error: true, message: "forbidden access" });
      }

      next();
    };

    // Verify Instructor --------------------------------------------------------------
    const verifyInstructor = async (req, res, next) => {
      const email = req.decoded.email;

      const query = { email: email };

      const user = await usersCollection.findOne(query);

      if (user?.role !== "instructor") {
        return res
          .status(403)
          .send({ error: true, message: "forbidden access" });
      }

      next();
    };

    // Verify Learner --------------------------------------------------------------
    const verifyLearner = async (req, res, next) => {
      const email = req.decoded.email;

      const query = { email: email };

      const user = await usersCollection.findOne(query);

      if (user?.role !== "learner") {
        return res
          .status(403)
          .send({ error: true, message: "forbidden access" });
      }

      next();
    };

    // Users Management ------------------------------------------------------------------------
    app.get("/users", async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    });

    app.get("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await usersCollection.findOne(query);
      res.send(result);
    });

    app.get("/curr-user/:email", async (req, res) => {
      const email = req.params.email;
      // const query = { }
      const result = await usersCollection.findOne({ email: email });
      res.send(result);
    });

    app.get("/instructors", async (req, res) => {
      const result = await usersCollection
        .find({ role: "instructor" })
        .toArray();
      res.send(result);
    });

    app.get("/learners", async (req, res) => {
      const result = await usersCollection.find({ role: "learner" }).toArray();
      res.send(result);
    });

    app.post("/users", async (req, res) => {
      const user = req.body;
      const query = { email: user.email };
      const existingUser = await usersCollection.findOne(query);
      if (existingUser) {
        res.send({ message: "User already exist" });
      } else {
        const result = await usersCollection.insertOne(user);
        res.send(result);
      }
    });

    app.patch("/users/learner/:id", verifyJWT, async (req, res) => {
      const query = { _id: new ObjectId(req.params.id) };

      const updateDoc = {
        $set: {
          role: "learner",
        },
      };

      const result = await usersCollection.updateOne(query, updateDoc);
      res.send(result);
    });

    app.patch("/users/instructor/:id", verifyJWT, async (req, res) => {
      const query = { _id: new ObjectId(req.params.id) };

      const updateDoc = {
        $set: {
          role: "instructor",
        },
      };

      const result = await usersCollection.updateOne(query, updateDoc);
      res.send(result);
    });

    app.patch("/users/admin/:id", verifyJWT, async (req, res) => {
      const query = { _id: new ObjectId(req.params.id) };

      const updateDoc = {
        $set: {
          role: "admin",
        },
      };

      const result = await usersCollection.updateOne(query, updateDoc);
      res.send(result);
    });

    // Edit User
    app.put("/users/:id", verifyJWT, async (req, res) => {
      const user = req.body;
      // console.log(user);
      const query = { _id: new ObjectId(req.params.id) };

      const updateDoc = {
        $set: {
          profilePicture: user?.profilePicture,
          name: user?.name,
          phone: user?.phone || "",
          biography: user?.biography || "",
          gender: user?.gender || "",
          institution: user?.institution || "",
          linkedIn: user?.linkedIn || "",
          currCity: user?.currCity || "",
        },
      };

      const result = await usersCollection.updateOne(query, updateDoc);
      res.send(result);
    });

    // Courses Management ------------------------------------------------------------------------

    app.get("/courses", async (req, res) => {
      const result = await coursesCollection.find().toArray();
      res.send(result);
    });

    app.get("/courses/:id", async (req, res) => {
      const result = await coursesCollection.findOne({
        _id: new ObjectId(req.params.id),
      });
      res.send(result);
    });

    app.post("/courses", verifyJWT, async (req, res) => {
      const course = req.body;
      // console.log(course);
      // const query = { courseName: course.courseName, batchNumber: course.batchNumber };

      const existingCourse = await coursesCollection.findOne({
        $and: [
          { courseName: course.courseName },
          { batchNumber: course.batchNumber },
        ],
      });
      if (existingCourse) {
        res.send({ message: "Course already exist" });
      } else {
        const result = await coursesCollection.insertOne(course);
        res.send(result);
      }
    });

    app.patch("/courses/published/:id", async (req, res) => {
      const query = { _id: new ObjectId(req.params.id) };
      const updateDoc = {
        $set: {
          isPublished: "true",
        },
      };
      const result = await coursesCollection.updateOne(query, updateDoc);
      res.send(result);
    });

    app.patch("/courses/hidden/:id", async (req, res) => {
      const query = { _id: new ObjectId(req.params.id) };
      const updateDoc = {
        $set: {
          isPublished: "false",
        },
      };
      const result = await coursesCollection.updateOne(query, updateDoc);
      res.send(result);
    });

    app.put("/courses/update-course/:id", verifyJWT, async (req, res) => {
      const courseInfo = req.body;
      const query = { _id: new ObjectId(req.params.id) };
      const updateDoc = {
        $set: {
          courseIntroduction: courseInfo?.courseIntroduction,
          courseLevel: courseInfo?.courseLevel,
          courseName: courseInfo?.courseName,
          batchNumber: courseInfo?.batchNumber,
          registrationStartDate: courseInfo?.registrationStartDate,
          registrationEndDate: courseInfo?.registrationEndDate,
          courseStartDate: courseInfo?.courseStartDate,
          courseDurationInMonths: courseInfo?.courseDurationInMonths,
          selectedInstructor: courseInfo?.selectedInstructor,
          courseFee: courseInfo?.courseFee,
          courseBanner: courseInfo?.courseBanner,
          courseOutline: courseInfo?.courseOutline,
        },
      };
      const result = await coursesCollection.updateOne(query, updateDoc);
      res.send(result);
    });

    app.delete("/courses/remove/:id", verifyJWT, async (req, res) => {
      const result = await coursesCollection.deleteOne({
        _id: new ObjectId(req.params.id),
      });
      res.send(result);
    });

    // Course Bookings Management
    app.get("/bookings", async (req, res) => {
      const result = await bookingsCollection.find().toArray();
      res.send(result);
    });

    app.get("/courseBookings", verifyJWT, async (req, res) => {
      const email = req.query.email;

      if (!email) {
        res.send([]);
      }

      const decodedEmail = req.decoded.email;

      if (email !== decodedEmail) {
        return res
          .status(403)
          .send({ error: true, message: "forbidden access" });
      }

      const query = { email: email };

      const result = await bookingsCollection.find(query).toArray();
      res.send(result);
    });

    app.get("/courseBookings/:id", verifyJWT, async (req, res) => {
      const id = req.params.id;

      const query = { _id: new ObjectId(id) };

      const result = await bookingsCollection.findOne(query);
      res.send(result);
    });

    app.post("/courseBookings", verifyJWT, async (req, res) => {
      const courseItem = req.body;
      const existingBooking = await bookingsCollection.findOne({
        bookingItemId: courseItem.bookedItemId,
      });
      if (existingBooking) {
        console.log(existingBooking);
        res.send("Already Added!");
      } else {
        const result = await bookingsCollection.insertOne(courseItem);
        res.send(result);
      }
    });

    app.delete("/courseBookings/:id", async (req, res) => {
      const id = req.params.id;

      const query = { _id: new ObjectId(id) };

      const result = await bookingsCollection.deleteOne(query);
      res.send(result);
    });

    // <---- create payment intent ---->
    app.post("/create-payment-intent", verifyJWT, async (req, res) => {
      const { courseFee } = req.body;

      if (courseFee) {
        const amount = parseFloat(courseFee) * 100;
        const paymentIntent = await stripe.paymentIntents.create({
          amount: amount,
          currency: "usd",
          payment_method_types: ["card"],
        });

        res.send({
          clientSecret: paymentIntent.client_secret,
        });
      }
    });

    // <---payments collection apis--->

    app.post("/payments", verifyJWT, async (req, res) => {
      const payment = req.body;

      const insertResult = await paymentsCollection.insertOne(payment);

      const query = { _id: new ObjectId(payment.bookedItemId) };

      const deleteResult = await bookingsCollection.deleteOne(query);

      res.send({ insertResult, deleteResult });
    });

    app.get("/enrolled-courses/:email", verifyJWT, async (req, res) => {
      const email = req.params.email;
      const result = await paymentsCollection
        .aggregate([
          {
            $match: {
              email: email,
            },
          },
          { $sort: { date: -1 } },
        ])
        .toArray();
      res.send(result);
    });
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// 25If8KrHdJHymwZC
