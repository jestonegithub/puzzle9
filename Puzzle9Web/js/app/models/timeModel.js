/**
 * Created by jessestone on 12/15/15.
 */

define(function (require) {
    var bb = require('backbone');
    var mn = require('marionette');
    var  _ = require('underscore');




    // there is TERMINAL and also a Hacker console - both sub-classes of this broader Console class of Model
    var TimeModel = bb.Model.extend({

        //all terminals have: title bar, text display area and text input area
        defaults:{

            global_increment:1000, // length of a global (fundamental) 'tick' in milliseconds
            global_time:0, // unit time determined by the interval (i.e., 1 unit = 1000ms if interval=1000ms)
            game_date:0, //game_date is just total # of days passed, starting with 0
            game_date_duration:10, // # of global units per day
            delta_time:1,
            callBackList:{}


        },

        initialize:function(){

            this.on('change:global_time',this.launch_callBacks,this);

        },

        //Callback methods...

        launch_callBacks:function(){

            var callBackList = this.get('callBackList');
            var global_t = this.get('global_time');

            for (var name in callBackList) {
                if (callBackList.hasOwnProperty(name)) {
                    if ((global_t-callBackList[name]['start'])%callBackList[name]['interval'] === 0) {
                        console.log('calling:'+name);
                        if (callBackList[name]['arg'] != undefined) {
                            callBackList[name]['callback'](callBackList[name]['arg']);
                        }
                        else {
                            callBackList[name]['callback']();
                        }
                    }
                }
            }
        },

        addToList : function(name,arr,update_interval,arg) {
            var callBackList = this.get('callBackList');
            var global_t = this.get('global_time');
            callBackList[name] = {callback: arr, start: global_t, interval: update_interval,arg:arg};
            console.log(callBackList);
        },


        removeFromList : function(name) {
            var callBackList = this.get('callBackList');
            delete callBackList[name];
        },





        startTime: function(){

           var increment = this.get('global_increment');
           var cur_time,delta,game_date,game_dur;
            //console.log(increment);

           setInterval(_.bind(function(){

               delta = this.get('delta_time');
               cur_time = this.get('global_time');
               game_date = this.get('game_date');
               game_dur = this.get('game_date_duration');

               this.set({'global_time': cur_time + delta});
               if (cur_time%game_dur === 0){this.set({'game_date':game_date+1})}

           },this),increment);

        },

        pauseTime: function(){
            this.set({'delta_time' :0});
        },

        restartTime: function(){

            this.set({'delta_time' : 1});

        },

        //UTILITIES for Time...

        //method to convert seconds to global units
        convertTime : function(seconds) {
            return Math.floor((1000/interval) * seconds);
        }



    });


    var Timer = new TimeModel();


    return {Timer:Timer}


});