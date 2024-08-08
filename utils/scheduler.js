const cron = require("node-cron");
const checkTasksAndSendReminders = require("./taskChecker");

// Schedule the task checking function to run every 10 hours
cron.schedule("0 */10 * * *", () => {
  console.log("Running task check...");
  checkTasksAndSendReminders();
});
