<?php
$link = mysql_connect('localhost', 'root', 'diego');
$bd   = mysql_select_db('fluxo');
mysql_set_charset('utf8', $link);