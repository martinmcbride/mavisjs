type utils.js > out.js
type geometry.js >> out.js
type axes.js >> out.js
type plot.js >> out.js
type point.js >> out.js
type line.js >> out.js
type tick.js >> out.js
type arrow.js >> out.js
type measure.js >> out.js
type angle.js >> out.js
type circle.js >> out.js
type polygon.js >> out.js
type text.js >> out.js
type controlpoint.js >> out.js
REM Google Closure Compiler to minify js
java -jar compiler.jar --js out.js --js_output_file C:\source\axlesoft\www\mavis.js\js\mavis.js
REM Unminified copy
REM type out.js > C:\source\axlesoft\www\mavis.js\js\mavis.js
del out.js
pause
