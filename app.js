var express = require('express'),
	app = express(),
	mysql = require('mysql');

var banco = 'fluxo';

 cliente = mysql.createConnection({
	user: 'root',
password: 'diego',
host: 'localhost',
database: banco
	});
//var cliente = new Cliente();
cliente.connect();
//cliente.connect();

//cliente.query(
//	'use ' + banco
//);

//console.dir(cliente);
app.configure(function(){
  app.use(express.static(__dirname));
  app.use(express.bodyParser());
});
	
app.post('/fluxo/login', function (req, res) {
	var email = req.param('email'),
		senha = req.param('senha');
		
	cliente.query(
		'select * ' +
		'from usuario ' +
		'where dsemail = \'' + email + '\' ' +
		'and dssenha = \'' + senha + '\'',
		function (err, results, fields){
			//console.dir(results);
			if(err){
				throw err;
			}
			if(!results.length){
				res.write("{success:false,erro:{motivo:'Erro no usuario ou senha'}}");
			}else{
				res.write("{success:true}");
			}
			res.end();
		}
	)
});

app.get('/fluxo/principal', function (req, res) {
	var html = '<html>'+
    '<head>'+
		'<!-- Definição dos recursos --> '+
        '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> '+
        '<title>Sistema de Controle de Fluxo</title>'+
        '<link rel="stylesheet" type="text/css" href="extjs/resources/css/ext-all.css">'+
        '<link rel="stylesheet" type="text/css" href="resources/css/eia.css">'+
        '<link rel="stylesheet" type="text/css" href="resources/css/Ext.ux.MessageBox.css">'+
        '<!-- Definição da aplicação --> '+
        '<script type="text/javascript" src="extjs/ext-dev.js"></script>'+
        '<script type="text/javascript" src="app.js"></script>		'+
		'<!-- Plugins --> '+
	'<script type="text/javascript" src="app/renderer/comborenderer.js"></script>'+
        '<script type="text/javascript" src="app/ux/Ext.ux.MessageBox.js"></script>'+
        '<script type="text/javascript" src="app/ux/Ext.ux.Notification.js"></script>'+
        '<script type="text/javascript" src="app/ux/Ext.ux.plugin.FormEnter.js"></script>        '+
	'<script type="text/javascript" src="extjs/locale/ext-lang-pt_BR.js"></script>'+
    '</head>'+
    '<body></body>'+
'</html>';
		
	res.write(html);
	res.end();
});

app.post('/fluxos/list', function (req, res) {
	var sort = req.param('sort'),
		dir = req.param('dir'),
		start = req.param('start'),
		limit = req.param('limit'),
		page = req.param('page');
		
		if(!sort){
			sort = '1';
		}
		if(!dir){
			dir = 'ASC';
		}
		
		var strSQL = 'SELECT idFluxo, conta_id, dsDescricao, NuValor, dtFluxo FROM fluxo ORDER BY ' + sort + ' ' + dir;
		
		        if(start !== null && start !== 'start' && limit !== null && limit !== 'limit')
		{
				
			var inicio  = (page-1);  
			inicio *= limit;
			
            strSQL += " LIMIT " + inicio + " , " + limit;
        }

	cliente.query(
		strSQL,
		function (err, results, fields){
			if(err){
				throw err;
			}
			//console.dir(results);
			if(!results.length){
				res.write("{success:false,erro:{motivo:'Erro no usuario ou senha'}}");
			}else{
				strSQL = 'SELECT COUNT(*) AS total FROM fluxo';
				cliente.query(
					strSQL,
					function (err, results2, fields){
						if(err){
							throw err;
						}
						//console.dir(results2);
						if(!results2.length){
							res.write("{success:false,erro:{motivo:'Erro'}}");
						}else{
							var total = results2[0].total;
							res.write("{success:true, total:"+total+",data:"+JSON.stringify(results)+"}");
						}
						res.end();
					});
			}
		}
	)
});

app.post('/fluxo/menu', function (req, res) {
	var html = "{ "+
            "children: ["+
                    "{"+
                        "text:'Cadastros',"+
                        "expanded: true,"+
                        "children:["+
                            "{"+
                                "text:'Usuários',"+
                                "leaf: true,"+
                                "itemMenu: 'usuarioList'"+
                            "},"+
                            "{"+
                                "text:'Conta',"+
                                "leaf:true,"+
                                "itemMenu: 'contaList'"+
                            "},{"+
                                "text:'Fluxo',"+
                                "leaf:true,"+
                                "itemMenu: 'fluxoList'"+
                            "}"+
                        "]"+
                    "}"+
                    ","+
                    "{"+
                        "text:'Relatórios',"+
                        "expanded: true,"+
                        "children:["+
                            "{"+
                                "text:'Gráfico de Contas',"+
                                "leaf:true,"+
                                "itemMenu: 'graficoConta'"+
                            "}"+
                        "]"+
                    "}"+
                "]"+
            "}";
		
	res.write(html);
	res.end();
});

