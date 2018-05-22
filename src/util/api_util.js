import axios from "axios";

// TODO: have fetchMany use symbols from '/stock/market/list/mostactive'
// TODO: get past five weekdays from moment

export const fetchMany = async (
  symbols = ["ABEV", "LHO", "ITUB", "CZR", "CX"],
  days = ["20180510", "20180509", "20180509", "20180509", "20180509"]
) => {
  const result = {};
  await asyncForEach(symbols, async symbol => {
    result[symbol] = [];

    await asyncForEach(days, async day => {
      await axios
        .get(`https://api.iextrading.com/1.0/stock/${symbol}/chart/date/${day}`)
        .then(({ data }) => result[symbol].push(data));
    });
  });
  return result;
};

export const fetchOne = symbol => {
  axios
    .get(
      `https://api.iextrading.com/1.0/stock/${symbol}/batch?types=quote,news,chart&range=1m&last=10`
    )
    .then(({ data }) => console.log(data));
};

// const getWeekdayStrings = (date, num) => {
//   const result = [];
//
//   while (num > 0) {
//     if (date.inoWeekday() < 6) {
//       result.push(date);
//       num--;
//     }
//     date = date.subtract(1, "days");
//   }
//   return result;
// };

const asyncForEach = async (array, callback) => {
  for (let i = 0; i < array.length; i++) {
    await callback(array[i]);
  }
};

// export const getTopFive = async () => {
//   var symbols = [];
//   await axios
//     .get(`https://api.iextrading.com/1.0/stock/market/list/mostactive`)
//     .then(({ data }) => {
//       data.forEach((d, i) => {
//         if (i > 4) return;
//         symbols.push(d.symbol);
//       });
//     })
//     .then(() => fetchMany(symbols));
// };
