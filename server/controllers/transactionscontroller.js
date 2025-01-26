const tran = require("../models/transactions");

exports.add = async (req, res) => {
  const { type, value, to, benefits, note } = req.body;
  try {
    const newtran = await tran.create({
      type,
      value,
      to,
      benefits,
      note,
    });
    return res
      .status(200)
      .json({ msj: "transaction added succesfuly", tran: newtran });
  } catch (error) {
    return res.status(500).json({ err: error });
  }
};

exports.getall = async (req, res) => {
  const { verif } = req.body;
  if (verif) {
    try {
      const all = await tran.find({});

      const formattedAll = all.map((transaction) => {
        return {
          ...transaction._doc,
          createdAt: new Intl.DateTimeFormat("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: true,
          }).format(new Date(transaction.createdAt)),
        };
      });

      return res.status(200).json({ all: formattedAll });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ err: error.message });
    }
  } else {
    return res.status(401).json({ err: "Unauthorized" });
  }
};

exports.sold = async (req, res) => {
  const { verif } = req.body;
  if (verif) {
    try {
      const trans = await tran.find({});
      let sold = 0;
      trans.forEach((transaction) => {
        if (transaction.type === "+") {
          sold += transaction.value;
        } else if (transaction.type === "-") {
          sold -= transaction.value;
        }
      });
      return res.status(200).json({ sold: sold });
    } catch (error) {
      console.error("Error calculating sold value:", error);
      return res.status(500).json({ err: error.message });
    }
  } else {
    return res.status(401).json({ err: "Unauthorized" });
  }
};

exports.totalBenefits = async (req, res) => {
  const { verif } = req.body;
  if (verif) {
    try {
      const trans = await tran.find({});
      let total = 0;
      trans.forEach((transaction) => {
        total += transaction.benefits;
      });
      return res.status(200).json({ total: total });
    } catch (error) {
      console.error("Error calculating total benefits:", error);
      return res.status(500).json({ err: error.message });
    }
  } else {
    return res.status(401).json({ err: "Unauthorized" });
  }
};