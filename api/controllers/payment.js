import moment from "moment/moment.js";
import { db } from "./../connect.js";
import jwt from "jsonwebtoken";

export const addPayment = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(
    token,
    "secretworlddestroyingkeythatshouldneverbefoundout",
    (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");

      const q =
        "INSERT INTO payments (`userId`, `modelId`, `recName`, `bankNum`, `accNum`, `payRefNum`, `payDesc`, `payAmount`, `payedAt`) VALUES (?)";

      const values = [
        userInfo.id,
        req.body.modelId,
        req.body.recName,
        req.body.bankNum,
        req.body.accNum,
        req.body.payRefNum,
        req.body.payDesc,
        req.body.payAmount,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      ];

      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json("Payment has been created.");
      });
    }
  );
}

export const getPayments = (req, res) => {
  const q = "SELECT id, payedAt, payAmount FROM payments WHERE modelId = ? ORDER BY payedAt ASC";

  db.query(q, [req.query.modelId], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};