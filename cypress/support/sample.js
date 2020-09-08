import "./styles.css";
function animateLeft() {
  app.style.left = parseInt(app.style.left) + 1 + "px";
  setTimeout(animateLeft, 20);
}
function animateRight() {
  app.style.left = "0px";
  setTimeout(animateRight, 3000);
}

var app = document.getElementById("app");
app.style.left = "0px";
animateLeft();
animateRight();

//HTML5 Web Workers
function myworker() {
  this.addEventListener(
    "message",
    function(e) {
      setInterval(function() {
        fetch(e.data, function(xhr) {
          var result = xhr.responseText;

          var object = JSON.parse(result);

          setTimeout(function() {
            sendback();
          }, 2000);

          function sendback() {
            this.postMessage(JSON.stringify(object));
          }
        });
      }, 500);
    },
    false
  );

  //simple XHR request in pure raw JavaScript
  function fetch(url, callback) {
    var xhr;

    //console.log(url);

    if (typeof XMLHttpRequest !== "undefined") xhr = new XMLHttpRequest();
    else {
      var versions = [
        "MSXML2.XmlHttp.5.0",
        "MSXML2.XmlHttp.4.0",
        "MSXML2.XmlHttp.3.0",
        "MSXML2.XmlHttp.2.0",
        "Microsoft.XmlHttp"
      ];

      for (var i = 0, len = versions.length; i < len; i++) {
        try {
          xhr = new ActiveXObject(versions[i]);
          break;
        } catch (e) {}
      } // end for
    }

    xhr.onreadystatechange = ensureReadiness;

    function ensureReadiness() {
      if (xhr.readyState < 4) {
        return;
      }

      if (xhr.status !== 200) {
        return;
      }

      // all is well
      if (xhr.readyState === 4) {
        callback(xhr);
      }
    }

    xhr.open("GET", url, true);
    xhr.send("");
  }
}

var code = myworker.toString();
code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"));

var blob = new Blob([code], { type: "application/javascript" });
var worker = new Worker(URL.createObjectURL(blob));

worker.addEventListener(
  "message",
  function(e) {
    document.getElementById("result").innerHTML =
      document.getElementById("result").innerHTML + e.data;
  },
  false
);

worker.postMessage("https://reqres.in/api/users?page=2");
