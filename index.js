import app from "./src/app.js";
const PORT = app.get("port");

app.listen(PORT, () => {
  console.log("API SHELLS LOAD SUCCESS");
  console.log("Server on port :", PORT);
  console.log("Environment:", `[${process.env.NODE_ENV}]`);
  console.log(`http://localhost:${PORT}`);
});