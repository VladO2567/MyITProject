import { db } from "./../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  //CHECK IF USER EXISTS
  const q = "SELECT * FROM users WHERE email = ?";
  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists");
    //CREATE A NEW USER

    //Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const q =
      "INSERT INTO users(`firstName`, `lastName`, `email`, `password`, `profilePic`) VALUE (?)";

    const values = [
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      hashedPassword,
      req.body.profilePic,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been created.");
    });
  });
};

export const login = (req, res) => {
  const q = "SELECT * FROM users WHERE email = ?";
  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!checkPassword)
      return res.status(400).json("Wrong password or username!");

    const token = jwt.sign(
      { id: data[0].id },
      "secretworlddestroyingkeythatshouldneverbefoundout"
    );

    const { password, ...others } = data[0];
    const expirationDate = req.body.rememberMe
    ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    : undefined;

    res
      .cookie("accessToken", token, {
        httpOnly: true,
        expires: expirationDate,
      })
      .status(200)
      .json(others);
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("User has been logged out.");
};

export const getToken = (req, res) => {
  const accessToken = req.cookies.accessToken;
  res.json({ accessToken });
}