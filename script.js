document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.endsWith('about.html')) {
        console.log("about.html detected, initializing maps...");

        // 青岛地图
        const qingdaoMap = L.map('qingdao-map').setView([36.0671, 120.3826], 12);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(qingdaoMap);

        const qingdaoMarkers = [
            { latlng: [36.07224, 120.41488], popup: '我的幼儿园: 临近青岛大学' },
            { latlng: [36.07104, 120.40755], popup: '我的小学：青岛新世纪学校' },
            { latlng: [36.07312, 120.34485], popup: '我的初中：青岛超银中学' },
            { latlng: [36.11358, 120.48313], popup: '我的高中：青岛二中' }
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
            { latlng: [48.68453, 9.01200], popup: '伯布林根 - 我的居住及工作地' },
            { latlng: [49.01263, 8.41572], popup: '卡尔斯鲁厄 - 我的母校：卡尔斯鲁厄理工学院' },
            { latlng: [49.56334, 10.88694], popup: '黑措根奥拉赫 - Schaeffler AG 总部，我的实习公司' },
            { latlng: [50.37716, 7.60306], popup: '科布伦茨 - Stabilus SE 总部，我的实习公司' },
            { latlng: [52.32205, 9.81258], popup: '汉诺威 - 汉诺威展览所在地' },
            { latlng: [51.25924, 6.74316], popup: '杜塞尔多夫 - 杜塞尔多夫冶金展所在地' }
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
