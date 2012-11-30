<?php

require_once 'conexao.php';
$arrDados 	= $_REQUEST; 
$arrMessage = array(); 

if($arrDados["acao"]=="insert")
{
        $data 			= json_decode($arrDados['data']);	
	
	$idConta	= mysql_real_escape_string($data->{'conta_id'}); 	
	$strNome 		= mysql_real_escape_string($data->{'dsDescricao'}); 	
	$strValor	= mysql_real_escape_string($data->{'NuValor'}); 	
	$dtFluxo 		= mysql_real_escape_string($data->{'dtFluxo'});
        

	$strSQL  = "INSERT INTO fluxo ";
	$strSQL .= " (conta_id, dsDescricao, NuValor, dtFluxo) "; 
	$strSQL .= "VALUES ('".$idConta."', '".$strNome."', '".$strValor."', '".$dtFluxo."')";
	
	if(mysql_query($strSQL))
	{
	
		$data->{'idFluxo'} 	   					= mysql_insert_id(); 	
		$arrMessage['success'] 						= true; 
		$arrMessage['message'] 						= "Registro salvo com sucesso!";
		$arrMessage['data']    						= $data;		
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
	$idFluxo 		= mysql_real_escape_string($arrDados['idFluxo']); 
	$idConta	= mysql_real_escape_string($arrDados['conta_id']); 	
	$strNome 		= mysql_real_escape_string($arrDados['dsDescricao']); 	
	$strValor	= mysql_real_escape_string($arrDados['NuValor']); 	
	$dtFluxo 		= mysql_real_escape_string($arrDados['dtFluxo']);
        
        //$dtFluxo = substr($dtFluxo, 0, 10);

	$strSQL  = "UPDATE fluxo SET "; 
	$strSQL .= "  dsDescricao 				= '".$strNome."' "; 
	$strSQL .= ", conta_id 	= '".$idConta."'"; 
	$strSQL .= ", NuValor 				= '".$strValor."'"; 
	$strSQL .= ", dtFluxo 					= '".$dtFluxo."'"; 	
	$strSQL .= " WHERE idFluxo 			= '".$idFluxo."' ";
			
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
    $arrAgendas = $arrDados["id"];
	
	for($i=0;$i<count($arrAgendas);$i++)
	{
       $idFluxo	= mysql_real_escape_string($arrAgendas[$i]);
	   $strSQL 	 	= "DELETE FROM fluxo WHERE idFluxo = '".$idFluxo."'"; 
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
        
        $strSQL = "SELECT idFluxo, conta_id, dsDescricao, NuValor, dtFluxo FROM fluxo ORDER BY ".mysql_real_escape_string($order);
        
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
		
		        
        $strSQL 	= "SELECT COUNT(*) AS total FROM fluxo";
        $total 		= mysql_fetch_array(mysql_query($strSQL));

        echo json_encode(array(
            "data" => $arrBanco,
            "success" => true,
  //          "inicio" => $inicio,
            "total" => $total['total']			
        ));
	
	
}		
mysql_close(); 