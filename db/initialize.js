const { appendData } = require("./crud");

const initialFiles = ["checked", "results"];

console.log("Running initialize DB script");

initialFiles.map(checkedOrResults =>
  appendData(checkedOrResults, "[]").catch(e => {
    console.log("Needed files not created due to", e);
    console.log(
      "Please manually create already-checked.json and result.json inside DB folder"
    );
  })
);
