type edge.js > out.js
type vertex.js >> out.js
REM Google Closure Compiler to minify js
java -jar compiler.jar --js out.js --js_output_file mavis3d.min.js
REM Unminified copy
type out.js > mavis3d.js
del out.js
pause
