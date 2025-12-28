const imageInput = document.getElementById("imageInput");
const preview = document.getElementById("preview");
const submitBtn = document.getElementById("submitBtn");
const resultDiv = document.getElementById("result");

//Image preview
imageInput.addEventListener("change", () => {
    const file =  imageInput.files[0]
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
        preview.src = reader.result;
        preview.style.display = "block";
    };
    reader.readAsDataURL(file);
});


//Intialize map
const leafletMap = L.map("map", {
    center: [20.5937, 78.9629],
    zoom: 5
});

setTimeout(() => {
    leafletMap.invaildateSize();
}, 500);
L.tileLayer("https://{s}.title.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap"
}).addTo(leafletMap);

let marker;
leafletMap.on("click", function (e) {
    if (marker) leafletMap.removeLayer(marker);
    marker = L.marker(e.latlng).addTo(leafletMap);
});


//Mock AI analysis
submitBtn.addEventListener("click", () => {
    resultDiv.innerHTML = `
    Waste Type: <span style="color:red">Mixed Waste</span><br/>
    Severity: <span style="color:red">High</span>
    `;
});