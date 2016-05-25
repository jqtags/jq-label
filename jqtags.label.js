_tag_('jqtags.label', function(date) {

    var CHARS = {
        "lowerLetter": "abcdefghijklmnopqrstuvwxyz",
        "upperLetter": "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        "symbol": "?/\\(^)![]{}*&^%$#'\"",
        "number": "0123456789",
        "space": " ",
        "decimal": ".",
        "comma": ","
    };

    for (var i in CHARS) {
        CHARS[i] = CHARS[i].split('');
    }

    return {
        tagName: "jq-label",
        events: {
        },
        accessors: {
            label: {
                type: "string",
                default: "",
                onChange: "textOnChange"
            },
            animation: {
                type: "string",
                default: "shuffle",
                onChange: "textOnChange"
            },
            steps: {
                type: "int",
                default: 25
            },
            delay : {
                type: "int",
                default: 100
            }
        },
        attachedCallback: function() {
            this.setlabel(this.$.label,"");
        },
        textOnChange: function(key, old, newval) {
            this.setlabel(newval,old);
        },
        setlabel: function(newval,oldval) {
            if (this.$.animation.indexOf('shuffle') === 0) {
                var str = newval.split('');
                this.types = [];
                this.letters = str;
                // Looping through all the chars of the string
                for (var i = 0; i < str.length; i++) {
                    var ch = str[i];
                    if (ch == " ") {
                        this.types[i] = "space";
                    } else if (/[0-9]/.test(ch)) {
                        this.types[i] = "number";
                    } else if ("." === ch) {
                        this.types[i] = "decimal";
                    } else if ("," === ch) {
                        this.types[i] = "comma";
                    } else if (/[a-z]/.test(ch)) {
                        this.types[i] = "lowerLetter";
                    } else if (/[A-Z]/.test(ch)) {
                        this.types[i] = "upperLetter";
                    } else {
                        this.types[i] = "symbol";
                    }
                }
                if(this.$.animation === "shuffle-order"){
                    this.order_asc = (newval>oldval);
                } else if(this.$.animation === "shuffle-up"){
                    this.order_asc = true;
                } else if(this.$.animation === "shuffle-down"){
                    this.order_asc = false;
                }
                this.animate();
            } else {
                this.$.innerHTML = newval;
            }
        },
        animate: function(_count) {
            var self = this;
            var count = _count || 0;
            window.clearTimeout(this.timer);
            self.$.innerHTML = self.shuffle(_count);
            this.timer = window.setTimeout(function() {
                if (count === self.$.steps) {
                    self.$.innerHTML = self.$.label;
                } else {
                    self.animate(++count);
                }
            }, self.$.delay/(self.$.steps-_count+1));
        },
        randomChar: function(type,counter,i) {
            var arr = CHARS[type] || CHARS.symbol;
            if(this.order_asc === true){
                var len = counter < arr.length ? counter : (arr.length-1);
                return arr[len] > this.letters[i] ? this.letters[i] : arr[len];
            } else if(this.order_asc === false){
                counter = arr.length - Math.min(counter,arr.length);
                var len2 = counter < arr.length ? counter : (arr.length-1);
                return arr[len2] < this.letters[i] ? this.letters[i] : arr[len2];
            }
            return arr[Math.floor(Math.random() * arr.length)];
        },
        shuffle: function(_count) {
            var str = [];
            for (i = 0; i < this.types.length; i++) {
                str.push(this.randomChar(this.types[i],_count,i));
            }
            return str.join("");
        }
    };

});
