<?php
declare(strict_types=1);

function calculateWater(int $qtde, array $arr):int {
    if ($qtde < 3) return 0;

    $water = 0;

    $maxEsq = array_fill(0, $qtde, 0);
    $maxDir = array_fill(0, $qtde, 0);

    $maxEsq[0] = $arr[0];

    for ($i = 1; $i < $qtde; $i++) {
        $maxEsq[$i] = max($maxEsq[$i - 1], $arr[$i]);
    }

    $maxDir[$qtde - 1] = $arr[$qtde - 1];

    for ($i = $qtde - 2; $i >= 0; $i--) {
        $maxDir[$i] = max($maxDir[$i + 1], $arr[$i]);
    }

    for ($i = 0; $i < $qtde; $i++) {
        $water += max(0, min($maxEsq[$i], $maxDir[$i]) - $arr[$i]);
    }

    return $water;
}

$data = filter_input(INPUT_POST, 'dados', FILTER_DEFAULT, FILTER_REQUIRE_ARRAY);

if ($data !== null && is_array($data)) {
    $calculate = [];

    foreach ($data as $item) {
        $qtdeOccurrence = (int) $item['case'];
        $values = array_map('intval', $item['values']);

        $calculate[] = calculateWater($qtdeOccurrence, $values);
    }

    echo json_encode(['water' => implode(',', $calculate)], JSON_THROW_ON_ERROR);
    exit;
} 
?>
