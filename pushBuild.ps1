npm run build
cd build
"{`"type`": `"module`"}" | out-file "package.json"
git init
git add .
git commit -m "."
git remote add origin https://github.com/awcomms/apexlinks-build
git push origin main -f