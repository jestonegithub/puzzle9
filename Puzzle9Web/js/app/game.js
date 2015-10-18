/**
 * Created by jessebstone on 2/2/15.
 */

define(['./textChunks','./cloudHack','progressbar'],function(textChunks,cloudHack,progressbar) {


    // initialization

    var init = function () {

                // TODO: Check for Save and Load Saved Games


        // bring up a start screen

// DEV ONLY - UNCOMMENT AFTER DEV
//       $('body').append('<div id=title_circle></div><div id=start_button></div>');
//
//       var title_circle = new progressbar.Circle('#title_circle', {
//            strokeWidth: 2,color: '#572c94', text:{value:'Puzzle9'},fill: 'rgba(255,255,255,1)'
//    });
//
//       var start_button = new progressbar.Circle('#start_button', {strokeWidth:1, color:'#572c94',text:{value:'Start Game'},fill:'#ffffff'});
//
//        $('#start_button').click(function(){
//
//            start_button.animate(1,function(){
//
//
//                $('#title_circle').remove();
//                //$('#start_button').hide();
//                start_button.destroy();
//
//
//                setTimeout(startGame,1000);
//
//            });
//           });
//
//        title_circle.animate(1);


        startGame();

            };






    var startGame = function(){

        // call cloud hack initialization and any timer or other general game stuff...




      cloudHack.init();





      //  // starts the timer
      //  timer.looper();




    };





    return {
        init:init
    }



    });