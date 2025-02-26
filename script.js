document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.endsWith('about.html')) {
        console.log("about.html detected, initializing maps...");

        // 青岛地图
        const qingdaoMap = L.map('qingdao-map').setView([36.0671, 120.3826], 12);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(qingdaoMap);

        const qingdaoMarkers = [
            { latlng: [36.0671, 120.3826], popup: '青岛市中心' },
            { latlng: [36.0900, 120.3800], popup: '我的小学：XXX小学' },
            { latlng: [36.0800, 120.3700], popup: '我的初中：XXX中学' },
            { latlng: [36.0700, 120.3600], popup: '我的高中：XXX高中' }
        ];

        qingdaoMarkers.forEach(marker => {
            L.marker(marker.latlng)
                .addTo(qingdaoMap)
                .bindPopup(marker.popup);
        });

        console.log("Qingdao map initialized.");

        // 德国地图
        const germanyMap = L.map('germany-map').setView([51.1657, 10.4515], 6);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(germanyMap);

        const germanyMarkers = [
            { latlng: [48.7904, 9.0857], popup: '伯布林根 - 我的居住地' },
            { latlng: [49.0069, 8.4037], popup: '卡尔斯鲁厄 - 我的母校：卡尔斯鲁厄理工学院' },
            { latlng: [48.1351, 11.5820], popup: '慕尼黑 - 旅游胜地' },
            { latlng: [52.5200, 13.4050], popup: '柏林 - 德国首都' }
        ];

        germanyMarkers.forEach(marker => {
            L.marker(marker.latlng)
                .addTo(germanyMap)
                .bindPopup(marker.popup);
        });

        console.log("Germany map initialized.");

        // 监听窗口大小变化，防止地图显示不完整
        window.addEventListener("resize", function () {
            qingdaoMap.invalidateSize();
            germanyMap.invalidateSize();
        });

        console.log("Resize listener added.");
    }
});
