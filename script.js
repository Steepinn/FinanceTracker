let goal = {
    name: '',
    amount: 0,
    currentAmount: 0
};

let transactions = [];
let totalAmount = 0;

const goalNameInput = document.getElementById('goal-name');
const goalAmountInput = document.getElementById('goal-amount');
const createGoalBtn = document.getElementById('create-goal-btn');
const goalDisplay = document.getElementById('goal-display');
const goalTitle = document.getElementById('goal-title');
const goalAmountDisplay = document.getElementById('goal-amount-display');
const goalProgress = document.getElementById('goal-progress');
const editGoalBtn = document.getElementById('edit-goal-btn');
const saveGoalBtn = document.getElementById('save-goal-btn');
const transactionAmountInput = document.getElementById('transaction-amount');
const addIncomeBtn = document.getElementById('add-income-btn');
const subtractExpenseBtn = document.getElementById('subtract-expense-btn');
const transactionHistory = document.getElementById('transaction-history');
const totalAmountDisplay = document.getElementById('total-amount');

// Обработчики событий

// Создание цели
createGoalBtn.addEventListener('click', function() {
    const goalName = goalNameInput.value;
    const goalAmount = parseFloat(goalAmountInput.value);

    if (goalName && !isNaN(goalAmount)) {
        goal.name = goalName;
        goal.amount = goalAmount;
        goal.currentAmount = 0;
        
        goalNameInput.value = '';
        goalAmountInput.value = '';

        goalTitle.textContent = goal.name;
        goalAmountDisplay.textContent = `Цель: ${goal.amount} $`; // Поменяли ₽ на $
        goalProgress.value = 0;
        
        goalDisplay.style.display = 'block';
        createGoalBtn.style.display = 'none';
        editGoalBtn.style.display = 'inline-block';
    }
});

// Редактирование цели
editGoalBtn.addEventListener('click', function() {
    goalNameInput.value = goal.name;
    goalAmountInput.value = goal.amount;
    goalDisplay.style.display = 'none';
    createGoalBtn.style.display = 'inline-block';
    editGoalBtn.style.display = 'none';
    saveGoalBtn.style.display = 'inline-block';
});

// Сохранение изменений
saveGoalBtn.addEventListener('click', function() {
    const updatedGoalName = goalNameInput.value;
    const updatedGoalAmount = parseFloat(goalAmountInput.value);
    
    if (updatedGoalName && !isNaN(updatedGoalAmount)) {
        goal.name = updatedGoalName;
        goal.amount = updatedGoalAmount;
        
        goalTitle.textContent = goal.name;
        goalAmountDisplay.textContent = `Цель: ${goal.amount} $`; // Поменяли ₽ на $
    }
    
    goalNameInput.value = '';
    goalAmountInput.value = '';
    goalDisplay.style.display = 'block';
    createGoalBtn.style.display = 'none';
    saveGoalBtn.style.display = 'none';
    editGoalBtn.style.display = 'inline-block';
});

// Добавление дохода
addIncomeBtn.addEventListener('click', function() {
    const amount = parseFloat(transactionAmountInput.value);
    if (!isNaN(amount)) {
        goal.currentAmount += amount;
        totalAmount += amount;

        const transaction = {
            type: 'Зачисление',
            amount: amount
        };
        transactions.push(transaction);

        updateTransactionHistory();
        updateTotalAmount();
        updateGoalProgress();
        
        transactionAmountInput.value = '';
    }
});

// Добавление расхода
subtractExpenseBtn.addEventListener('click', function() {
    const amount = parseFloat(transactionAmountInput.value);
    if (!isNaN(amount)) {
        goal.currentAmount -= amount;
        totalAmount -= amount;

        const transaction = {
            type: 'Вычисление',
            amount: amount
        };
        transactions.push(transaction);

        updateTransactionHistory();
        updateTotalAmount();
        updateGoalProgress();
        
        transactionAmountInput.value = '';
    }
});

// Обновление истории транзакций
function updateTransactionHistory() {
    transactionHistory.innerHTML = '';
    transactions.forEach(function(transaction) {
        const li = document.createElement('li');
        li.textContent = `${transaction.type}: ${transaction.amount} $`; // Поменяли ₽ на $
        transactionHistory.appendChild(li);
    });
}

// Обновление итоговой суммы
function updateTotalAmount() {
    totalAmountDisplay.textContent = `${totalAmount} $`; // Поменяли ₽ на $
}

// Обновление прогресса цели
function updateGoalProgress() {
    const progress = (goal.currentAmount / goal.amount) * 100;
    goalProgress.value = progress;
}