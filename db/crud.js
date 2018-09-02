const fs = require("fs");
const path = require("path");

const checkedList = path.join(__dirname, "./already-checked.json");
const resultList = path.join(__dirname, "./results.json");

selectFile = checkedOrResults => {
  switch (checkedOrResults) {
    case "checked":
      return checkedList;
      break;
    case "results":
      return resultList;
      break;
    default:
      return checkedList;
  }
};

readFile = async checkedOrResults => {
  console.log(checkedOrResults);
  let pathToFile = selectFile(checkedOrResults);
  return new Promise((resolve, reject) => {
    fs.readFile(pathToFile, "utf-8", (err, data) => {
      if (err) {
        console.log("error", err);
        reject();
      } else {
        console.log(data);
        resolve(data);
      }
    });
  });
};

appendData = async (checkedOrResults, data) => {
  let pathToFile = selectFile(checkedOrResults);
  return new Promise((resolve, reject) => {
    fs.writeFile(pathToFile, data, "utf-8", err => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log("Success", data);
        resolve("data saved");
      }
    });
  });
};

addDataToFile = async (checkedOrresults, newData) => {
  return new Promise((resolve, reject) => {
    if (!newData) {
      reject("No data provided");
    }
    readFile(checkedOrresults)
      .then(existingData => {
        if (existingData.length != 0) {
          existingData = JSON.parse(existingData);
        } else {
          existingData = [];
        }
        if (Array.isArray(existingData)) {
          existingData.push(newData);
        } else {
          let arr = [];
          arr.push(newData);
        }
        appendData(checkedOrresults, JSON.stringify(existingData))
          .then(success => {
            resolve(success);
          })
          .catch(e => reject(e));
      })
      .catch(e => reject(e));
  });
};

module.exports = { addDataToFile, readFile, appendData };
