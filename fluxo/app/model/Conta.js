Ext.define('EIA.model.Conta', {
    extend	: 'Ext.data.Model',
    idProperty  : 'idConta',		
    fields: [
    {
       name : 'idConta',
       type : 'int'
    }, 
    {
        name : 'dsDescricao',
	type : 'string'
    },
    {
        name : 'fgTipo',
        type : 'int'
    }
    ]
});
Ext.define('EIA.model.Conta', {
    extend	: 'Ext.data.Model',
    idProperty  : 'idConta',		
    fields: [
    {
       name : 'idConta',
       type : 'int'
    }, 
    {
        name : 'dsDescricao',
	type : 'string'
    },
    {
        name : 'conta_id',
        type : 'int'
    },
    {
        name : 'fgTipo',
        type : 'int'
    }
    ]
});
