type edge.js > out.js
type vertex.js >> out.js
REM Google Closure Compiler to minify js
java -jar compiler.jar --js out.js --js_output_file C:\source\axlesoft\www\mavis.js\js\mavis3d.js
REM Unminified copy
REM type out.js > C:\source\axlesoft\www\mavis.js\js\mavis.js
del out.js
pause
