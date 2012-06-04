echo cd /usr/local/src/headServer/>>ftpcmdhead.dat
echo mput B:\code\Shuffle\ShufflyNode\headServer\*>> ftpcmdhead.dat
echo quit>> ftpcmdhead.dat
b:\psftp.exe -pw %1 -b ftpcmdhead.dat root@50.116.22.241
del ftpcmdhead.dat
exit