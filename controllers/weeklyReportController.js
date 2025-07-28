const weeklyReport = require('../models/weeklyReport');

// Create or update a form by userId (upsert behavior)
exports.createOrUpdateForm = async (req, res) => {
    try {
        const { userId, ...formData } = req.body;

        if (!userId) {
            return res.status(400).json({ error: 'userId is required.' });
        }

        const updatedForm = await weeklyReport.findOneAndUpdate(
            { userId },
            { userId, ...formData },
            { new: true, upsert: true }
        );

        res.status(200).json(updatedForm);
    } catch (err) {
        console.error('Error saving form:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

// Get a form by userId
exports.getFormByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        const form = await weeklyReport.findOne({ userId });

        if (!form) {
            return res.status(404).json({ error: 'Form not found.' });
        }

        res.status(200).json(form);
    } catch (err) {
        console.error('Error retrieving form:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

// Get a form by database ID
exports.getFormById = async (req, res) => {
    try {
        const { id } = req.params;

        const form = await weeklyReport.findById(id);

        if (!form) {
            return res.status(404).json({ error: 'Form not found.' });
        }

        res.status(200).json(form);
    } catch (err) {
        console.error('Error retrieving form by ID:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

// Delete a form by userId
exports.deleteFormByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        const result = await weeklyReport.findOneAndDelete({ userId });

        if (!result) {
            return res.status(404).json({ error: 'Form not found.' });
        }

        res.status(200).json({ message: 'Form deleted successfully.' });
    } catch (err) {
        console.error('Error deleting form:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
};
