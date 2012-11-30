<?php

require_once 'conexao.php';
$arrDados 	= $_REQUEST; 
$arrMessage = array(); 

if($arrDados["acao"]=="insert")
{
    $data 		= json_decode($arrDados['data']);	
	
	$strNome 	= mysql_escape_string($data->{'nmUsuario'}); 
	$strEmail 	= mysql_escape_string($data->{'dsEmail'}); 
	$strSenha 	= mysql_escape_string($data->{'dsSenha'}); 
	
	$strSQL = "INSERT INTO usuario (nmUsuario, dsEmail, dsSenha) VALUES ('".$strNome."','".$strEmail."','".$strSenha."')";
	
	if(mysql_query($strSQL))
	{

		$data->{'idUsuario'} 	   	= mysql_insert_id(); 

		$arrMessage['success'] 		= true; 
		$arrMessage['message'] 		= "Registro salvo com sucesso!";
		$arrMessage['data']    		= $data;		
	}
	else
	{
		$arrMessage['success'] = false;
		$arrMessage['message'] = "Erro ao salvar no banco de dados!";
	}
	
	 echo json_encode($arrMessage);
	
}
else if($arrDados["acao"]=="update")
{
	$data 		= json_decode($arrDados['data']);
	$idUsuario 	= mysql_escape_string($data->{'idUsuario'}); 
	$strNome 	= mysql_escape_string($data->{'nmUsuario'}); 
	$strEmail 	= mysql_escape_string($data->{'dsEmail'}); 
	$strSenha 	= mysql_escape_string($data->{'dsSenha'}); 

	$strSQL = "UPDATE usuario SET nmUsuario = '".$strNome."', dsEmail = '".$strEmail."', dsSenha = '".$strSenha."' WHERE idUsuario = '".$idUsuario."' ";
	if(mysql_query($strSQL))
	{
		$arrMessage['success'] 						= true; 
		$arrMessage['message'] 						= "Registro(s) salvo(s) com sucesso!";	
	}
	else
	{
		$arrMessage['success'] = false;
		$arrMessage['message'] = "Erro ao salvar no banco de dados!";
	}
		
	 echo json_encode($arrMessage);
}
else if($arrDados["acao"]=="delete")
{
    $arrUsuarios = json_decode($_POST['data']);
	
	if (is_array($arrUsuarios)) 
	{
      foreach ($arrUsuarios as $usuario) 
	   {
                $idUsuario 	= mysql_real_escape_string($usuario->idUsuario);
				$strSQL 	= "DELETE FROM usuario WHERE idUsuario = '".$idUsuario."'"; 
                if(!mysql_query($strSQL))
				{
					break;	
				}
	   }
     }
	 else 
	 {
            $idUsuario  = $arrUsuarios->idUsuario;
           	$strSQL 	= "DELETE FROM usuario WHERE idUsuario = '".$idUsuario."'"; 			
            mysql_query($strSQL);
     }

        echo json_encode(array(
            "success" => true,
            "message" => 'Registro(s) excluído(s) com sucesso'
        ));
	 
}
else 
{
	$sort 	= $arrDados['sort'] ? $arrDados['sort'] : '1';
        $dir 	= $arrDados['dir']  ? $arrDados['dir']  : 'ASC';
        $order 	= $sort . ' ' . $dir;
        
        $strSQL = "SELECT idUsuario, nmUsuario, dsEmail, dsSenha FROM usuario ORDER BY ".mysql_real_escape_string($order);
        
        if($arrDados["start"] !== null && $arrDados["start"] !== 'start' && $arrDados["limit"] !== null && $arrDados["limit"] !== 'limit')
		{
				
			$inicio  = ($arrDados["page"]-1);  
			$inicio *= $arrDados["limit"];
			
            $strSQL .= " LIMIT " . $inicio . " , " . $arrDados["limit"];
        }
        		
		
		$objRs = mysql_query($strSQL);
		$arrBanco = array(); 
		
		while($objRow = mysql_fetch_assoc ($objRs))
		{
			$arrBanco[] = $objRow; 	
		}		        
		
		        
        $strSQL 	= "SELECT COUNT(*) AS total FROM usuario";
        $total 		= mysql_fetch_array(mysql_query($strSQL));
        //if ($inicio === null) { $inicio = 1;}

        echo json_encode(array(
            "data" => $arrBanco,
            "success" => true,
            //"inicio" => $inicio,
            "total" => $total['total']
			
        ));
	
	
}		
mysql_close(); 