echo cd /usr/local/src/gatewayServer/>>ftpgatewaserver.dat
echo mput B:\code\Shuffle\ShufflyNode\gatewayServer\*>> ftpgatewaserver.dat
echo quit>> ftpgatewaserver.dat
b:\psftp.exe -pw %1 -b ftpgatewaserver.dat root@%2
del ftpgatewaserver.dat 
exit