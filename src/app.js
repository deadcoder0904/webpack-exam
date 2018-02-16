import { map } from "lodash-es";

import "./styles.scss"; // to check SASS works

import { sum } from "./math";

console.log("In app.js 💩");

class A {
  constructor() {
    console.log("Constructor calling 💦");
  }
}

new A(); // to check if ES modules work

console.log("Running lodash 🙈");
map([1, 2, 3], n => {
  console.log(n);
});

console.log(`2 + 5 = ${sum(2, 5)}`);
