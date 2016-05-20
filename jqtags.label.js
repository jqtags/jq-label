_tag_('jqtags.label', function(date) {

    var CHARS = {
        "lowerLetter": "abcdefghijklmnopqrstuvwxyz",
        "upperLetter": "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        "symbol": ",.?/\\(^)![]{}*&^%$#'\"",
        "number": "0123456789",
        "space": " "
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
            }
        },
        attachedCallback: function() {
            this.setlabel(this.$.label);
        },
        textOnChange: function(key, old, newval) {
            this.setlabel(newval);
        },
        setlabel: function(newval) {
            if (this.$.animation === 'shuffle') {
                var str = newval.split('');
                this.types = [];
                this.letters = [];
                // Looping through all the chars of the string
                for (var i = 0; i < str.length; i++) {
                    var ch = str[i];
                    if (ch == " ") {
                        this.types[i] = "space";
                    } else if (/[0-9]/.test(ch)) {
                        this.types[i] = "number";
                    } else if (/[a-z]/.test(ch)) {
                        this.types[i] = "lowerLetter";
                    } else if (/[A-Z]/.test(ch)) {
                        this.types[i] = "upperLetter";
                    } else {
                        this.types[i] = "symbol";
                    }
                    this.letters.push(i);
                }
                this.animate();
            } else {
                this.$.innerHTML = newval;
            }
        },
        animate: function(_count) {
            var self = this;
            var count = _count || 5;
            window.clearTimeout(this.timer);
            self.$.innerHTML = self.shuffle();
            this.timer = window.setTimeout(function() {
                if (count === 1) {
                    self.$.innerHTML = self.$.label;
                } else {
                    self.animate(--count);
                }
            }, 50);
        },
        randomChar: function(type) {
            var arr = CHARS[type] || CHARS.symbol;
            return arr[Math.floor(Math.random() * arr.length)];
        },
        shuffle: function() {
            var str = [];
            for(i=0; i < this.letters.length; i++){
                str.push(this.randomChar(this.types[this.letters[i]]));
            }
            return str.join("");
        }
    };

})
;
