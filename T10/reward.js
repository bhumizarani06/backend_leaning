function calculateReward(total) {
    if (total < 0) {
        throw new Error("Total cannot be negative");
    }

    if (total >= 1000) {
        return 100;
    }

    if (total >= 500) {
        return 50;
    }

    return 0;
}

export { calculateReward };