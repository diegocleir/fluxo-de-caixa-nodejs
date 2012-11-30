<?php

require_once 'conexao.php';
$arrDados 	= $_REQUEST; 
$arrMessage = array(); 

if($arrDados["acao"]=="insert")
{
        $data 		= json_decode($arrDados['data']);	
	$strNome 	= mysql_real_escape_string($data->{'dsDescricao'}); 
        $fgTipo         = mysql_real_escape_string($data->{'fgTipo'});
        $conta_id       = mysql_real_escape_string($data->{'conta_id'});
	
	$strSQL = "INSERT INTO contas (dsDescricao, fgTipo, conta_id) VALUES ('".$strNome."', '".$fgTipo."', '".$conta_id."')";
	
	if(mysql_query($strSQL))
	{
		
		$data->{'idConta'} 	   	= mysql_insert_id(); 
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
	$idConta                = mysql_real_escape_string($arrDados['idConta']); 
	$strNome 		= mysql_real_escape_string($arrDados['dsDescricao']);
        $fgTipo 		= mysql_real_escape_string($arrDados['fgTipo']);
        $conta_id 		= mysql_real_escape_string($arrDados['conta_id']);

	$strSQL = "UPDATE contas SET dsDescricao = '".$strNome."', fgTipo = '".$fgTipo."', conta_id = '".$conta_id."'  WHERE idConta = '".$idConta."' ";
	if(mysql_query($strSQL))
	{
		$arrMessage['success'] 	= true; 
		$arrMessage['message'] 	= "Registro(s) salvo(s) com sucesso!";	
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
    $arrCategorias = $arrDados["id"];
	
	for($i=0;$i<count($arrCategorias);$i++)
	{
       $idConta = mysql_real_escape_string($arrCategorias[$i]);
	   $strSQL 	 	= "DELETE FROM contas WHERE idConta = '".$idConta."'"; 
                if(!mysql_query($strSQL))
				{
						echo json_encode(array(
							"success" => false,
							"message" => 'Erro na exclusão'
					));	
					break;	
				}
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
        
        $strSQL = "SELECT idConta, dsDescricao, fgTipo, conta_id FROM contas ORDER BY ".mysql_real_escape_string($order);
        
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
		
		        
        $strSQL 	= "SELECT COUNT(*) AS total FROM contas";
        $total 		= mysql_fetch_array(mysql_query($strSQL));

        echo json_encode(array(
            "data" => $arrBanco,
            "success" => true,
			"inicio" => $inicio,
            "total" => $total['total']			
        ));
	
	
}		
mysql_close(); 