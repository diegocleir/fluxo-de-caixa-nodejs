Ext.ns('Ext.ux');

Ext.ux.MessageBox = function(){
    var msgCt;

    function createBox(config){
        return [
        '<div class="flash">',
        '<table class="box ' + config.type + '" cellspacing="0" cellpadding="0" style="width:' + config.width + '">',
        '<tr><td class="lt"></td><td class="ct"></td><td class="rt"></td></tr>',
        '<tr><td class="lm" valign="middle" align="center"><div class="icon"></div></td>',
        '<td class="cm" align="center" valign="middle">',
        '<div class="msg"><h3>' + config.title + '</h3><p>' + config.msg + '</p></div>',
        '<td class="rm"></td></tr>',
        '<tr><td class="lb"></td><td class="cb"></td><td class="rb"></td></tr>',
        '</table>'
        ,'</div>'
        ].join('');
    }
    return {
        flash : function(config){
            
            Ext.applyIf(config,{
                msg: 'Text',
                title: '',
                type: 'info',
                time: 1500,
                msgStyle: '',
                width: 274
            });
            
            if (config.width < 274){
                config.width = 274;
            }
            
            if(!msgCt){
                msgCt = Ext.core.DomHelper.insertFirst(document.body, {
                    id:'msg-flash', 
                    align: 'center'
                }, true);
            }
            
            var m = Ext.core.DomHelper.append(msgCt, createBox(config), true);
            
            m.hide();
            m.slideIn('t').ghost("t", {
                delay: config.time, 
                remove: true
            });
        }

    };
}();

Ext.ux.Msg = Ext.ux.MessageBox;