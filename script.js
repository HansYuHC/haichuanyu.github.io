document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.endsWith('about.html')) {
        console.log("about.html detected, initializing maps...");

        // 青岛地图
        const qingdaoMap = L.map('qingdao-map').setView([36.0771, 120.3826], 11.5);
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
                    <a href="http://www.qingdaoxsj.com" target="_blank">访问新世纪官网</a>
                `
            },

            { latlng: [36.07312, 120.34485],
            popup: `
                    <h4>我的初中：青岛超银中学</h4>
                    <img src="images/chaoyin.png" alt="青岛超银中学" style="width: 100%; max-width: 200px; margin-bottom: 10px;">
                    <p>我在这里经过了三年的锤炼，打下了扎实的学习基础，曾历任班级安全委员，物理课代表等职务，代表班级和学校参加编程竞赛培训以及英语能力竞赛，并且成为班级里唯二考入青岛二中的优秀毕业生。</p>
                    <a href="http://www.qdchaoyinschool.com" target="_blank">访问超银官网</a>
                `
            },

            { latlng: [36.11358, 120.48313],
            popup: `
                    <h4>我的高中：青岛二中</h4>
                    <img src="images/erzhong.png" alt="青岛二中" style="width: 100%; max-width: 200px; margin-bottom: 10px;">
                    <p>慈龟山下，静思湖畔，留下了热血少年青葱的岁月，我在这里度过了紧张而又充实的高中生活，以高考646的成绩考入理想的大学。</p>
                    <a href="http://www.qderzhong.net" target="_blank">访问二中官网</a>
                `
            }
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
            { latlng: [48.68453, 9.01200],
            popup: `
                    <h4>伯布林根</h4>
                    <img src="images/boeblingen.png" alt="伯布林根" style="width: 100%; max-width: 200px; margin-bottom: 10px;">
                    <p>我目前居住在伯布林根，市区街道蜿蜒起伏，是一个别有韵味的小城。城市北边的辛德芬根坐落着梅赛德斯奔驰最大的工厂。</p>
                    <a href="https://www.boeblingen.de" target="_blank">访问伯布林根市官网</a>
                `
            },
            { latlng: [49.01263, 8.41572],
            popup: `
                    <h4>卡尔斯鲁厄</h4>
                    <img src="images/karlsruhe.png" alt="卡尔斯鲁厄理工学院" style="width: 100%; max-width: 200px; margin-bottom: 10px;">
                    <p>我在这座城市度过了20到30岁的十年时光，是我的第二故乡。从刚到德国的懵懂无知，入学语言班，学习德语，就读于卡尔斯鲁厄机械制造专业本科及研究生并顺利毕业，考取德国驾照，恋爱结婚生女，这座城市见证了我人生中难忘的十年。</p>
                    <a href="https://www.kit.edu" target="_blank">访问卡尔斯鲁厄理工学院官网</a>
                `
            },
            { latlng: [49.56334, 10.88694],
            popup: `
                    <h4>黑尔措根奥拉赫</h4>
                    <img src="images/schaeffler.png" alt="Schaeffler AG" style="width: 100%; max-width: 200px; margin-bottom: 10px;">
                    <p>这座城市坐落着著名机械制造行业供应商舍弗勒公司，我在这里的转动轴研发部门完成了机械制造专业本科阶段的义务实习。</p>
                    <a href="https://www.schaeffler.com" target="_blank">访问舍弗勒公司官网</a>
                `
            },
            { latlng: [50.37716, 7.60306],
             popup: `
                    <h4>科布伦茨</h4>
                    <img src="images/koblenz.png" alt="koblenz" style="width: 100%; max-width: 200px; margin-bottom: 10px;">
                    <p>林河旁边的这座德国著名的旅游城市，德国之角所在地，是斯泰必鲁斯公司的总部。这是一家生产空气弹簧及阻尼器等的制造企业。我在这里的创新研发部门完成了机械制造研究生阶段的自由实习。</p>
                    <a href="https://www.koblenz.de" target="_blank">访问科布伦茨城市官网</a>
                `
             },
            { latlng: [52.32205, 9.81258],
            popup: `
                    <h4>汉诺威</h4>
                    <img src="images/hannover.png" alt="汉诺威" style="width: 100%; max-width: 200px; margin-bottom: 10px;">
                    <p>汉诺威展览是德国最大的工业展览，在课余时间我有幸代表国内企业参展，收获颇丰。</p>
                    <a href="https://www.hannovermesse.de" target="_blank">访问汉诺威展览官网</a>
                `
            },
            { latlng: [51.25924, 6.74316],
             popup: `
                    <h4>杜塞尔多夫</h4>
                    <img src="images/duesseldorf.png" alt="杜塞尔多夫" style="width: 100%; max-width: 200px; margin-bottom: 10px;">
                    <p>杜塞尔多夫冶金展是欧洲最大的冶金展览。2019年我有幸参展的同时，也领略这座国际化大都市的风采。</p>
                    <a href="https://www.messe-duesseldorf.de" target="_blank">访问杜塞尔多夫冶金展官网</a>
                `
             }
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
    else if (window.location.pathname.endsWith('academic.html')) {
    // 青岛二中 Swiper 实例
        var qdezSwiper = new Swiper('.qdez-swiper', {
            direction: 'horizontal',
            loop: true,
            pagination: {
                el: '.qdez-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.qdez-next',
                prevEl: '.qdez-prev',
            },
        });

        // 华南理工大学 Swiper 实例
        var scutSwiper = new Swiper('.scut-swiper', {
            direction: 'horizontal',
            loop: true,
            pagination: {
                el: '.scut-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.scut-next',
                prevEl: '.scut-prev',
            },
        });

        // 卡尔斯鲁厄理工学院 Swiper 实例
        var scutSwiper = new Swiper('.kit-swiper', {
            direction: 'horizontal',
            loop: true,
            pagination: {
                el: '.kit-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.kit-next',
                prevEl: '.kit-prev',
            },
        });
    }
});


//时间轴测试
document.addEventListener('DOMContentLoaded', function () {
    const points = document.querySelectorAll('.timeline-point');
    const events = document.querySelectorAll('.timeline-event');
    const fixedDistance = 10; // 连接线顶部与图片底部的固定距离（可以根据需要调整）

    // 初始化时间点位置
    function updateTimeline() {
        // 获取所有图片的高度
        const imageHeights = Array.from(events).map(event => {
            const image = event.querySelector('.event-image');
            return image.getBoundingClientRect().height;
        });
        const maxHeight = Math.max(...imageHeights); // 获取最大高度

        points.forEach((point, index) => {
            const event = events[index];
            const eventRect = event.getBoundingClientRect();
            const containerRect = event.parentElement.getBoundingClientRect();
            const image = event.querySelector('.event-image'); // 获取图片元素
            const imageRect = image.getBoundingClientRect(); // 获取图片的尺寸

            // 设置时间点的水平位置
            const left = eventRect.left - containerRect.left + eventRect.width / 2;
            point.style.left = `${left}px`;

            // 设置连接线的高度
            const connector = point.querySelector('.timeline-connector');
            const connectorHeight = maxHeight - imageRect.height + 120; // 动态调整高度
            // const connectorHeight = +imageRect.bottom - eventRect.top + fixedDistance; // 连接线高度 = 图片底部到事件顶部的距离 + 固定距离
            console.log(`Event ${index + 1}: Connector Height = ${connectorHeight}px`); // 调试输出
            connector.style.height = `${connectorHeight}px`;

        });
    }

    // 初始化
    updateTimeline();

    // 监听窗口大小变化
    window.addEventListener('resize', updateTimeline);
});


// JavaScript 实现展开/收起功能
document.addEventListener('DOMContentLoaded', function () {
    const companyHeaders = document.querySelectorAll('.company-header');

    companyHeaders.forEach(header => {
        header.addEventListener('click', function () {
            const content = this.nextElementSibling;
            const arrow = this.querySelector('.arrow');

            // 切换内容区域的显示状态
            content.classList.toggle('expanded');
            arrow.textContent = content.classList.contains('expanded') ? '▼' : '▶';
        });
    });
});