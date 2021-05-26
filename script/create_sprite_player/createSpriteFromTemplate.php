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

        if($i == 0) $position = "back";
        if($i == 1) $position = "right";
        if($i == 2) $position = "front";
        if($i == 3) $position = "left";

        imagepng($destination_image, "misa-$position-walk.00$j.png");

        if($j == 1 ) {
            imagepng($destination_image, "misa-$position-walk.003.png");
            imagepng($destination_image, "misa-$position.png");
        }

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
