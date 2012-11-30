Ext.define('Ext.ux.plugin.FormEnter', {
    extend: 'Ext.AbstractPlugin',
    alias: 'plugin.formenter',
      
    init: function (form)
    {
        this.form = form;
        this.form.on('render', this.onFormRender, this);
    },
      
    onFormRender: function()
    {
        this.form.getEl().on('keyup', this.onFormElKeyUp, this)
    },
      
    onFormElKeyUp: function(e, el)
    {
        if (e.getKey() === e.ENTER) {
            var fields = this.form.getForm().getFields(),
            index  = fields.findIndex('name', el.getAttribute('name')),
            nField = null;
            
            do
            {
                nField = fields.getAt(e.hasModifier() ? --index : ++index);
            }
            while (!this.focusIf(nField, true, true) && index < fields.length && index >= 0)
        }
    },
      
    focusIf: function(field, select, delay) {
        if(!(Ext.isEmpty(field) || field.isHidden() || field.isDisabled() || field.isXType('hiddenfield')))
            return field.focus(select, delay);
        return false;
    }
})