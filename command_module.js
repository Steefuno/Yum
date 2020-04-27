var prefix = "hey steve";

// check if a string is in command format
const is_command = function(message) {
  return (message.match(/${prefix}/i) != null);
}
exports.is_command = is_command;

// get text after prefix