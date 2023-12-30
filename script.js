'use strict';

/////////////////////////////////////////////////
//////////////// BANKIST APP ////////////////////
/////////////////////////////////////////////////

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];
// console.log(accounts);

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// CREATING FUNCTIONS

/*  FUNCTION TO ADD HTML ELEMENTS FOR EACH TRANSACTION   */
const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach(function (value, index) {
    const type = value > 0 ? 'deposit' : 'withdrawal';
    const html =
      `<div class="movements__row">
        <div class="movements__type movements__type--${type}">${index + 1} ${type}</div>
        <div class="movements__value">${value}€</div>
      </div >`
    containerMovements.insertAdjacentHTML('afterbegin', html);
  })
}

/* COMPUTING THE TOTAL BALANCE  */
const calcDisplayBalance = function (movements) {
  const balance = movements.reduce(function (acc, mov) {
    return acc + mov;
  })
  labelBalance.textContent = `${balance}€`;
};

/* COMPUTING A FUNCTION TO DISPLAY INCOME, OUTGOING AND THE INTEREST */

const calcDisplaySummary = function (movements) {

  /* COMPUTING INCOMING TRANSACTIONS */
  const incomes = movements
    .filter((deposit) => deposit > 0)
    .reduce((acc, currDeposit) => acc + currDeposit, 0);
  labelSumIn.textContent = `${incomes}€`

  /* COMPUTING OUTGOING TRANSACTIONS */
  const outcomes = movements
    .filter((deposit) => deposit < 0)
    .reduce((acc, currDeposit) => acc + currDeposit, 0);
  labelSumOut.textContent = `${Math.abs(outcomes)}€`

  /* COMPUTING INTEREST INCURRED FOR EACH DEPOSIT 
  Logic - For every deposit made the bank gives an interest of 1.2% and adds it to the total interest if the interest value is greater than 1€.
  */
  const interests = movements
    .filter((deposit) => deposit > 0)
    .map((filteredDeposits) => filteredDeposits * 1.2 / 100)
    .filter((interestArr) => interestArr > 1)
    .reduce((acc, interest) => acc + interest)
  labelSumInterest.textContent = `${interests}€`
}

/* COMPUTING USERNAMES */
const createUserName = function (accs) {
  accs.forEach(function (acc) {
    acc.userName = acc.owner.toLowerCase().split(' ').map(arr => arr[0]).join('');
  });
};
createUserName(accounts);
// console.log(accounts);


// EVENT LISTENERS
btnLogin.addEventListener('click', function (e) {
  // To prevent Default behaviour of Form button
  e.preventDefault();

  // CHECK IF THE USERNAME AND PIN IS CORRECT
  const userAcc = accounts.find((acc) => inputLoginUsername.value === acc.userName);

  if (userAcc?.pin === Number(inputLoginPin.value)) {

    //DISPLAY UI AND WELCOME MESSAGE 
    labelWelcome.textContent = `Welcome back, ${userAcc.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // COMPUTE THE MOVEMENTS
    displayMovements(userAcc.movements);

    // COMPUTE THE BALANCE
    calcDisplayBalance(userAcc.movements);

    // COMPUTE THE SUMMARY
    calcDisplaySummary(userAcc.movements);

  }

})