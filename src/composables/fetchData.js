const fetchData = (endpoint) =>
  fetch(
    `https://api.npoint.io/828754c1ba6409cb0b38${
      endpoint ? "/" + endpoint : ""
    }`
  )
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.error(error.message));

export default fetchData;
