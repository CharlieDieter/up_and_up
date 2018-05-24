import axios from "axios";

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
export const getTopFiveSymbols = async batch => {
  var symbols = [];
  return await axios
    .get(`https://api.iextrading.com/1.0/stock/market/list/${batch}`)
    .then(({ data }) => {
      data.forEach((d, i) => {
        if (i > 4) return;
        symbols.push(d.symbol);
      });
    })
    .then(() => symbols);
};

export const fetchDetails = async symbols => {
  const result = {};
  await asyncForEach(symbols, async symbol => {
    result[symbol] = [];
    await axios
      .get(
        `https://api.iextrading.com/1.0/stock/${symbol}/batch?types=quote,news&last=3`
      )
      .then(({ data }) => result[symbol].push(data));
  });
  return result;
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
      `https://api.iextrading.com/1.0/stock/${symbol}/batch?types=quote,chart,news&range=${range}&last=5`
    )
    .then(({ data }) => result.push(data));
  return result;
};

const asyncForEach = async (array, callback) => {
  for (let i = 0; i < array.length; i++) {
    await callback(array[i]);
  }
};
