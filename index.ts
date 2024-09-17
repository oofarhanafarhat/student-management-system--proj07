import inquirer from "inquirer";

const studentID = Math.floor(10000 + Math.random() * 90000);
let mybalance: number = 0;

let answer = await inquirer.prompt([
  {
    name: "student",
    type: "input",
    message: "Enter student  name",
    validate: function (value) {
      if (value.trim() !== "") {
        return true;
      }
      return "please enter a non empty value .";
    },
  },
  {
    name: "courses",
    type: "list",
    message: "select your course to enrolled",
    choices: [
      "MS.office",
      "web development basic",
      "web development advance",
      "web designing",
    ],
  },
]);
const tutionfees: { [keys: string]: number } = {
  "MS.office": 3000,
  "web development basic": 10000,
  "web development advance": 15000,
  "web designing": 15000,
};
console.log(`\ntutionfees: ${tutionfees[answer.courses]}\-\n`);
console.log(`\n balance: ${mybalance}\-\n`);

let paymentmethod = await inquirer.prompt([
  {
    name: "payment",
    type: "list",
    message: "slect payment method",
    choices: ["bank transfer", "Easypaisa", "jazz cash"],
  },
  {
    name: "amount",
    type: "input",
    message: "Transfer Money",
    validate: function (value) {
      if (value.trim() !== "") {
        return true;
      }
      return "please enter a non empty value .";
    },
  },
]);
console.log(`\nyou select payment method ${paymentmethod.payment}`);

const tutionfee = tutionfees[answer.courses];
const paymentAmount = parseFloat(paymentmethod.amount);
if (tutionfee === paymentAmount) {
  console.log(
    `congratulations,you have successfully enrolled in ${answer.courses}.\n`
  );

  let ans = await inquirer.prompt([
    {
      name: "select",
      type: "list",
      message: "what would you like to do next?",
      choices: ["veiw status", "Exit"],
    },
  ]);

  if (ans.select === "veiw status") {
    console.log("\n************status*************\n");
    console.log(`\nstudent Name ${answer.student}\n`);
    console.log(`\nsutdent ID ${studentID}\n`);
    console.log(`\n course : ${answer.courses}\n`);
    console.log(`\nTution fee paid ${paymentAmount}\n`);
    console.log(`\n balance: ${(mybalance += paymentAmount)}`);
  } else {
    console.log("\n Exiting student management system\n");
  }
} else if (paymentAmount > tutionfee) {
  const remainingBalance = paymentAmount - tutionfee;
  console.log(
    `You have paid extra ${remainingBalance}. Your new balance is ${
      mybalance + remainingBalance
    }.`
  );
  // Update the balance
  mybalance += paymentAmount;
} else {
  console.log("invalid amount due to course\n");
}
