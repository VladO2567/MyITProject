import { db } from "./../connect.js";
import jwt from "jsonwebtoken";

export const getModels = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(
    token,
    "secretworlddestroyingkeythatshouldneverbefoundout",
    (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");

      const q = `
        SELECT  m.id AS modelId, m.payName, m.recName, m.bankNum, m.accNum, m.payRefNum, m.payDesc, m.payImg, 
                p.payedAt AS lastPaid, p.payAmount AS paidAmt
        FROM models AS m
        LEFT JOIN (
          SELECT modelId, MAX(payedAt) AS latestPaymentDate
          FROM payments
          GROUP BY modelId
        ) AS ep ON m.id = ep.modelId
        LEFT JOIN payments AS p ON ep.modelId = p.modelId AND ep.latestPaymentDate = p.payedAt
        WHERE m.userId = ?
        ORDER BY lastPaid DESC;
      `;

      db.query(q, [userInfo.id], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data);
      });
    }
  );
};

export const getModel = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(
    token,
    "secretworlddestroyingkeythatshouldneverbefoundout",
    (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");

      const q = `SELECT * FROM models WHERE id = ? AND userId = ?`;

      db.query(q, [req.params.id, userInfo.id], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data);
      });
    }
  );
};

export const addModel = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(
    token,
    "secretworlddestroyingkeythatshouldneverbefoundout",
    (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");

      const q =
        "INSERT INTO models (`userId`, `payName`, `recName`, `bankNum`, `accNum`, `payRefNum`, `payDesc`, `payImg`) VALUES (?)";

      const values = [
        userInfo.id,
        req.body.payName,
        req.body.recName,
        req.body.bankNum,
        req.body.accNum,
        req.body.payRefNum,
        req.body.payDesc,
        req.body.payImg,
      ];

      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json("Model has been created.");
      });
    }
  );
};

export const updateMode = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(
    token,
    "secretworlddestroyingkeythatshouldneverbefoundout",
    (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");

      const q =
        "UPDATE models SET payName = ?, recName = ?, bankNum = ?, accNum = ?, payRefNum = ?, payDesc = ?, payImg = ? WHERE id = ? AND userId = ?";

      db.query(
        q,
        [
          req.body.payName,
          req.body.recName,
          req.body.bankNum,
          req.body.accNum,
          req.body.payRefNum,
          req.body.payDesc,
          req.body.payImg,
          req.params.id,
          userInfo.id,
        ],
        (err, data) => {
          if (err) return res.status(500).json(err);
          if (data.affectedRows > 0) return res.json("Updated!");
          return res
            .status(403)
            .json("Something went wrong while attempting to update model.");
        }
      );
    }
  );
};
export const deleteModel = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(
    token,
    "secretworlddestroyingkeythatshouldneverbefoundout",
    (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");

      const q = "DELETE FROM models WHERE id = ? AND userId = ?";

      db.query(q, [req.params.id, userInfo.id], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.affectedRows > 0)
          return res.status(200).json("Model has been deleted.");
      });
    }
  );
};
