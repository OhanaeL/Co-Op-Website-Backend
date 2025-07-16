const User = require('../models/User');
const ICTCE01 = require('../models/ICTCE01');
const ICTCE02 = require('../models/ICTCE02');

// Get user by userId
exports.getUserById = async (req, res) => {
	try {
		const user = await User.findById(req.params.userId).select('-password -refreshToken');
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		res.json(user);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server error' });
	}
};

// Get current logged-in user (needs auth middleware to set req.user)
exports.getCurrentUser = async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password -refreshToken');
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		res.json(user);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server error' });
	}
};

// Update user by userId
exports.updateUserById = async (req, res) => {
	try {
		const updates = req.body;
		// Prevent password updates here or handle separately with hashing
		delete updates.password;
		const user = await User.findByIdAndUpdate(req.params.userId, updates, {
			new: true,
			runValidators: true,
		}).select('-password -refreshToken');

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		res.json(user);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server error' });
	}
};

// Delete user by userId
exports.deleteUserById = async (req, res) => {
	try {
		const user = await User.findByIdAndDelete(req.params.userId);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		res.json({ message: 'User deleted successfully' });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server error' });
	}
};

// (Optional) Get multiple users by IDs - pass array of ids in req.body.userIds
exports.getMultipleUsersByIds = async (req, res) => {
	try {
		const { userIds } = req.body;
		if (!Array.isArray(userIds) || userIds.length === 0) {
			return res.status(400).json({ message: 'Invalid or empty userIds array' });
		}
		const users = await User.find({ _id: { $in: userIds } }).select('-password -refreshToken');
		res.json(users);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server error' });
	}
};


exports.getUsersWithStep1AndForms = async (req, res) => {
    try {
        // Find all users with currentStep = 1
        const usersStep1 = await User.find({ currentStep: 1 });

        // For each user, fetch ICTCE01 and ICTCE02 related data
        const results = await Promise.all(usersStep1.map(async (user) => {
        let ictce01 = await ICTCE01.findOne({ userId: user._id });

        const ictce02List = await ICTCE02.find({ studentEmails: user.email });

        return {
            user,
            ictce01,
            ictce02: ictce02List[0] || null,
        };
        }));

        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.connectStudentAndCompany = async (req, res) => {
    try {
        const { studentId, companyId } = req.body;
        if (!studentId || !companyId) {
        return res.status(400).json({ error: 'studentId and companyId are required' });
        }

        // Update company: add studentId to connectedUsers if not already present
        const updatedCompany = await User.findByIdAndUpdate(
        companyId,
        { $addToSet: { connectedUsers: studentId } },
        { new: true }
        );

        if (!updatedCompany) {
        return res.status(404).json({ error: 'Company user not found' });
        }

        // Update student: add companyId to connectedUsers AND set currentStep to 2
        const updatedStudent = await User.findByIdAndUpdate(
        studentId,
        { 
            $addToSet: { connectedUsers: companyId },
            $set: { currentStep: 2 }
        },
        { new: true }
        );

        if (!updatedStudent) {
        return res.status(404).json({ error: 'Student user not found' });
        }

        res.json({
        message: 'Users connected successfully and student step updated to 2',
        company: updatedCompany,
        student: updatedStudent
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};