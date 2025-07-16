async function sendEmail({ to, subject, text }) {
	try {
		// Placeholder: just log the email contents
		console.log('Sending email:');
		console.log(`To: ${to}`);
		console.log(`Subject: ${subject}`);
		console.log(`Text: ${text}`);

		// TODO: Replace with actual email sending code (e.g. nodemailer)
		return Promise.resolve();
	} catch (error) {
		console.error('Error sending email:', error);
		throw error;
	}
}

module.exports = sendEmail;
