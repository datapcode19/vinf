// Pure educational calculations. No tax rates, lender rates or offers are implied.
function amount(value, name, max = 1e12) {
  if (!Number.isFinite(value) || value < 0 || value > max) {
    throw new RangeError(`${name} không hợp lệ.`);
  }
  return value;
}

export function onRoadCost({
  price,
  registrationRate,
  plate,
  inspection,
  road,
  insurance,
  other,
}) {
  [price, plate, inspection, road, insurance, other].forEach((value) =>
    amount(value, 'Số tiền'),
  );
  amount(registrationRate, 'Tỷ lệ trước bạ', 100);
  const registration = (price * registrationRate) / 100;
  return {
    registration,
    total: price + registration + plate + inspection + road + insurance + other,
  };
}

export function loanSchedule({
  price,
  downPayment,
  annualRate,
  months,
  method = 'annuity',
}) {
  amount(price, 'Giá xe');
  amount(downPayment, 'Trả trước');
  amount(annualRate, 'Lãi suất', 100);
  if (downPayment > price)
    throw new RangeError('Trả trước không được vượt quá giá xe.');
  if (!Number.isInteger(months) || months < 1 || months > 120)
    throw new RangeError('Thời hạn phải là số nguyên từ 1 đến 120 tháng.');
  if (!['annuity', 'principal'].includes(method))
    throw new RangeError('Phương pháp tính không hợp lệ.');
  const principal = price - downPayment;
  const rate = annualRate / 1200;
  const payment = rate
    ? (principal * rate) / -Math.expm1(-months * Math.log1p(rate))
    : principal / months;
  const schedule = [];
  let balance = principal;
  for (let month = 1; month <= months; month++) {
    const opening = balance;
    const interest = opening * rate;
    const paidPrincipal =
      month === months
        ? opening
        : Math.min(
            opening,
            method === 'principal' ? principal / months : payment - interest,
          );
    balance = Math.max(0, opening - paidPrincipal);
    schedule.push({
      month,
      opening,
      principal: paidPrincipal,
      interest,
      payment: paidPrincipal + interest,
      balance,
    });
  }
  const totalInterest = schedule.reduce((sum, row) => sum + row.interest, 0);
  return {
    principal,
    totalInterest,
    total: principal + totalInterest,
    schedule,
  };
}

export function operatingCost({
  monthlyKm,
  years,
  kwhPer100,
  electricityPrice,
  litresPer100,
  petrolPrice,
  electricMaintenance,
  petrolMaintenance,
}) {
  Object.values({
    monthlyKm,
    years,
    kwhPer100,
    electricityPrice,
    litresPer100,
    petrolPrice,
    electricMaintenance,
    petrolMaintenance,
  }).forEach((value) => amount(value, 'Giả định'));
  const distance = monthlyKm * 12 * years;
  const electricEnergy = (distance / 100) * kwhPer100 * electricityPrice;
  const petrolEnergy = (distance / 100) * litresPer100 * petrolPrice;
  const electricTotal = electricEnergy + electricMaintenance * years;
  const petrolTotal = petrolEnergy + petrolMaintenance * years;
  return {
    distance,
    electricEnergy,
    petrolEnergy,
    electricTotal,
    petrolTotal,
    difference: petrolTotal - electricTotal,
  };
}
