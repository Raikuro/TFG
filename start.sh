/usr/bin/screen -S backend -Q select . > /dev/null
BACKISUP=$?
if [ $BACKISUP -eq 1 ]; then
  cd /root/TFG/backend
  /usr/bin/screen -A -m -d -S backend ~/.nvm/versions/node/v6.9.5/bin/npm start
fi

/usr/bin/screen -S frontend -Q select . > /dev/null
FRONTISUP=$?
if [ $BACKISUP -eq 1 ]; then
  cd /root/TFG/frontend
  /usr/bin/screen -A -m -d -S frontend ~/.nvm/versions/node/v6.9.5/bin/npm start
fi