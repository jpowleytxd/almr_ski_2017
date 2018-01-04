<?php
//------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------
//-------------------------------------ALMR 2018 SKI----------------------------------
//-------------------------------------Ski Hire Page----------------------------------
//------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------
?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
<meta charset="UTF-8">

<title>ALMR Ski</title>

<link rel="stylesheet" type="text/css" href="css/almr_main.css">
<!-- <link rel="manifest" href="data/manifest.json"> -->
</head>

<body id="ski_hire">
<div class="wrapper">
    <!-- Include Header And Navigation -->
    <?php include('partials/_header.php') ?>
    <?php include('partials/_navigation.php') ?>

    <!-- All Content Container -->
    <div id="content_container">
        <?php include('partials/_ski_hire.php') ?>
    </div>
</div>
<!-- ------------------------------------------------- -->
<!-- ----------------Scripting Section---------------- -->
<!-- ------------------------------------------------- -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.1/TweenMax.min.js"></script>
<script src="js/almr_functions.js"></script>
</body>

</html>