// Mock server data
import users from "./mock_data/users";

function getUsername(email) {
  try {
    return users[email].name;
  } catch (error) {
    console.error(error);
    return ""; // Return empty string if name cannot be retrieved
  }
}

export default {
  getUsername
};
