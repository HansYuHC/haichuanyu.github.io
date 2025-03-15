document.addEventListener("DOMContentLoaded", function () {
    // 读取用户保存的语言设置
    let userLanguage = localStorage.getItem('userLanguage');

    // 如果没有保存的语言设置，则使用默认语言（中文）
    if (!userLanguage) {
        userLanguage = 'zh'; // 默认语言
    }

    // 设置当前语言
    currentLanguage = userLanguage;
    document.documentElement.setAttribute("lang", userLanguage);

    // 加载导航栏
    loadNavbar();

    // 加载对应语言的内容
    loadLanguageFile("global").then((globalData) => {
        // 获取当前页面的名称
        const page = window.location.pathname.split('/').pop().replace('.html', '');
        // 例如：about.html -> about

        // 加载当前页面的语言文件
        loadLanguageFile(page).then((pageData) => {
            // 合并全局和页面语言数据
            const combinedData = {
                ...globalData[currentLanguage],
                ...pageData[currentLanguage],
            };

            // 更新页面内容
            updateContent(combinedData);

            // 如果是关于页面，初始化地图
            if (page === 'about') {
                initializeMaps(combinedData);
            }
        }).catch((error) => {
            console.error(`Failed to load language file for page: ${page}`, error);
        });
    }).catch((error) => {
        console.error('Failed to load global language file:', error);
    });


    // 4. 根据页面路径初始化特定内容
    if (window.location.pathname.endsWith('academic.html')) {
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

    // 5. 时间轴初始化
    const points = document.querySelectorAll('.timeline-point');
    const events = document.querySelectorAll('.timeline-event');
    const fixedDistance = 10; // 连接线顶部与图片底部的固定距离（可以根据需要调整）

    function updateTimeline() {
        const imageHeights = Array.from(events).map(event => {
            const image = event.querySelector('.event-image');
            return image.getBoundingClientRect().height;
        });
        const maxHeight = Math.max(...imageHeights); // 获取最大高度

        points.forEach((point, index) => {
            const event = events[index];
            const eventRect = event.getBoundingClientRect();
            const containerRect = event.parentElement.getBoundingClientRect();
            const image = event.querySelector('.event-image');
            const imageRect = image.getBoundingClientRect();

            // 设置时间点的水平位置
            const left = eventRect.left - containerRect.left + eventRect.width / 2;
            point.style.left = `${left}px`;

            // 设置连接线的高度
            const connector = point.querySelector('.timeline-connector');
            const connectorHeight = maxHeight - imageRect.height + 120;
            connector.style.height = `${connectorHeight}px`;
        });
    }

    // 初始化时间轴
    updateTimeline();

    // 监听窗口大小变化
    window.addEventListener('resize', updateTimeline);

    // 6. 展开/收起功能
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

    // 7. 模态框功能
    document.addEventListener("mouseleave", function (event) {
        if (event.clientY < 0) {
            showModal(); // 显示模态框
        }
    });

    window.addEventListener("beforeunload", function (event) {
        // 弹出浏览器默认的确认对话框
        // event.preventDefault();
        // event.returnValue = ""; // 必须设置 returnValue 才能触发对话框
    });
});

//====================================================================
//====================================================================


// 显示模态框
function showModal() {
    const leaveModal = document.getElementById("leaveModal");
    const overlay = document.getElementById("overlay");
    if (leaveModal && overlay) {
        leaveModal.style.display = "block";
        overlay.style.display = "block";
    } else {
        console.error("Modal elements not found!");
    }
}

// 关闭模态框
function closeModal() {
    const leaveModal = document.getElementById("leaveModal");
    const overlay = document.getElementById("overlay");
    if (leaveModal && overlay) {
        leaveModal.style.display = "none";
        overlay.style.display = "none";
    } else {
        console.error("Modal elements not found!");
    }
}

let currentLanguage = "zh"; // 默认语言

// 加载语言文件
function loadLanguageFile(file) {
    return fetch(`lang/${file}.json`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Failed to load language file: ${file}`);
            }
            return response.json();
        })
        .catch((error) => {
            console.error(`Failed to load language file: ${file}`, error);
            return {}; // 返回空对象，避免后续代码报错
        });
}

// 更新页面内容
function updateContent(data) {
    document.querySelectorAll("[data-lang-key]").forEach((element) => {
        const key = element.getAttribute("data-lang-key");
        if (data[key]) {
            // 如果是链接，更新链接的文本内容
            if (element.tagName.toLowerCase() === "a") {
                element.textContent = data[key];
            } else {
                element.innerHTML = data[key]; // 使用 innerHTML 以支持 HTML 实体
            }
        }
    });
}

// 切换语言
function changeLanguage(lang) {
    // 保存用户选择的语言
    localStorage.setItem('userLanguage', lang);

    currentLanguage = lang;
    document.documentElement.setAttribute("lang", lang);

    // 加载全局语言文件
    loadLanguageFile("global").then((globalData) => {
        // 加载当前页面的语言文件
        const page = document.body.getAttribute("data-page"); // 获取当前页面名称
        loadLanguageFile(page).then((pageData) => {
            // 合并全局和页面语言数据
            const combinedData = {
                ...globalData[currentLanguage],
                ...pageData[currentLanguage],
            };
            // 更新页面内容
            updateContent(combinedData);

            // 更新导航栏语言
            updateNavbarLanguage();
        });
    });
}

// 初始化页面语言
changeLanguage(currentLanguage);


function loadNavbar() {
    const navbar = document.getElementById("navbar");
    if (navbar) {
        fetch("navbar.html")
            .then((response) => response.text())
            .then((html) => {
                navbar.innerHTML = html;
                updateNavbarLanguage(); // 加载导航栏后更新语言
            })
            .catch((error) => {
                console.error("Failed to load navbar:", error);
            });
    } else {
        console.error("Navbar element not found!");
    }
}

// 更新导航栏语言
function updateNavbarLanguage() {
    loadLanguageFile("global").then((data) => {
        document.querySelectorAll("#navbar [data-lang-key]").forEach((element) => {
            const key = element.getAttribute("data-lang-key");
            if (data[currentLanguage] && data[currentLanguage][key]) {
                element.textContent = data[currentLanguage][key];
            }
        });
    });
}

// 初始化页面
loadNavbar();
changeLanguage(currentLanguage);

// 初始化地图
function initializeMaps(combinedData) {
    console.log("Initializing maps...");

    // 青岛地图
    const qingdaoMap = L.map('qingdao-map').setView([36.0771, 120.3826], 11.5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(qingdaoMap);

        const qingdaoMarkers = [
        { latlng: [36.07224, 120.41488],
            popup: `
                <h4 data-lang-key="myKita">我的幼儿园:青岛幼儿师范学校附属幼儿园</h4>
                <img src="images/kindergarten.png" alt="我的幼儿园" style="width: 100%; max-width: 200px; margin-bottom: 10px;">
                <p data-lang-key="myKitaDescription">临近青岛大学，与小盆友们分享奥特曼玩偶，是我童年的起点。</p>
                <a href="http://www.sdzjw.com/m/zs/qdyesf/" target="_blank" data-lang-key="visitKita">访问幼儿园官网</a>
            `
            },

        { latlng: [36.07104, 120.40755],
            popup: `
                <h4 data-lang-key="myPrimary">我的小学:青岛新世纪学校</h4>
                <img src="images/xinshiji.png" alt="青岛新世纪学校" style="width: 100%; max-width: 200px; margin-bottom: 10px;">
                <p data-lang-key="myPrimaryDescription">2000-2006, 我在这里度过了快乐的小学时光。成绩名列班级前茅，德智体美劳全面发展，曾代表学校参加区级运动会。</p>
                <a href="http://www.qingdaoxsj.com" target="_blank" data-lang-key="visitPrimary">访问新世纪官网</a>
            `
        },

        { latlng: [36.07312, 120.34485],
        popup: `
                <h4 data-lang-key="myJuniorHigh">我的初中：青岛超银中学</h4>
                <img src="images/chaoyin.png" alt="青岛超银中学" style="width: 100%; max-width: 200px; margin-bottom: 10px;">
                <p data-lang-key="myJuniorHighDescription">我在这里经过了三年的锤炼，打下了扎实的学习基础，曾历任班级安全委员，物理课代表等职务，代表班级和学校参加编程竞赛培训以及英语能力竞赛，并且成为班级里唯二考入青岛二中的优秀毕业生。</p>
                <a href="http://www.qdchaoyinschool.com" target="_blank" data-lang-key="visitJuniorHigh">访问超银官网</a>
            `
        },

        { latlng: [36.11358, 120.48313],
        popup: `
                <h4 data-lang-key="myHighSchool">我的高中：青岛二中</h4>
                <img src="images/erzhong.png" alt="青岛二中" style="width: 100%; max-width: 200px; margin-bottom: 10px;">
                <p data-lang-key="myHighSchoolDescription">慈龟山下，静思湖畔，留下了热血少年青葱的岁月，我在这里度过了紧张而又充实的高中生活，以高考646的成绩考入理想的大学。</p>
                <a href="http://www.qderzhong.net" target="_blank" data-lang-key="visitHighSchool">访问二中官网</a>
            `
        }
    ];


    qingdaoMarkers.forEach(marker => {
        const popupContent = translatePopup(marker.popup, combinedData);
        L.marker(marker.latlng)
            .addTo(qingdaoMap)
            .bindPopup(popupContent);
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
                    <h4 data-lang-key="boeblingenTitle">伯布林根</h4>
                    <img src="images/boeblingen.png" alt="伯布林根" style="width: 100%; max-width: 200px; margin-bottom: 10px;">
                    <p data-lang-key="boeblingenDescription">我目前居住在伯布林根，市区街道蜿蜒起伏，是一个别有韵味的小城。城市北边的辛德芬根坐落着梅赛德斯奔驰最大的工厂。</p>
                    <a href="https://www.boeblingen.de" target="_blank" data-lang-key="visitBoeblingenWebsite">访问伯布林根市官网</a>
                `
            },
            { latlng: [49.01263, 8.41572],
            popup: `
                    <h4 data-lang-key="karlsruheTitle">卡尔斯鲁厄</h4>
                    <img src="images/karlsruhe.png" alt="卡尔斯鲁厄理工学院" style="width: 100%; max-width: 200px; margin-bottom: 10px;">
                    <p data-lang-key="karlsruheDescription">我在这座城市度过了20到30岁的十年时光，是我的第二故乡。从刚到德国的懵懂无知，入学语言班，学习德语，就读于卡尔斯鲁厄机械制造专业本科及研究生并顺利毕业，考取德国驾照，恋爱结婚生女，这座城市见证了我人生中难忘的十年。</p>
                    <a href="https://www.kit.edu" target="_blank" data-lang-key="visitKITWebsite">访问卡尔斯鲁厄理工学院官网</a>
                `
            },
            { latlng: [49.56334, 10.88694],
            popup: `
                    <h4 data-lang-key="herzogenaurachTitle">黑尔措根奥拉赫</h4>
                    <img src="images/schaeffler.png" alt="Schaeffler AG" style="width: 100%; max-width: 200px; margin-bottom: 10px;">
                    <p data-lang-key="herzogenaurachDescription">这座城市坐落着著名机械制造行业供应商舍弗勒公司，我在这里的转动轴研发部门完成了机械制造专业本科阶段的义务实习。</p>
                    <a href="https://www.schaeffler.com" target="_blank" data-lang-key="visitSchaefflerWebsite">访问舍弗勒公司官网</a>
                `
            },
            { latlng: [50.37716, 7.60306],
             popup: `
                    <h4 data-lang-key="koblenzTitle">科布伦茨</h4>
                    <img src="images/koblenz.png" alt="koblenz" style="width: 100%; max-width: 200px; margin-bottom: 10px;">
                    <p data-lang-key="koblenzDescription">林河旁边的这座德国著名的旅游城市，德国之角所在地，是斯泰必鲁斯公司的总部。这是一家生产空气弹簧及阻尼器等的制造企业。我在这里的创新研发部门完成了机械制造研究生阶段的自由实习。</p>
                    <a href="https://www.koblenz.de" target="_blank" data-lang-key="visitKoblenzWebsite">访问科布伦茨城市官网</a>
                `
             },
            { latlng: [52.32205, 9.81258],
            popup: `
                    <h4 data-lang-key="hannoverTitle">汉诺威</h4>
                    <img src="images/hannover.png" alt="汉诺威" style="width: 100%; max-width: 200px; margin-bottom: 10px;">
                    <p data-lang-key="hannoverDescription">汉诺威展览是德国最大的工业展览，在课余时间我有幸代表国内企业参展，收获颇丰。</p>
                    <a href="https://www.hannovermesse.de" target="_blank" data-lang-key="visitHannoverMesseWebsite">访问汉诺威展览官网</a>
                `
            },
            { latlng: [51.25924, 6.74316],
             popup: `
                    <h4 data-lang-key="duesseldorfTitle">杜塞尔多夫</h4>
                    <img src="images/duesseldorf.png" alt="杜塞尔多夫" style="width: 100%; max-width: 200px; margin-bottom: 10px;">
                    <p data-lang-key="duesseldorfDescription">杜塞尔多夫冶金展是欧洲最大的冶金展览。2019年我有幸参展的同时，也领略这座国际化大都市的风采。</p>
                    <a href="https://www.messe-duesseldorf.de" target="_blank" data-lang-key="visitDuesseldorfMesseWebsite">访问杜塞尔多夫冶金展官网</a>
                `
             }
        ];


    germanyMarkers.forEach(marker => {
        const popupContent = translatePopup(marker.popup, combinedData);
        L.marker(marker.latlng)
            .addTo(germanyMap)
            .bindPopup(popupContent);
    });

    console.log("Germany map initialized.");

    // 监听窗口大小变化，防止地图显示不完整
    window.addEventListener("resize", function () {
        qingdaoMap.invalidateSize();
        germanyMap.invalidateSize();
    });

    console.log("Resize listener added.");
}

// 翻译弹出框内容
function translatePopup(popupText, combinedData) {
    return combinedData[popupText] || popupText;
}