Ext.define('EIA.store.Contas', {
    extend		: 'Ext.data.Store',
    model		: 'EIA.model.Conta',    
    remoteSort	: false,    
    //autoLoad	: false,
    pageSize	: 10,
    autoLoad	: {start: 0, limit: 10},
   //Create, update, destroy, read 
    proxy		: {
        simpleSortMode	: true,
        type			: 'ajax',			
			api         : {
				read    : '/contas/list',
				create  : '/contas/insert',		
				update  : '/contas/update',						
				destroy : '/contas/delete'			
						  },
		actionMethods 	: {
				read	: 'POST',
				create	: 'POST',
				update	: 'POST',
				destroy : 'POST'		
						  },  
			reader		: {
				type		: 'json',
				root		: 'data',
            successProperty	: 'success'
        },
		writer			: {
            type			: 'json',
            writeAllFields	: true,
            encode			: true,
            root			: 'data'
        },
		extraParams: {             
            sort 	: 'idConta, dsDescricao',    
            dir 	: 'ASC'            
        }, 
        listeners: {
            exception: function(proxy, response, operation){
                Ext.MessageBox.show({
                    title: 'REMOTE EXCEPTION',
                    msg: operation.getError(),
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        }
    },
    listeners: {
        
        write: function(proxy, operation){
            
            var obj = Ext.decode(operation.response.responseText);
            
            if(obj.success){
                Ext.ux.Msg.flash({
                    msg: obj.message,
                    type: 'success'
                });
            }else{
                Ext.ux.Msg.flash({
                    msg: obj.message,
                    type: 'error'
                });
            }
        }
        
    }    
});