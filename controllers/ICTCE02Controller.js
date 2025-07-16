const Ictce02 = require('../models/ICTCE02');

// Create new record
exports.createIctce02 = async (req, res) => {
  try {
    const data = req.body;
    const newRecord = new Ictce02(data);
    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all records
exports.getAllIctce02 = async (req, res) => {
  try {
    const records = await Ictce02.find().populate('userId', 'email name');
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get record by ID
exports.getIctce02ById = async (req, res) => {
  try {
    const record = await Ictce02.findById(req.params.id).populate('userId', 'email name');
    if (!record) {
      return res.status(404).json({ error: 'Record not found' });
    }
    res.json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update record by ID
exports.updateIctce02 = async (req, res) => {
  try {
    const updated = await Ictce02.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ error: 'Record not found' });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete record by ID
exports.deleteIctce02 = async (req, res) => {
  try {
    const deleted = await Ictce02.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Record not found' });
    }
    res.json({ message: 'Record deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