app.post('/usuarios/list', function (req, res) {
	var sort = req.param('sort'),
		dir = req.param('dir'),
		start = req.param('start'),
		limit = req.param('limit'),
		page = req.param('page');
		
		if(!sort){
			sort = '1';
		}
		if(!dir){
			sort = 'ASC';
		}
		
		var strSQL = 'SELECT idUsuario, nmUsuario, dsEmail, dsSenha FROM usuario ORDER BY ' + sort + ' ' + dir;
		
		        if(start !== null && start !== 'start' && limit !== null && limit !== 'limit')
		{
				
			var inicio  = (page-1);  
			inicio *= limit;
			
            strSQL += " LIMIT " + inicio + " , " + limit;
        }

	cliente.query(
		strSQL,
		function (err, results, fields){
			if(err){
				throw err;
			}
			//console.dir(results);
			if(!results.length){
				res.write("{success:false,erro:{motivo:'Erro no usuario ou senha'}}");
			}else{
				strSQL = 'SELECT COUNT(*) AS total FROM usuario';
				cliente.query(
					strSQL,
					function (err, results2, fields){
						if(err){
							throw err;
						}
						//console.dir(results2);
						if(!results2.length){
							res.write("{success:false,erro:{motivo:'Erro'}}");
						}else{
							var total = results2[0].total;
							res.write("{success:true, total:"+total+",data:"+JSON.stringify(results)+"}");
						}
						res.end();
					});
			}
		}
	)
});

app.post('/contas/list', function (req, res) {
	var sort = req.param('sort'),
		dir = req.param('dir'),
		start = req.param('start'),
		limit = req.param('limit'),
		page = req.param('page');
		
		if(!sort){
			sort = '1';
		}
		if(!dir){
			sort = 'ASC';
		}
		
		var strSQL = 'SELECT idConta, dsDescricao, fgTipo, conta_id FROM contas ORDER BY ' + sort + ' ' + dir;
		
		        if(start !== null && start !== 'start' && limit !== null && limit !== 'limit')
		{
				
			var inicio  = (page-1);  
			inicio *= limit;
			
            strSQL += " LIMIT " + inicio + " , " + limit;
        }

	cliente.query(
		strSQL,
		function (err, results, fields){
			if(err){
				throw err;
			}
			//console.dir(results);
			if(!results.length){
				res.write("{success:false,erro:{motivo:'Erro no usuario ou senha'}}");
			}else{
				strSQL = 'SELECT COUNT(*) AS total FROM contas';
				cliente.query(
					strSQL,
					function (err, results2, fields){
						if(err){
							throw err;
						}
						//console.dir(results2);
						if(!results2.length){
							res.write("{success:false,erro:{motivo:'Erro'}}");
						}else{
							var total = results2[0].total;
							res.write("{success:true, total:"+total+",data:"+JSON.stringify(results)+"}");
						}
						res.end();
					});
			}
		}
	)
});

app.post('/usuarios/insert', function (req, res) {
	var data = JSON.parse(req.param('data'));
		
		var strNome = data.nmUsuario,
			strEmail = data.dsEmail,
			strSenha = data.dsSenha;
		
		var strSQL = "INSERT INTO usuario (nmUsuario, dsEmail, dsSenha) VALUES ('"+strNome+"','"+strEmail+"','"+strSenha+"')";
		
	cliente.query(
		strSQL,
		function (err, results, fields){
			if(err){
				throw err;
			}
			//console.dir(results);
			/*if(!results.length){
				res.write("{success:false,message:'Erro ao salvar no banco de dados!'}");
			}else{*/
				//data.idUsuario = ;
				res.write("{success:true, message:'Registro salvo com sucesso!',data:"+JSON.stringify(data)+"}");
			//}
			res.end();
		}
	)
});

app.post('/usuarios/update', function (req, res) {
	var data = JSON.parse(req.param('data'));
		
		var idUsuario = data.idUsuario,
			strNome = data.nmUsuario,
			strEmail = data.dsEmail,
			strSenha = data.dsSenha;
		
		var strSQL = "UPDATE usuario SET nmUsuario = '"+strNome+"', dsEmail = '"+strEmail+"', dsSenha = '"+strSenha+"' WHERE idUsuario = '"+idUsuario+"' ";
		
	cliente.query(
		strSQL,
		function (err, results, fields){
			if(err){
				throw err;
			}
			//console.dir(results);
			/*if(!results.length){
				res.write("{success:false,message:'Erro ao salvar no banco de dados!'}");
			}else{*/
				//data.idUsuario = ;
				res.write("{success:true, message:'Registro(s) salvo(s) com sucesso!',data:"+JSON.stringify(data)+"}");
			//}
			res.end();
		}
	)
});

