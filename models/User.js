const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		minlength: [3, 'Username must be at least 3 characters']
	},
	password: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true,
		match: [/.+\@.+\..+/, 'Enter a valid email']
	},
	userType: {
		type: String,
		enum: ['admin', 'student', 'ajarn', 'alumni'],
		required: true
	},
	firstName: {
		type: String
	},
	surName: {
		type: String
	},
	displayName: {
		type: String
	},
	refreshToken: {
		type: String
	},
	resetPasswordToken: {
		type: String
	},
	resetPasswordExpires: {
		type: Date
	},
	connectedUsers: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}],
	isDeleted: {
		type: Boolean,
		default: false
	},
	currentStep: {
	type: Number,
	enum: [0, 1, 2, 3, 4],
	default: 0
	},
	connectedUsers: [{
	type: mongoose.Schema.Types.ObjectId,
	ref: 'User'
	}]
}, {
	timestamps: true
});

// Set displayName to username if not provided
UserSchema.pre('save', function (next) {
	if (!this.displayName) {
		this.displayName = this.username;
	}
	next();
});

module.exports = mongoose.model('User', UserSchema);
