Ext.define('EIA.store.Usuarios', {
		extend     : 'Ext.data.Store',
		model      : 'EIA.model.Usuario',
		//autoLoad   : false,
                autoLoad: {start: 0, limit: 10},
		remoteSort : false,
		//pageSize   : 3,
		proxy      : {
			simpleSortMode : true,
			type           : 'ajax',
			api            : {
				read    : 'http://localhost:2000/usuarios/list',
				create  : 'http://localhost:2000/usuarios/insert',
				update  : 'http://localhost:2000/usuarios/update',
				destroy : 'http://localhost:2000/usuarios/delete'
			},
		actionMethods : {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST' 		
		},
		reader : {
			type 			: 'json',
			root 			: 'data',
			successProperty : 'success'		
		},
		writer : {
			type 			: 'json',
			writeAllFields  : true,
            encode          : true,
            root            : 'data'			
		},
		extraParams : 
		{
			limit : 'limit', 
			sort  : 'idUsuario',
			dir   : 'ASC',
			total : 'total'
		}, 
		listeners : {
			exception : function(proxy, response, operation)
			{
				Ext.MessageBox.show({
					title   : 'Erro no proxy',
					msg     : operation.getError(), 
					icon    : Ext.MessageBox.ERROR,
					buttons : Ext.Msg.OK 
				
				});
			
			},
			write : function(proxy, operation){
				var obj = Ext.decode(operation.response.responseText);
				
				if(obj.success)
				{
					Ext.ux.Msg.flash({
						msg  : obj.message,
						type : 'success' 
					});
				}
				else
				{
						Ext.ux.Msg.flash({
						msg  : obj.message,
						type : 'error' 
					});
				}
			}                        
		}
	}	
});