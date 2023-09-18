export const payData = [
  {
    id: 7,
    payedAt: "2023-07-16T17:06:22.000Z",
    payAmount: 35.6,
  },
  {
    id: 8,
    payedAt: "2023-08-16T17:06:32.000Z",
    payAmount: 5.6,
  },
  {
    id: 9,
    payedAt: "2023-08-16T17:06:32.000Z",
    payAmount: 15.43,
  },
  {
    id: 10,
    payedAt: "2023-09-16T17:06:41.000Z",
    payAmount: 35.65,
  },
  {
    id: 11,
    payedAt: "2023-09-16T17:06:41.000Z",
    payAmount: 20.6,
  },
];

export function getBarData(originalArray) {
  const resultArray = [];
  const yearMonthMap = new Map();

  originalArray.forEach((item) => {
    const date = new Date(item.payedAt);
    const year = date.getFullYear();
    const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
      date
    );
    const yearMonth = `${month} ${year}`;

    if (yearMonthMap.has(yearMonth)) {
      yearMonthMap.get(yearMonth).totalAmount += item.payAmount;
    } else {
      yearMonthMap.set(yearMonth, {
        yearMonth,
        totalAmount: item.payAmount,
      });
    }
  });

  resultArray.push(...yearMonthMap.values());

  return resultArray;
}

export function getListData(originalArray) {
  const resultArray = [];

  originalArray.forEach((item) => {
    const date = new Date(item.payedAt);
    const year = date.getFullYear();
    const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
      date
    );
    const yearMonth = `${month} ${year}`;

    resultArray.push({...item, payedAt: yearMonth});
  });

  return resultArray.reverse();
}
