// 取得當前日期時間的函數
function getCurrentDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`; // 回傳格式化後的日期字串
}

function client(endpoint, { body, ...customConfig } = {}) {
  const headers = { "Content-Type": "application/json" };
  const config = {
    method: body ? "POST" : "GET",
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };
  if (body) {
    config.body = JSON.stringify(body);
  }

  return window.fetch(`${endpoint}`, config).then(async (response) => {
    if (response.ok) {
      return await response.json();
    } else {
      const errorMessage = await response.text();
      return Promise.reject(new Error(errorMessage));
    }
  });
}

// 找出子筆記本中最新的日期
const findMaxDateString = (subNotebooks) => {
  const notebookTimeArray = subNotebooks.map(
    (subnotebook) => subnotebook.subEnd
  );
  return notebookTimeArray.reduce(
    (max, dateString) => (dateString > max ? dateString : max),
    ""
  );
};

// 找出子筆記本中最舊的日期
const findMinDateString = (subNotebooks) => {
  const notebookTimeArray = subNotebooks.map(
    (subnotebook) => subnotebook.subStart
  );
  return notebookTimeArray.reduce(
    (min, dateString) => (!min || dateString < min ? dateString : min),
    null
  );
};

export { getCurrentDateTime, client, findMaxDateString, findMinDateString };
