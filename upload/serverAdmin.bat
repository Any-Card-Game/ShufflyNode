echo cd /usr/local/src/serverAdmin/>>ftpcmd.dat
echo mput B:\code\Shuffle\ShufflyNode\serverAdmin\*>> ftpcmd.dat
echo quit>> ftpcmd.dat
b:\psftp.exe -pw %1 -b ftpcmd.dat root@50.116.22.241
del ftpcmd.dat
exit