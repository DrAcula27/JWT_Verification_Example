const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");

// @route:   GET api/users
// @desc:    Test route
// @access:  Public
router.get("/", (req, res) => res.send("User Route"));

// @route:   GET api/users
// @desc:    Register user and get JWT
// @access:  Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be at least 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    // check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // test if info being sent
    // return res.send(req.body);

    const { name, email, password } = req.body;

    try {
      // create instance of user
      let user = await User.findOne({ email });

      // check if user already exists
      if (user) {
        return res.status(400).json([{ msg: "user already exists" }]);
      }
      user = new User({
        name,
        email,
        password,
      });

      // encrypt pw
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // save user
      await user.save();

      // create jwt
      const payload = {
        user: {
          id: user.id,
          name: user.name,
        },
      };
      jwt.sign(
        payload,
        process.env.jwtSecret,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

module.exports = router;
