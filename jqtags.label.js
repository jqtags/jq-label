_tag_('jqtags.label', function (date) {

    return {
        tagName: "jq-label",
        events: {
        },
        accessors: {
            label : {
                type: "string",
                default: "",
                onChange : "textOnChange"
            },
            animation : {
                type: "string",
                default: "shuffle",
                onChange : "textOnChange"
            }
        },
        attachedCallback: function () {
            this.setlabel(this.$.label);
        },
        textOnChange : function(key,old,newval){
            this.setlabel(newval);
        },
        setlabel : function(newval){
            if(this.$.animation === 'shuffle'){
                this.animate(newval);
            } else {
                this.$.innerHTML = newval;
            }
        },
        animate : function(newval,_count){
            var self = this;
            if(newval === ""){
                self.$.innerHTML = newval;
                return;
            }
            var count = _count || 5;
            var tens = Math.pow(10,(newval+"").length);
            window.clearTimeout(this.timer);
            self.$.innerHTML = Math.round((Math.random()*tens));
            this.timer = window.setTimeout(function(){
                if(count === 1){
                    self.$.innerHTML = newval;
                } else {
                    self.animate(newval,--count);
                }
            },50);
        }
    };

});