app.post('/usuarios/delete', function (req, res) {
	var data = JSON.parse(req.param('data'));
		
	if(Array.isArray(data)){
		for(i in data){
			var idUsuario = data[i].idUsuario;
			
			var strSQL = "DELETE FROM usuario WHERE idUsuario = '"+idUsuario+"'";
			
		cliente.query(
			strSQL,
			function (err, results, fields){
				if(err){
					throw err;
				}
				//console.dir(results);
				/*if(!results.length){
					res.write("{success:false,message:'Erro ao excluir do banco de dados!'}");
				}else{*/
					//data.idUsuario = ;
					res.write("{success:true, message:'Registro(s) excluído(s) com sucesso!',data:"+JSON.stringify(data)+"}");
				//}
				//res.end(); como executar este res.end() dentro do for assincono?
			}
		)
		}
	}else{
		var idUsuario = data.idUsuario;
		
		var strSQL = "DELETE FROM usuario WHERE idUsuario = '"+idUsuario+"'";
		
	cliente.query(
		strSQL,
		function (err, results, fields){
			if(err){
				throw err;
			}
			//console.dir(results);
			/*if(!results.length){
				res.write("{success:false,message:'Erro ao excluir do banco de dados!'}");
			}else{*/
				//data.idUsuario = ;
				res.write("{success:true, message:'Registro excluído com sucesso!',data:"+JSON.stringify(data)+"}");
			//}
			res.end();
		}
	);
	}
});

//Contas
app.post('/contas/insert', function (req, res) {
	var data = JSON.parse(req.param('data'));
		
		var strNome = data.dsDescricao,
			fgTipo = data.fgTipo,
			conta_id = data.conta_id;
		
		var strSQL = "INSERT INTO contas (dsDescricao, fgTipo, conta_id) VALUES ('"+strNome+"', '"+fgTipo+"', '"+conta_id+"')";
		
	cliente.query(
		strSQL,
		function (err, results, fields){
			if(err){
				throw err;
			}
			//console.dir(results);
			/*if(!results.length){
				res.write("{success:false,message:'Erro ao salvar no banco de dados!'}");
			}else{*/
				//data.idUsuario = ;
				res.write("{success:true, message:'Registro salvo com sucesso!',data:"+JSON.stringify(data)+"}");
			//}
			res.end();
		}
	)
});

app.post('/contas/update', function (req, res) {
	var data = req.param('data');
		
		var idConta = req.param('idConta'),
			strNome = req.param('dsDescricao'),
			fgTipo = req.param('fgTipo'),
			conta_id = req.param('conta_id');
		
		var strSQL = "UPDATE contas SET dsDescricao = '"+strNome+"', fgTipo = '"+fgTipo+"', conta_id = '"+conta_id+"'  WHERE idConta = '"+idConta+"' ";
		
	cliente.query(
		strSQL,
		function (err, results, fields){
			if(err){
				throw err;
			}
			//console.dir(results);
			/*if(!results.length){
				res.write("{success:false,message:'Erro ao salvar no banco de dados!'}");
			}else{*/
				//data.idUsuario = ; //como recuperar o id inserido?
				res.write("{success:true, message:'Registro(s) salvo(s) com sucesso!',data:"+JSON.stringify(data)+"}");
			//}
			res.end();
		}
	)
});

app.post('/contas/delete', function (req, res) {
	var data = req.param('id');
		//console.dir(data);
	if(Array.isArray(data)){
		for(i in data){
			var idConta = data[i];
			
			var strSQL = "DELETE FROM contas WHERE idConta = '"+idConta+"'"; 
			
		cliente.query(
			strSQL,
			function (err, results, fields){
				if(err){
					throw err;
				}
				//console.dir(results);
				/*if(!results.length){
					res.write("{success:false,message:'Erro ao excluir do banco de dados!'}");
				}else{*/
					//data.idUsuario = ;
					res.write("{success:true, message:'Registro(s) excluído(s) com sucesso!',data:"+JSON.stringify(data)+"}");
				//}
				//res.end(); //como executar este res.end() dentro do for assincono?
			}
		)
		}
	}else{
			var idConta = data;
			
			var strSQL = "DELETE FROM contas WHERE idConta = '"+idConta+"'"; 
		
	cliente.query(
		strSQL,
		function (err, results, fields){
			if(err){
				throw err;
			}
			//console.dir(results);
			/*if(!results.length){
				res.write("{success:false,message:'Erro ao excluir do banco de dados!'}");
			}else{*/
				//data.idConta = ; //como recuperar o id inserido?
				res.write("{success:true, message:'Registro excluído com sucesso!',data:"+JSON.stringify(data)+"}");
			//}
			res.end();
		}
	);
	}
});

