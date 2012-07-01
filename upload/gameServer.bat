echo cd /usr/local/src/gameServer/>>ftpcmdgame.dat
echo mput B:\code\Shuffle\ShufflyNode\gameServer\*>> ftpcmdgame.dat

echo cd /usr/local/src/common/>>ftpcmdgame.dat
echo mput B:\code\Shuffle\ShufflyNode\common\*.js>> ftpcmdgame.dat

echo cd /usr/local/src/games/>>ftpcmdgame.dat
echo mput B:\code\Shuffle\ShufflyNode\games\*.js>> ftpcmdgame.dat

echo cd /usr/local/src/gameFramework/>>ftpcmdgame.dat
echo mput B:\code\Shuffle\ShufflyNode\gameFramework\*.js>> ftpcmdgame.dat

echo cd /usr/local/src/games/Sevens/>>ftpcmdgame.dat
echo mput B:\code\Shuffle\ShufflyNode\games\Sevens\*.js>> ftpcmdgame.dat

echo quit>> ftpcmdgame.dat
b:\psftp.exe -pw %1 -b ftpcmdgame.dat root@%2
del ftpcmdgame.dat
exit
