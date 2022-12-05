const events = require('events');
const fs = require('fs');
const readline = require('readline');

(async function processLineByLine() {
  try {
    const rl = readline.createInterface({
      input: fs.createReadStream(`input.txt`),
      // input: fs.createReadStream(`/test_input.txt`),
      crlfDelay: Infinity,
    });

    let lines = [];
    rl.on('line', (line) => lines.push(line));

    await events.once(rl, 'close').then(() => {
      // collect the lines into groups of 3
      let groupsOf3Lines = [];
      let curGroup = [];
      for (i in lines) {
        let line = lines[i];
        curGroup.push(line);
        if (i % 3 === 2) {
          groupsOf3Lines.push(curGroup);
          curGroup = [];
        }
      }
      // for every group
      let sharedChars = [];
      for (i in groupsOf3Lines) {
        let group = groupsOf3Lines[i];
        for (l in group[0]) {
          let char = group[0][l];
          if (group[1].includes(char) && group[2].includes(char)) {
            sharedChars.push(char);
            break;
          }
        }
      }

      let charValues = [];
      for (index in sharedChars) {
        let sharedChar = sharedChars[index];
        let charValue;
        if (sharedChar >= 'a' && sharedChar <= 'z') {
          charValue = sharedChar.charCodeAt(0) - 'a'.charCodeAt(0);
          charValue += 1;
        }
        if (sharedChar >= 'A' && sharedChar <= 'Z') {
          charValue = sharedChar.charCodeAt(0) - 'A'.charCodeAt(0);
          charValue += 1;
          charValue += 26;
          // console.log(charValue);
        }
        charValues.push(charValue);
      }
      console.log(charValues.reduce((a, b) => a + b, 0));
    });
  } catch (err) {
    console.error(err);
  }
})();
