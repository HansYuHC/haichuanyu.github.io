<?php
// 获取真实IP（兼容代理）
function getRealIP() {
    $ip = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'];
    return is_array($ip) ? trim($ip[0]) : trim($ip);
}

// 主逻辑
$ip = getRealIP();
$today = date('Y-m-d');
$logFile = __DIR__ . '/visitors.txt';

// 读取或初始化数据
$data = file_exists($logFile) ? json_decode(file_get_contents($logFile), true) : [];

// 清理30天前的数据
foreach ($data as $date => $ips) {
    if (strtotime($date) < strtotime('-30 days')) {
        unset($data[$date]);
    }
}

// 记录新访问（IP去重）
if (!isset($data[$today][$ip])) {
    $data[$today][$ip] = 1;
    file_put_contents($logFile, json_encode($data, JSON_PRETTY_PRINT));
}

// 输出透明像素
header('Content-Type: image/png');
echo base64_decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=');
?>