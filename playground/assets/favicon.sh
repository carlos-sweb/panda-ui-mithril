magick favicon-original.png \
    -fuzz 8% \
    -trim \
    +repage \
    -background none \
    -gravity center \
    -extent 115%x115% \
    -resize 64x64 \
    -strip \
    ./../favicon-64.png

magick favicon-original.png \
    -fuzz 8% \
    -trim \
    +repage \
    -background none \
    -gravity center \
    -extent 115%x115% \
    -resize 32x32 \
    -strip \
    ./../favicon-32.png

magick favicon-original.png \
    -fuzz 8% \
    -trim \
    +repage \
    -background none \
    -gravity center \
    -extent 115%x115% \
    -resize 16x16 \
    -strip \
    ./../favicon-16.png
