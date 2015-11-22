/**
 * Created by jessebstone on 10/13/15.
 */

define(['./feed','./timer','./ewallet','./store','./rbn_ent'],function(feed,timer,ewallet,store,rbn_ent) {


    // info

    var rbn_info = {name: "Romanian Business Network",
                    handle: "@RBN",
                    billing_cost:5,
                    billing_cycle:10};

    var cue_thresholds = {

      btc_for_crypton: 2,  //need 10 btc to get alerted about crypton
        btc_for_ent: 4

    };

    // cue flags
    var cue_crypton = false;
    var cue_rbn_ent = false;


    // SCRIPT


    var tweets = {

        startup: {

            os_blurb: "All of our remote clients are now running our new Cryptonite OS",
            //btc_blurb: "Great article on the resiliency of bitcoin over at WSJ.  Preaching to the choir here.",
            btc_hint: "Want to get bitcoins?  For our clients, creating an account is as easy as 'install bit-o-matic'. "


        },

        crypton_hint: "We are proud to announce our new partnership with Cloud Awesome - a one stop shop for all your bitcoin mining " +
            "needs.  Just 'install crypton' to get our browser running and visit them today!",

        rbn_ent_hint: "At RBN we don't think building a business should be so hard.  That's why we've created RBN Entrepreneur.  It will be " +
        "automatically installed on all our remote clients during the next update."



    };


    // functionality

    var actions = {


        tweet:feed.tweet



    };

    //we create a cue function that will be called
    // at regular updates -

    var cue_rbn = function(){

        if ((ewallet.get_avail_btc() > cue_thresholds.btc_for_crypton) && (cue_crypton === false) ) {

            actions.tweet(rbn_info.handle,tweets.crypton_hint);
            cue_crypton = true;

        }


        if ((ewallet.get_avail_btc() > cue_thresholds.btc_for_ent) && (cue_rbn_ent === false) ) {

            actions.tweet(rbn_info.handle,tweets.rbn_ent_hint);
            cue_rbn_ent = true;
            console.log(cue_rbn_ent);


        }


    };

    // performance

    var init_actor = function(){

        // this starts the initial script when rbn is first called
        var i=0;
        for (var key in tweets['startup']) {

            var inter = function() {

                var key2=key;

                setTimeout(function () {
                    actions.tweet(rbn_info.handle, tweets['startup'][key2])
                }, i * 4000);
                i++;
            };

            inter();
        }

        // from this point forward all rbn actions are based on cues - so we register the cue_rbn function with timer
        timer.addToList('cue_rbn',cue_rbn,1);






    };


    return{init_actor:init_actor,
            cue_rbn_ent:cue_rbn_ent}



});