import { db } from "./../connect.js";
import jwt from "jsonwebtoken";

export const updateUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(
    token,
    "secretworlddestroyingkeythatshouldneverbefoundout",
    (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");

      const q =
        "UPDATE users SET `firstName` = ?, `lastName` = ?, `email` = ?, `profilePic` = ? WHERE id = ?";

      db.query(
        q,
        [
          req.body.firstName,
          req.body.lastName,
          req.body.email,
          req.body.profilePic,
          userInfo.id,
        ],
        (err, data) => {
          if (err) return res.status(500).json(err);
          if (data.affectedRows > 0) return res.json("Updated!");
          return res.status(403).json("Something went wrong while attempting to update user.");
        }
      );
    }
  );
};