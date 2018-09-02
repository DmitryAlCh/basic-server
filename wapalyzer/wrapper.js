const Wappalyzer = require("wappalyzer");

const options = {
  debug: false,
  delay: 500,
  maxDepth: 3,
  maxUrls: 10,
  maxWait: 5000,
  recursive: true,
  userAgent: "Wappalyzer",
  htmlMaxCols: 2000,
  htmlMaxRows: 2000
};
getTech = domain => {
  return new Promise((resolve, reject) => {
    console.log("------------------", domain);
    const wappalyzer = new Wappalyzer(domain, options);
    wappalyzer
      .analyze()
      .then(json => {
        resolve(json);
        // process.stdout.write(JSON.stringify(json, null, 2) + "\n");
        // process.exit(0);
      })
      .catch(error => {
        reject(error);
        // process.stderr.write(error + "\n");
        // process.exit(1);
      });
  });
};
// getTech("https://www.ss.com").then(data => console.log(data));
module.exports = { getTech };
