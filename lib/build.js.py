filenames = [
"utils.js",
"geometry.js",
"axes.js",
"plot.js",
"point.js",
"line.js",
"tick.js",
"arrow.js",
"measure.js",
"angle.js",
"circle.js",
"polygon.js",
"text.js",
"controlpoint.js",
"button.js",
]
with open('mavis.js', 'w') as outfile:
    for fname in filenames:
        with open(fname) as infile:
            outfile.write(infile.read())