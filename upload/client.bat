echo cd /var/www/client>>ftpcmd.dat
echo mput B:\code\Shuffle\ShufflyNode\client\*.js>> ftpcmd.dat

echo cd /var/www/common>>ftpcmd.dat
echo mput B:\code\Shuffle\ShufflyNode\common\*.js>> ftpcmd.dat

echo cd /var/www/implementation>>ftpcmd.dat
echo mput B:\code\Shuffle\ShufflyNode\implementation\*.js>> ftpcmd.dat

echo cd /var/www/models>>ftpcmd.dat
echo mput B:\code\Shuffle\ShufflyNode\models\*.js>> ftpcmd.dat

echo cd /var/www/implementation>>ftpcmd.dat
echo mput B:\code\Shuffle\ShufflyNode\implementation\*.js>> ftpcmd.dat

echo quit>> ftpcmd.dat
b:\psftp.exe -pw %1 -b ftpcmd.dat root@50.116.22.241
del ftpcmd.dat

exit