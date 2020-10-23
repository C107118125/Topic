<?php


$server = 'localhost';
$dbname = '109p2';
$user = 'root';
$passwd = 'JCAqwerty87561';


try{
    $conn = new PDO("mysql:host=" . $server . ";dbname=" . $dbname , $user, $passwd);
    $conn->exec("SET CHARACTER SET utf8");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}catch(PDOException $e)
{
    "Connection failed: ".$e->getMessage();
}

if(isset($_POST['action']) && !empty($_POST['action'])) //判別使用哪個function
{
    $action = $_POST['action'];
    switch($action) {
        case 'getdata' : getdata(); break;
        // ...etc...
    }
}

function getdata(){
    global $conn; 
    $position = [];

     $sql = "SELECT * FROM tra UNION SELECT * FROM mrt";

    $stmt = $conn->query($sql);
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);;
    $count = 0;

      foreach ($rows as $key => $value) {
        $position['station'][$count]['station_name'] = $value['name'];
        $position['station'][$count]['station_address'] = $value['address'];
        $position['station'][$count]['category'] = $value['category'];
        $position['markerPoint'][$count]['longitude'] = $value['longitude'];
        $position['markerPoint'][$count]['latitude'] = $value['latitude'];
        
        $count++;

        }

    echo json_encode($position);
}



?>