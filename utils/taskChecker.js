const mongoose = require("mongoose");
const Task = require("../model/task.model");
const User = require("../model/user.model");
const sendEmail = require("./emailService");
// Function to check tasks and send reminders
const checkTasksAndSendReminders = async () => {
  try {
    const now = new Date();
    const startOfDay = new Date(now.setUTCHours(0, 0, 0, 0)); // Start of the current day
    const endOfDay = new Date(now.setUTCHours(23, 59, 59, 999)); // End of the current day

    // Find tasks with deadlines within the current day
    const tasks = await Task.find({
      dueDate: { $gte: startOfDay.toISOString(), $lt: endOfDay.toISOString() },
    });

    for (const task of tasks) {
      // Find the user who owns the task
      const user = await User.findById(task.owner);

      console.log("Reminders sent successfully. to-", user);
      if (user && user.email) {
        // Prepare email content
        const emailSubject = `Reminder: Task "${task.title}" Deadline Approaching`;
        const emailText = `The deadline for the task "${
          task.title
        }" is today. Please make sure to complete it on time.
        Deadline: ${
          task.dueDate
        } visit- ${`https://jazzy-kleicha-8be487.netlify.app/`} `;

        // Send email reminder
        sendEmail(user.email, emailSubject, emailText);
      } else {
        console.error(`No email found for user with ID ${task.owner}`);
      }
    }
  } catch (error) {
    console.error("Error checking tasks:", error);
  }
};

module.exports = checkTasksAndSendReminders;
