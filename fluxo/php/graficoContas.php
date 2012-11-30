<?php
require_once 'conexao.php';
$arrDados 	= $_REQUEST; 
//$arrMessage = array(); 

if($arrDados["acao"]=="grafico")
{    	        
        $strSQL  = "SELECT 	  COUNT( a.idFluxo ) AS total
							, c.dsDescricao AS descricao   
						   FROM 
								fluxo a 
					 INNER JOIN 
								contas c 
							 ON 
								a.conta_id = c.idConta
					   GROUP BY 
								c.dsDescricao";
               				
		$objRs = mysql_query($strSQL);
		$arrBanco = array(); 
		
		while($objRow = mysql_fetch_assoc ($objRs))
		{
			$arrBanco[] = $objRow; 	
		}		                

        echo json_encode(array(
            "data" => $arrBanco,
            "success" => true			
        ));
	
	
}		
mysql_close(); 