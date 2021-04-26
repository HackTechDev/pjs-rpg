<?php 

// Split image
$width = 48;
$height = 64;
$player = "player";

$source_image = imagecreatefrompng($player . ".png");

for ($i = 0; $i < 4; $i++) {
    for($j = 0; $j < 3; $j++) {
        $destination_image = imagecreatetruecolor($width, $height);
        imagesavealpha($destination_image, true);
        $transparent_background = imagecolorallocatealpha($destination_image, 0, 0, 0, 127);
        imagefill($destination_image, 0, 0, $transparent_background);

        imagecopy($destination_image, $source_image, 0, 0, $j * 48, $i * 64, $width, $height);
        imagepng($destination_image, $player . "_" . $i . "_" . $j . ".png");

        imagedestroy($destination_image);
    }
}

imagedestroy($source_image);

// Single image

$player = "player";


$destination_image = imagecreatetruecolor(576, 64);
imagesavealpha($destination_image, true);
$transparent_background = imagecolorallocatealpha($destination_image, 0, 0, 0, 127);
imagefill($destination_image, 0, 0, $transparent_background);


for ($i = 0; $i < 4; $i++) {
    for($j = 0; $j < 3; $j++) {
        $image_single = imagecreatefrompng($player . "_" . $i . "_" . $j . ".png");
        $x = ($i * 144) + ($j * 48);
        imagecopy($destination_image, $image_single, $x, 0, 0, 0, 48, 64);
        imagepng($destination_image, "playera.png");
    }
}


imagedestroy($destination_image);

?>
