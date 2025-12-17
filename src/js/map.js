const os_map = () => {
    if(!document.getElementById('os_map')) return;
    var map = L.map('os_map',{center:[52.03123198804678, -1.0173803163399273], zoom:18, scrollWheelZoom: false});
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            minZoom: 0,
            maxZoom: 18,
        }).addTo(map);
}

export {os_map};