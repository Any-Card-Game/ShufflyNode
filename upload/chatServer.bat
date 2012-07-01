echo cd /usr/local/src/chatServer/>>ftpcmdchat.dat
echo mput B:\code\Shuffle\ShufflyNode\chatServer\*>> ftpcmdchat.dat

echo quit>> ftpcmdchat.dat
b:\psftp.exe -pw %1 -b ftpcmdchat.dat root@%2
del ftpcmdchat.dat
exit
