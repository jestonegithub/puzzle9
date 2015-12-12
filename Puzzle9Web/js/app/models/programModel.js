/**
 * Created by jessebstone on 11/30/15.
 */


/**
 * Created by jessebstone on 11/30/15.
 */

define(function (require) {
    var bb = require('backbone');
    var mn = require('marionette');



    // anything running in 'activity' region is a PROGRAM (the hacking program runs in activity region and also region 1
    //  I don't intend to use this class directly, but as a parent class to hold core elements of all programs
    var ProgramModel = bb.Model.extend({

        defaults: {

            installed: '',
            open: ''

        }
    });

    return {ProgramModel:ProgramModel}

});