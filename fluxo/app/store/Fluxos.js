Ext.define('EIA.store.Fluxos', {
    extend: 'Ext.data.Store',
    model: 'EIA.model.Fluxo',    
    remoteSort: false,    
    //autoLoad: false,
    pageSize: 10,
    autoLoad: {start: 0, limit: 10},
    proxy: {
        simpleSortMode: true,
        type: 'ajax',			
	api            : {
		read    : '/fluxos/list',
		create  : '/fluxos/insert',		
		update  : '/fluxos/update',						
		destroy : '/fluxos/delete'			
	},
	actionMethods : {
		read	: 'POST',
		create	: 'POST',
		update	: 'POST',
		destroy : 'POST'		
	},  
        reader: {
		type		: 'json',
		root		: 'data',
        successProperty	: 'success'
        },
	writer: {
            type			: 'json',
            writeAllFields      	: true,
            encode			: true,
            root			: 'data'
        },
	extraParams: {             
            sort 	: 'dsDescricao',    
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