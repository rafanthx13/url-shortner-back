const app = require("./src/app");

app.listen(process.env.PORT, () => {
  console.log(`App Listening on Port: ${process.env.PORT}.`);
});