//Fluxo
app.post('/fluxos/insert', function (req, res) {
	var data = JSON.parse(req.param('data'));
		
		var idConta = data.conta_id,
			strNome = data.dsDescricao,
			strValor = data.NuValor,
			dtFluxo =  data.dtFluxo;
		
		var strSQL = "INSERT INTO fluxo ";
			strSQL += " (conta_id, dsDescricao, NuValor, dtFluxo) "; 
			strSQL += "VALUES ('"+idConta+"', '"+strNome+"', '"+strValor+"', '"+dtFluxo+"')";
		
	cliente.query(
		strSQL,
		function (err, results, fields){
			if(err){
				throw err;
			}
			//console.dir(results);
			/*if(!results.length){
				res.write("{success:false,message:'Erro ao salvar no banco de dados!'}");
			}else{*/
				//data.idFluxo = ;//como recuperar o id inserido?
				res.write("{success:true, message:'Registro salvo com sucesso!',data:"+JSON.stringify(data)+"}");
			//}
			res.end();
		}
	)
});

app.post('/fluxos/update', function (req, res) {
	var idFluxo = req.param('idFluxo'),
		idConta = req.param('conta_id'),
		strNome = req.param('dsDescricao'),
		strValor = req.param('NuValor'),
		dtFluxo =  req.param('dtFluxo');
		
		var strSQL = "UPDATE fluxo SET "; 
			strSQL += "  dsDescricao 				= '"+strNome+"' ";
		strSQL += ", conta_id 	= '"+idConta+"'"; 
		strSQL += ", NuValor 				= '"+strValor+"'"; 
		strSQL += ", dtFluxo 					= '"+dtFluxo+"'";	
		strSQL += " WHERE idFluxo 			= '"+idFluxo+"' ";
		
	cliente.query(
		strSQL,
		function (err, results, fields){
			if(err){
				throw err;
			}
			//console.dir(results);
			/*if(!results.length){
				res.write("{success:false,message:'Erro ao salvar no banco de dados!'}");
			}else{*/
				//data.idUsuario = ;
				res.write("{success:true, message:'Registro(s) salvo(s) com sucesso!'}");
			//}
			res.end();
		}
	)
});

app.post('/fluxos/delete', function (req, res) {
	var data = req.param('id');
		//console.dir(data);
	if(Array.isArray(data)){
		for(i in data){
			var idFluxo = data[i];
			
			var strSQL = "DELETE FROM fluxo WHERE idFluxo = '"+idFluxo+"'";
			
		cliente.query(
			strSQL,
			function (err, results, fields){
				if(err){
					throw err;
				}
				//console.dir(results);
				/*if(!results.length){
					res.write("{success:false,message:'Erro ao excluir do banco de dados!'}");
				}else{*/
					//data.idUsuario = ;
					res.write("{success:true, menssage:'Registro(s) excluído(s) com sucesso!',data:"+JSON.stringify(data)+"}");
				//}
				//res.end(); como executar este res.end() dentro do for assincono?
			}
		)
		}
	}else{
			var idFluxo = data;
			
			var strSQL = "DELETE FROM fluxo WHERE idFluxo = '"+idFluxo+"'";
		
	cliente.query(
		strSQL,
		function (err, results, fields){
			if(err){
				throw err;
			}
			//console.dir(results);
			/*if(!results.length){
				res.write("{success:false,message:'Erro ao excluir do banco de dados!'}");
			}else{*/
				//data.idUsuario = ;
				res.write("{success:true, menssage:'Registro excluído com sucesso!',data:"+JSON.stringify(data)+"}");
			//}
			res.end();
		}
	);
	}
});

//Grafico
app.get('/graficoContas/grafico', function (req, res) {
		var strSQL = "SELECT 	  COUNT( a.idFluxo ) AS total"+
"							, c.dsDescricao AS descricao   "+
"						   FROM "+
"								fluxo a "+
"					 INNER JOIN "+
"								contas c "+
"							 ON "+
"								a.conta_id = c.idConta"+
"					   GROUP BY "+
"								c.dsDescricao";
		
	cliente.query(
		strSQL,
		function (err, results, fields){
			if(err){
				throw err;
			}
			//console.dir(results);
			if(!results.length){
				res.write("{success:false,erro:{motivo:'Erro no usuario ou senha'}}");
			}else{
				res.write("{success:true,data:"+JSON.stringify(results)+"}");
			}
			res.end()
		}
	)
});

app.listen(2000);
console.log("Express server listening on port 2000");