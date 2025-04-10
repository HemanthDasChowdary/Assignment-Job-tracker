const Job = require("../models/Job");

// Create
const addJob = async (req, res) => {
  const job = new Job(req.body);

  const existing = await Job.findOne({
    company: { $regex: `^${req.body.company}$`, $options: "i" },
    role: { $regex: `^${req.body.role}$`, $options: "i" },
  });

  if (existing) {
    return res
      .status(400)
      .json({ message: "Duplicate application already exists." });
  }

  const saved = await job.save();
  res.status(201).json(saved);
};

// Read all
const getJobs = async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
};

// Update
const updateJob = async (req, res) => {
  const updated = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
};

// Delete
const deleteJob = async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);
  res.json({ message: "Job deleted" });
};

module.exports = { addJob, getJobs, updateJob, deleteJob };
