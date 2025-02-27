document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.endsWith('about.html')) {
        console.log("about.html detected, initializing maps...");

        // 青岛地图
        const qingdaoMap = L.map('qingdao-map').setView([36.0671, 120.3826], 11.5);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(qingdaoMap);

        const qingdaoMarkers = [
            { latlng: [36.07224, 120.41488],
                popup: `
                    <h4>我的幼儿园:青岛幼儿师范学校附属幼儿园</h4>
                    <img src="images/kindergarten.png" alt="我的幼儿园" style="width: 100%; max-width: 200px; margin-bottom: 10px;">
                    <p>临近青岛大学，与小盆友们分享奥特曼玩偶，是我童年的起点。</p>
                    <a href="http://www.sdzjw.com/m/zs/qdyesf/" target="_blank">访问幼儿园官网</a>
                `
                },

            { latlng: [36.07104, 120.40755],
                popup: `
                    <h4>我的小学:青岛新世纪学校</h4>
                    <img src="images/xinshiji.png" alt="青岛新世纪学校" style="width: 100%; max-width: 200px; margin-bottom: 10px;">
                    <p>2000-2006, 我在这里度过了快乐的小学时光。成绩名列班级前茅，德智体美劳全面发展，曾代表学校参加区级运动会。</p>
                    <a href="http://www.qingdaoxsj.com" target="_blank">访问学校官网</a>
                `
            },

            { latlng: [36.07312, 120.34485],
            popup: `
                    <h4>我的初中：青岛超银中学</h4>
                    <img src="images/chaoyin.png" alt="青岛超银中学" style="width: 100%; max-width: 200px; margin-bottom: 10px;">
                    <p>我在这里经过了三年的锤炼，打下了扎实的学习基础，曾历任班级安全委员，物理课代表等职务，代表班级和学校参加编程竞赛培训以及英语能力竞赛，并且成为班级里唯二考入青岛二中的优秀毕业生。</p>
                    <a href="http://www.qdchaoyinschool.com" target="_blank">访问学校官网</a>
                `
            },

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
