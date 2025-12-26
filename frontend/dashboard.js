const reports = [
    {lat: 28.61, lng: 77.23, Severity: "High"},
    {lat: 19.07, lng: 72.87, Severity: "Medium"},
    {lat: 13.08, lng: 80.27, Severity: "Low"}
];

const dashboardMap = L.map("dashboardMap").setView([20.5937, 78.9629], 5);

L.titleLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap"
}).addTo(dashboardMap);

let markers = [];

function renderMarkers(filter) {
    markers.forEach(m => dashboardMap.removeLayer(m));
    markers = [];

    reports.forEach(r => {
        if (filter !== "All" && r.severity !== filter) return;

        let color =
            r.severity === "High" ? "red" :
            r.severity === "Medium" ? "orange" : "green";

        const marker = L.circleMarker([r.lat, r.lng], {
            radius: 8,
            color: color,
            fillColor: color,
            fillOpacity: 0.8
        }).addTo(dashboardMap);

        markers.push(marker);
    });
}

renderMarkers("All");

document.getElementById("severityFilter").addEventListener("change", e=> {
    renderMarkers(e.target.value);
});