const stat = require("../models/stats");

exports.add = async (req, res) => {
  const { type, on, nb } = req.body;
  try {
    const createdAt = new Date();
    const existingStat = await stat.findOne({ createdAt: { $gte: createdAt } });
    if (existingStat) {
      return res.status(400).json({
        error: "Duplicate entry: The stat with this timestamp already exists.",
      });
    }
    const statss = await stat.create({
      type: type,
      on: on,
      nb: nb || 1,
    });
    return res.status(200).json({ message: "Stat entry created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

exports.getStats = async (req, res) => {
  const verif = req.body.verif; // Ensure you are checking the verif property
  if (!verif) {
    return res.status(400).json({ error: "Verification failed" });
  }

  try {
    const Stats = await stat.aggregate([
      {
        $group: {
          _id: { type: "$type", on: "$on" },
          totalNb: { $sum: "$nb" },
        },
      },
      {
        $project: {
          type: "$_id.type",
          on: "$_id.on",
          nb: "$totalNb",
          _id: 0,
        },
      },
    ]);
    return res.status(200).json(Stats);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

exports.dash = async (req, res) => {
  try {
    const { on } = req.body;
    if (!on) {
      return res.status(400).json({ message: "The 'on' field is required." });
    }

    const results = await stat.aggregate([
      {
        $match: { on: on },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          totalNb: { $sum: "$nb" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const chartData = results.map((item) => ({
      day: item._id,
      sum: item.totalNb,
    }));
    res.status(200).json(chartData);
  } catch (error) {
    console.error("Error in dash function:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
