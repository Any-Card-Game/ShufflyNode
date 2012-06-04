echo cd /usr/local/src/gameServer/>>ftpcmdgame.dat
echo mput B:\code\Shuffle\ShufflyNode\gameServer\*>> ftpcmdgame.dat
echo quit>> ftpcmdgame.dat
b:\psftp.exe -pw %1 -b ftpcmdgame.dat root@50.116.22.241
del ftpcmdgame.dat
exit
