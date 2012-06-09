echo cd /var/www/client>>ftpcmdclient.dat
echo mput B:\code\Shuffle\ShufflyNode\client\*.js>> ftpcmdclient.dat

echo cd /var/www/common>>ftpcmdclient.dat
echo mput B:\code\Shuffle\ShufflyNode\common\*.js>> ftpcmdclient.dat

echo cd /var/www/implementation>>ftpcmdclient.dat
echo mput B:\code\Shuffle\ShufflyNode\implementation\*.js>> ftpcmdclient.dat

echo cd /var/www/models>>ftpcmdclient.dat
echo mput B:\code\Shuffle\ShufflyNode\models\*.js>> ftpcmdclient.dat

echo cd /var/www/implementation>>ftpcmdclient.dat
echo mput B:\code\Shuffle\ShufflyNode\implementation\*.js>> ftpcmdclient.dat



echo cd /var/www/client/lib>>ftpcmdclient.dat
echo mput B:\code\Shuffle\ShufflyNode\client/lib/*.js>> ftpcmdclient.dat

 


echo quit>> ftpcmdclient.dat
b:\psftp.exe -pw %1 -b ftpcmdclient.dat root@50.116.22.241
del ftpcmdclient.dat

exit