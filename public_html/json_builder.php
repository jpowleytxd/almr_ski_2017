<?php
//------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------
//-------------------------------------ALMR 2018 Ski----------------------------------
//-------------------------------------JSON Builder-----------------------------------
//------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------

// Read in CSV from file
$filename = "data/ski_guests.csv";

// Read in file
$csv = fopen($filename, "r");

// Setup count
$count = 0;
$fullJSON = '{"PEOPLE":[';
// Foreach row in the CSV
while (($data = fgetcsv($csv)) !== FALSE) {
    // Ignore the first row
    if($count == 1){
        // Get data from array
        $roomNumber = trim($data[7]);
        $name = trim($data[1]);
        $company = trim($data[3]);
        
        // Build string
        $rowJSON = '{"COMPANY":"' . trim($company) . '","ROOM_NUMBER": "' . $roomNumber . '","NAME":"' . trim($name) . '"}';
        $fullJSON .= $rowJSON;
    } else if($count > 1){
        // Get data from array
        $roomNumber = trim($data[7]);
        $name = trim($data[1]);
        $company = trim($data[3]);
        
        // Build string
        $rowJSON = ',{"COMPANY":"' . $company . '","ROOM_NUMBER": "' . $roomNumber . '","NAME":"' . trim($name) . '"}';
        $fullJSON .= $rowJSON;
    }
    $count++;
}
$fullJSON .= "]}";

var_dump($fullJSON);

// Save to file
file_put_contents("data/guests.json", $fullJSON);

?>