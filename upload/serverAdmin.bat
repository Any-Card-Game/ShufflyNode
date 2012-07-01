echo cd /usr/local/src/serverAdmin/>>ftpcmdserver.dat
echo mput B:\code\Shuffle\ShufflyNode\serverAdmin\*>> ftpcmdserver.dat
echo quit>> ftpcmdserver.dat
b:\psftp.exe -pw %1 -b ftpcmdserver.dat root@%2
del ftpcmdserver.dat 
exit