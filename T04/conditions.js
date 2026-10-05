function calculateReward(spendingCents) {
    if (spendingCents >= 100000) {
        return 35;
    } else if (spendingCents >= 50000) {
        return 25;
    } else if (spendingCents >= 25000) {
        return 10;
    } else {
        return 0;
    }
}

console.log("Individual tests:");

console.log(calculateReward(20000));
console.log(calculateReward(25000));
console.log(calculateReward(50000));
console.log(calculateReward(100000));

console.log("\nCustomer rewards:");

const customerSpending = [
    15000,
    25000,
    32000,
    50000,
    75000,
    100000,
    150000
];

for (const spending of customerSpending) {
    const reward = calculateReward(spending);

    console.log(
        `Spending: ${spending} cents → Reward: $${reward}`
    );
}