echo cd /usr/local/src/debugServer/>>ftpcmddebug.dat
echo mput B:\code\Shuffle\ShufflyNode\debugServer\*>> ftpcmddebug.dat

echo quit>> ftpcmddebug.dat
b:\psftp.exe -pw %1 -b ftpcmddebug.dat root@50.116.22.241
del ftpcmddebug.dat
exit
