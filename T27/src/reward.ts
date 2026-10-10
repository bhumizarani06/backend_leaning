
export function monthlyReward(totalCents: number): number {
  if (totalCents >= 100000) {
    return 3500;
  }

  if (totalCents >= 50000) {
    return 2500;
  }

  if (totalCents >= 25000) {
    return 1000;
  }

  return 0;
}
