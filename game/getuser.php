<!DOCTYPE html>
<html>
<head>
<style>
table {
  width: 100%;
  border-collapse: collapse;
}

table, td, th {
  border: 1px solid black;
  padding: 5px;
}

th {text-align: left;}
</style>
</head>
<body>

<?php
$servername = "n0jueuv2mam78uv.cbetxkdyhwsb.us-east-1.rds.amazonaws.com";
$username = "bbsm5vvps02riw3c";
$password = "zcymvsfba3hcafjs";
$dbname = "kuthdu1glbm19npv";

header("Content-Type: application/json; charset=UTF-8");
$obj = json_decode($_GET["x"], false);

// Create connection.
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection.
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$stmt = $conn->prepare("SELECT * FROM kuthdu1glbm19npv.GameScore ORDER BY TimeElapsed LIMIT ?");
$stmt->bind_param("s", $obj->limit);
$stmt->execute();
$result = $stmt->get_result();
$outp = $result->fetch_all(MYSQLI_ASSOC);
    
$rows = array();
while($r = mysqli_fetch_assoc($stmt)) {
    $rows[] = $r;
}
print json_encode($rows); 

//echo json_encode($outp);

$conn->close();
?>

</body>
</html>