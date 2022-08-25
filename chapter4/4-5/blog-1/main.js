
// fetch data from the server
const getList = () => {
  return new Promise((resolve, reject) => {

    var ajax = new XMLHttpRequest();
    ajax.open('get', 'http://192.168.1.104:8000');
    ajax.send();
    ajax.onreadystatechange = function () {
      if (ajax.readyState == 4 && ajax.status == 200) {
        resolve(JSON.parse(ajax.responseText))
      }
    }
  })
}

console.log(getList());

// get `container` element
const container = document.getElementById('container')


// The rendering logic should be written here.