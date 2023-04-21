
document.addEventListener('DOMContentLoaded', function() {
const form = document.querySelector("#myForm");
const qrCodeContainer = document.querySelector("#qr-code-container");
const shortenedUrlContainer = document.querySelector("#shortened-url");



// Get a reference to the database service
const db = firebase.firestore();

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const inputFields = [
    { id: "#name", param: "name" },
    { id: "#job", param: "job" },
    { id: "#phone", param: "phone" },
    { id: "#email", param: "email" },
    { id: "#social1", param: "social1" },
    { id: "#social2", param: "social2" },
    { id: "#social3", param: "social3" },
    { id: "#social4", param: "social4" },
    { id: "#social1-label", param: "social1Label" },
    { id: "#social2-label", param: "social2Label" },
    { id: "#social3-label", param: "social3Label" },
    { id: "#social4-label", param: "social4Label" },
    ];
          
    let url = "https://digitalbizcard.netlify.app/dynamic?";
    inputFields.forEach((field) => {
    const value = sanitizeInput(document.querySelector(field.id).value);
    if (value !== "" && field.param.startsWith("social")) {
        url += `${field.param}=${encodeURIComponent(value)}&`;
    } else if (value !== "" && !field.param.startsWith("social")) {
        url += `${field.param}=${encodeURIComponent(value)}&`;
    }
    });
    url = url.slice(0, -1);

    const request = new XMLHttpRequest();
    const apiKey = "9nOYxqR30G4pYNDi1tlcNLv5OSOcx5iL6KN9V83qKgxmi1P9ZIsM1kThGdeK";
    const urlToShorten = encodeURIComponent(url);
    const apiUrl = `https://tinyurl.com/api-create.php?url=${urlToShorten}&apikey=${apiKey}`;

    request.open("POST", apiUrl);
    request.onload = function () {
        if (request.status === 200) {
            const shortenedUrl = request.responseText;
            const qrCode = new QRious({
              element: qrCodeContainer,
              size: 256,
              foreground: "black",
              background: "white",
              level: "H",
              padding: null,
            });

            qrCode.value = shortenedUrl;

            // Add long and short URL to Firebase
            db.collection("urls").add({
              longUrl: url,
              shortUrl: shortenedUrl,
              timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
            .then((docRef) => {
              console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
              console.error("Error adding document: ", error);
            });
        }
        else {
        shortenedUrlContainer.innerHTML += "Error: Unable to shorten URL";
        }
        document.querySelector(".stuff").style.display = "flex";
    };
    request.send();

    function sanitizeInput(input) {
        return DOMPurify.sanitize(input);
    }
});


function downloadQRCode() {
    const qrCodeCanvas = document.querySelector("#qr-code-container");
    const dataUrl = qrCodeCanvas.toDataURL();
      
    fetch(dataUrl)
    .then(response => response.blob())
    .then(blob => {
        const link = document.createElement("a");
        link.download = "qrcode.png";
        link.href = URL.createObjectURL(blob);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}
      
const downloadBtn = document.getElementById("downloadBtn");
downloadBtn.addEventListener("click", downloadQRCode);

});