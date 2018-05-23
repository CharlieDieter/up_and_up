import axios from "axios";

// TODO: get past five weekdays from moment

export const getTopFive = async batch => {
  var symbols = [];
  return await axios
    .get(`https://api.iextrading.com/1.0/stock/market/list/${batch}`)
    .then(({ data }) => {
      data.forEach((d, i) => {
        if (i > 4) return;
        symbols.push(d.symbol);
      });
    })
    .then(() => fetchMany(symbols));
};

const fetchMany = async (symbols = ["AAPL", "C", "GE", "GOOG", "MSFT"]) => {
  const result = {};
  await asyncForEach(symbols, async symbol => {
    result[symbol] = [];
    await axios
      .get(`https://api.iextrading.com/1.0/stock/${symbol}/chart/1m`)
      .then(({ data }) => result[symbol].push(data.reverse().slice(0, 5)));
  });
  return result;
};

export const fetchOne = async (symbol, range) => {
  const result = [];
  await axios
    .get(
      `https://api.iextrading.com/1.0/stock/${symbol}/batch?types=quote,chart&range=${range}`
    )
    .then(({ data }) => result.push(data));
  return result;
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
