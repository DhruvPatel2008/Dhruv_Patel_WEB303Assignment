<?php

$json = file_get_contents('Char.json');

// Decode the JSON file
$json_data = json_decode($json,true);

foreach($json_data as $key=>$value) {
    $search = strtolower($_REQUEST["search"]);
    if ($search == "a_to_m") {
        $json_data[$key]['class'] = (strtolower($value["FirstName"][0]) >= 'a' && strtolower($value["FirstName"][0]) <= 'm') ? "active" : "";
    } else if ($search == "n_to_z") { 
        $json_data[$key]['class'] = (strtolower($value["FirstName"][0]) >= 'n' && strtolower($value["FirstName"][0]) <= 'z') ? "active" : "";
    } else {
        $json_data[$key]['class'] = (strtolower($value["FirstName"][0]) == $search) ? "active" : "";
    }
    
}

echo json_encode($json_data);
