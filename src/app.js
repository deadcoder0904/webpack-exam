import "./styles.scss"; // to check SASS works

import _ from "lodash";

console.log("In app.js 💩");

class A {
  constructor() {
    console.log("Constructor calling 💦");
  }
}

new A(); // to check if ES modules work

console.log("Running lodash 🙈");
_.map([1, 2, 3], n => {
  console.log(n);
});
