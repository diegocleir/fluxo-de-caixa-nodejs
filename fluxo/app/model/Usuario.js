Ext.define('EIA.model.Usuario', {
		extend		: 'Ext.data.Model',
		idProperty  : 'idUsuario',				
		fields :[{
			name : 'idUsuario',
			type : 'int'		
		},
		{
			name : 'nmUsuario',
			type : 'string'
		},
		{
			name : 'dsEmail',
			type : 'string'
		},
		{
			name : 'dsSenha',
			type : 'string'
		}		
		]
}); 