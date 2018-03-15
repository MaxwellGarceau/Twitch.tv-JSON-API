       var emptyArr = [];
       // Tabs Setup
       function openTab(evt, tabName) {
           // Variables
           var i, tabcontent, tablinks;
           // Get all elements with class="tabcontent" and hide them  
           tabcontent = document.getElementsByClassName("tabcontent");
           for (i = 0; i < tabcontent.length; i++) {
               tabcontent[i].style.display = "none";
           }
           // Get all elements with class="tablinks" and remove the class "active"
           tablinks = document.getElementsByClassName("tablinks");
           for (i = 0; i < tablinks.length; i++) {
               tablinks[i].className = tablinks[i].className.replace(" active", "");
           }
           // Show the current tab, and add an "active" class to the button that opened the tab
           document.getElementById(tabName).style.display = "block";
           evt.currentTarget.className = +" active";
       }
       // JSON Request
       $(document).ready(function() {
           var test;
           var fccArray = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
           // All Array  
           var resultArrJoin;
           // Online Array  
           var emptyOnlineArr = [];
           var resultOnlineArrJoin;
           // Offline Array  
           var emptyOfflineArr = [];
           var resultOfflineArrJoin;
           // Twitch Variables
           var onlineOfflineStatus;
           var twitchName;
           var twitchStreamURL;
           var twitchGame;
           var twitchIcon;
           for (i = 0; i < fccArray.length; i++) {
               ajaxRequest(fccArray[i]);
           }

           function ajaxRequest(arr) {
               $.ajax({
                   type: 'GET',
                   url: "https://wind-bow.glitch.me/twitch-api/streams/" + arr,
                   dataType: 'jsonp',
                   success: function(twitchData) {
                       if (twitchData.stream === null) {
                           $.ajax({
                               type: 'GET',
                               url: "https://wind-bow.glitch.me/twitch-api/channels/" + arr,
                               dataType: 'jsonp',
                               success: function(twitchChannelData) {
                                   twitchName = arr;
                                   onlineOfflineStatus = "<span style=\"color: red; font-size: 4vmin;\"> &#10005; </span>";
                                   twitchStreamURL = twitchChannelData.url;
                                   twitchGame = "";
                                   twitchIcon = twitchChannelData.logo;
                                   // Offline Tab   
                                   emptyOfflineArr.push("<div class=\"twitch-well wrapper\">" + "<a href=" + twitchStreamURL + " target=\"_blank\">" + "<li>" + "<img src =" + twitchIcon + " alt=\"Twitch Icon\">" + "<span class=\"twitch-name\">" + twitchName + "</span>" + "&nbsp;" + "<span class=\"channel-status\">" + onlineOfflineStatus + "</span>" + "<br>" + "<div class=\"channel-description\">" + "<span style=\"margin-left: 28px;\">" + twitchGame + "</span>" + "</div>" + "</li>" + "</a>" + "</div>");
                                   resultOfflineArrJoin = emptyOfflineArr.join('');
                                   document.getElementById("Offline-list").innerHTML = resultOfflineArrJoin;
                                   // Offline section of the "All" tab     
                                   emptyArr.push("<div class=\"twitch-well\">" + "<a href=" + twitchStreamURL + " target=\"_blank\">" + "<li>" + "<img src =" + twitchIcon + " alt=\"Twitch Icon\">" + "<span class=\"twitch-name\">" + twitchName + "</span>" + "&nbsp;" + "<span class=\"channel-status\">" + onlineOfflineStatus + "</span>" + "<br>" + "<div class=\"channel-description\">" + "<span style=\"margin-left: 28px;\">" + twitchGame + "</span>" + "</div>" + "</li>" + "</a>" + "</div>");
                                   // All tab   
                                   resultArrJoin = emptyArr.join('');
                                   document.getElementById("All-list").innerHTML = resultArrJoin;
                               }
                           });
                       } else {
                           twitchName = arr;
                           onlineOfflineStatus = "<span style=\"color: green; font-size: 4vmin;\"> &#10003; </span>";
                           twitchStreamURL = twitchData.stream.channel.url;
                           twitchGame = twitchData.stream.channel.game;
                           twitchIcon = twitchData.stream.channel.logo;
                           // Online Tab           
                           emptyOnlineArr.push("<div class=\"twitch-well\">" + "<a href=" + twitchStreamURL + " target=\"_blank\">" + "<li>" + "<img src =" + twitchIcon + " alt=\"Twitch Icon\">" + "<span class=\"twitch-name\">" + twitchName + "</span>" + "&nbsp;" + "<span class=\"channel-status\">" + onlineOfflineStatus + "</span>" + "<br>" + "<div class=\"channel-description\">" + "<span style=\"margin-left: 28px;\">" + twitchGame + "</span>" + "</div>" + "</li>" + "</a>" + "</div>");
                           resultOnlineArrJoin = emptyOnlineArr.join('');
                           document.getElementById("Online-list").innerHTML = resultOnlineArrJoin;
                           // Online section of "All" category      
                           emptyArr.push("<div class=\"twitch-well\">" + "<a href=" + twitchStreamURL + " target=\"_blank\">" + "<li>" + "<img src =" + twitchIcon + " alt=\"Twitch Icon\">" + "<span class=\"twitch-name\">" + twitchName + "</span>" + "&nbsp;" + "<span class=\"channel-status\">" + onlineOfflineStatus + "</span>" + "<br>" + "<div class=\"channel-description\">" + "<span style=\"margin-left: 28px;\">" + twitchGame + "</span>" + "</div>" + "</li>" + "</a>" + "</div>");
                       }
                   }
               });
           }
       });