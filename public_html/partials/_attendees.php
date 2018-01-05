<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$delegates = file_get_contents($_SERVER['DOCUMENT_ROOT'] . '/data/guests.json');
$delegates = json_decode($delegates, true);

$rooms = array();
$prevNumber = 1;
$room = array();

foreach($delegates['PEOPLE'] as $delegate){
    if($delegate["ROOM_NUMBER"] == $prevNumber){
        array_push($room, $delegate);
    } else{
        $prevNumber = $delegate["ROOM_NUMBER"];
        array_push($rooms, $room);
        $room = array();
        array_push($room, $delegate);
    }
}

array_push($rooms, $room);

?>

<!--Table data-->
<section class="room_data">
    <?php
        // For All Tables
        foreach($rooms as $key => $room){
            // Miss the first row
            if($key > 0){
                echo '<div id="room-number" class="room-' . $room[0]['ROOM_NUMBER'] . '" data-room="' . $room[0]['ROOM_NUMBER'] . '">';
                // For All Delegate
                foreach($room as $delegate){
                    echo '<span data-room="' . $delegate["ROOM_NUMBER"] . '" data-name="' . $delegate["NAME"] . '" data-company="' . $delegate["COMPANY"] . '"></span>';
                }
                echo '</div>';
            }
        }
    ?>
</section>


<section class="container faded_background">
    <h1 class="main_title">Guest List</h1>
    <div class="attendees_outer">
        <div class="search_container">
            <input type="text" id="search" name="search" placeholder="Search By Name">
        </div>
        <table>
            <thead>
                <tr>
                    <th>Room</th>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                <?php
                    foreach($delegates['PEOPLE'] as $delegate){
                        echo '<tr class="data" data-room="' . $delegate["ROOM_NUMBER"] . '">';
                        echo '<td class="room_number">' . $delegate["ROOM_NUMBER"] . '</td>';
                        echo '<td class="name">' . $delegate['NAME'] . '</td>';
                        echo '</tr>';
                    }
                ?>
            </tbody>
        </table>
    </div>
</section>

<!-- Include Footer -->
<?php include('_footer.php') ?>