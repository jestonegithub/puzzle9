/**
 * Created by jessebstone on 2/9/15.
 */

define ( function(){

    // The timer module does the following:

    //  - initializes, updates and tracks a 'global' 'unit time' (or time cycle) determined by the setInterval "interval" - provides a conversion to seconds
    //  - initializes, updates and tracks the day, date, month and year  based on a conversion of 'unit time' to 'date' (day is a lookup)
    //  - tracks a callBackList that other functions can register with, and which get called back each cycle;
    



   //Interval variable and getter
    var interval = 1000; // interval in milliseconds
   // var loopID;

    var getInterval = function () {

        return interval;

    };



    // DATE -----------------------------------------

    var global_time=0; // unit time determined by the interval (i.e., 1 unit = 1000ms if interval=1000ms)
    var game_date=0; //game_date is just total # of days passed, starting with 0
    var game_date_duration=10; // # of global units per day



    var day;
    var date;
    var month;
    var year;


    var get_game_date = function(){

      return game_date;

    };






    // object listing [registering modules, callback functions] - elements assigned a name by module
    // objects will register as so: {name: {function: func, start: start_time, interval: update_interval, arg: arg}}
       // arg is any argument you want to apply to the func at callback time

    var callBackList = {};

    var start_time;

    var addToList = function(name,arr,update_interval,arg) {
        start_time=global_time;
        callBackList[name] = {callback: arr, start: start_time, interval: update_interval,arg:arg};
        console.log(callBackList);
    };


    var removeFromList = function(name) {
        delete callBackList[name];
    };


    // function that calls all callbacks in list
    var updater = function() {
        //update global time & game date
        global_time+=1;
        if (global_time%game_date_duration === 0){game_date+=1;} //increments day based on game_date_duration

        for (var name in callBackList) {
            if (callBackList.hasOwnProperty(name)) {
                if ((global_time-callBackList[name]['start'])%callBackList[name]['interval'] === 0) {
                    if (callBackList[name]['arg'] != undefined) {
                    callBackList[name]['callback'](callBackList[name]['arg']);
                    }
                    else {
                    callBackList[name]['callback']();
                    }

                }

            }
        }



    };

    // function to run updater at set interval

    var looper = function() {

        loopID = setInterval(updater,interval);

    };



    // utility functions

    // this converts seconds into a number of units based on Interval of timer (e.g., if timer is called every 100ms,
    //   then 10s -> 100 timer units
    var convertTime = function(seconds) {

        return Math.floor((1000/interval) * seconds);

        

    };







    return { getInterval:getInterval,
            // getLoopID: getLoopID(),
             addToList:addToList,
             removeFromList:removeFromList,
             looper: looper,
             convertTime: convertTime,
            get_game_date:get_game_date

    }




});
