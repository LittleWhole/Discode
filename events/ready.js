module.exports = {
  async main(client) {
    client.on('ready', () => {
      client.user.setActivity("support tickets", { type: "Listening" });
      console.log(">> Bot has restarted.");
      console.log(">> Logged in as " + client.user.username + ".");
    });
  }
}                                        