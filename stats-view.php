<?php
require_once __DIR__ . '/config.php';

// 密码验证
$isAuthorized = false;
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['password'] === $GLOBALS['STATS_PASSWORD']) {
    $isAuthorized = true;
} elseif (isset($_GET['auth']) && $_GET['auth'] === $GLOBALS['STATS_PASSWORD']) {
    $isAuthorized = true;
}

// 未授权显示密码表单
if (!$isAuthorized) {
    showPasswordForm();
    exit;
}

// 已授权则显示统计看板
showStatsDashboard();

// ===== 函数定义 =====
function showPasswordForm() {
    $error = isset($_GET['error']) ? '<p style="color:red">'.htmlspecialchars($_GET['error']).'</p>' : '';
    echo <<<HTML
<!DOCTYPE html>
<html>
<head>
    <title>访问统计看板</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 2rem auto; padding: 20px; }
        form { background: #f8f9fa; padding: 2rem; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        h1 { color: #333; text-align: center; }
        input {
            padding: 10px; width: 100%; margin: 10px 0;
            border: 1px solid #ddd; border-radius: 4px;
        }
        button {
            background: #4CAF50; color: white; border: none;
            padding: 10px 15px; width: 100%; border-radius: 4px;
            cursor: pointer; font-size: 16px;
        }
        button:hover { background: #45a049; }
    </style>
</head>
<body>
    <h1>📊 网站访问统计</h1>
    <form method="post">
        <h3>请输入访问密码</h3>
        <input type="password" name="password" placeholder="输入密码" required>
        <button type="submit">查看统计</button>
        {$error}
    </form>
</body>
</html>
HTML;
}

function showStatsDashboard() {
    // 读取数据
    $logFile = __DIR__ . '/visitors.txt';
    $data = file_exists($logFile) ? json_decode(file_get_contents($logFile), true) : [];

    // 按日期倒序排序
    krsort($data);

    // 准备图表数据
    $chartLabels = [];
    $chartData = [];
    $totalVisitors = 0;

    foreach ($data as $date => $ips) {
        $count = count($ips);
        $chartLabels[] = $date;
        $chartData[] = $count;
        $totalVisitors += $count;
    }

    // 渲染页面
    echo <<<HTML
<!DOCTYPE html>
<html>
<head>
    <title>统计看板</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 1000px; margin: 0 auto; padding: 20px; }
        .header { display: flex; justify-content: space-between; align-items: center; }
        .chart-container { width: 100%; height: 400px; margin: 30px 0; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
        th { background-color: #f2f2f2; position: sticky; top: 0; }
        tr:nth-child(even) { background-color: #f9f9f9; }
        .logout { color: #666; text-decoration: none; font-size: 14px; }
    </style>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <div class="header">
        <h1>📊 网站访问统计</h1>
        <a href="stats-view.php" class="logout">退出</a>
    </div>

    <div class="chart-container">
        <canvas id="visitorsChart"></canvas>
    </div>

    <table>
        <thead>
            <tr>
                <th>日期</th>
                <th>独立访客</th>
                <th>IP示例</th>
            </tr>
        </thead>
        <tbody>
HTML;

    // 表格数据行
    foreach ($data as $date => $ips) {
        $count = count($ips);
        $sampleIP = $count > 0 ? htmlspecialchars(preg_replace('/\.\d+$/', '.xxx', array_key_first($ips))) : '-';
        echo "<tr><td>{$date}</td><td>{$count} 人</td><td>{$sampleIP}</td></tr>";
    }

    // 页脚
    echo <<<HTML
        </tbody>
        <tfoot>
            <tr>
                <th>总计</th>
                <th colspan="2">{$totalVisitors} 人</th>
            </tr>
        </tfoot>
    </table>

    <script>
        // 渲染图表
        new Chart(
            document.getElementById('visitorsChart'),
            {
                type: 'line',
                data: {
                    labels: ${json_encode(array_reverse($chartLabels))},
                    datasets: [{
                        label: '每日独立访客',
                        data: ${json_encode(array_reverse($chartData))},
                        borderColor: 'rgb(75, 192, 192)',
                        backgroundColor: 'rgba(75, 192, 192, 0.1)',
                        borderWidth: 2,
                        tension: 0.3,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { position: 'top' },
                        tooltip: { mode: 'index', intersect: false }
                    },
                    scales: {
                        y: { beginAtZero: true }
                    }
                }
            }
        );
    </script>
</body>
</html>
HTML;
}
?>