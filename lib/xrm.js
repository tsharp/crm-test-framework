/*exported Xrm */

var Xrm = (function() {
    "use strict";

    function EntityAttribute() {
        this.getValue = function() { throw new Error("Not Implemented"); };
        this.setValue = function() { throw new Error("Not Implemented"); };
        this.getText = function() { throw new Error("Not Implemented"); };
        this.getSelectedOption = function() { throw new Error("Not Implemented"); };
    }

    function FormControl() {
        this.getVisible = function() { throw new Error("Not Implemented"); };
        this.setVisible = function() { throw new Error("Not Implemented"); };
        this.getControlType = function() { throw new Error("Not Implemented"); };
        this.getDisabled = function() { throw new Error("Not Implemented"); };
        this.setDisabled = function() { throw new Error("Not Implemented"); };
        this.getLabel = function() { throw new Error("Not Implemented"); };
        this.setLabel = function() { throw new Error("Not Implemented"); };
        this.getName = function() { throw new Error("Not Implemented"); };
        this.getParent = function() { throw new Error("Not Implemented"); };
        this.setFocus = function() { throw new Error("Not Implemented"); };
    }

    var Page = {
        getAttribute: function() { throw new Error("Not Implemented"); },
        getControl: function() { throw new Error("Not Implemented"); },

        data: {
            entity: {
                getEntityName: function() { throw new Error("Not Implemented"); },
                save: function() { throw new Error("Not Implemented"); },
                getId: function() { throw new Error("Not Implemented"); },
                getPrimaryAttributeValue: function() { throw new Error("Not Implemented"); },
            }
        },
        context: {

            client: { }
        }
    };

    var Utility = {

    };

    return {
        "Page": Page,
        "Utility": Utility
    };
})();