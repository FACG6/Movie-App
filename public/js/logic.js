function fetch({ method, url, query, callback }) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      callback(response);
    }
  };
  xhr.open(method, url + query);
  xhr.send();
}

if (typeof module !== "undefined") {
  module.exports = { fetch };
}
