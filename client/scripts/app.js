// YOUR CODE HERE:

var App = function() {
  this.messagePool = [];
  this.currentMessage = '';
  this.currentRoom = 'lobby';
  this.userName = function () {
    var string = window.location.search;
    var cutPlace = string.indexOf('username=');
    var userName = string.slice(cutPlace + 9);
    return userName;
  }();
};


console.log('THIS', window.location.search);



var app = new App();
// app.username = username();

App.prototype.init = function() {};

App.prototype.updateRoom = function() {
  app.currentRoom = $('#roomsList option:selected').val();
  console.log('current room = ', app.currentRoom);
};



App.prototype.send = function(message) {
    
  var that = app;
  app.currentMessage = $('#currentMessageBox').val();
  console.log(app.currentMessage);
  console.log('app = ', app);
  //document.getElementById('messageBoxForm').reset();  //<-- THIS THREW SOME ERRORS IN MOCHA & ALSO NEEDS DOC GETELEBYID FOR SOME REASON?

  var messageToSend = {
    roomname: app.currentRoom, 
    text: app.currentMessage,
    userName: app.userName
  };

  if (message) { messageToSend = message; } 


  //if (message) { messageToSend = message; }
  // console.log('TEST MESSAGE TO SEND = ', testMessage);
  // console.log('appSSS = ', app);

  $.ajax({
    // app is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: JSON.stringify(messageToSend),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: messages sent');
      console.log(data);
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to post message', data);
    } 
  });
};


//App.prototype.




//Server: http://parse.sfm6.hackreactor.com/
$('document').ready(function() {
  var currentMessage = '';
  var messagePool = [];

  $('#submitMessage').on('click', app.send);
  $('#updateRoom').on('click', app.updateRoom);

/////
// $('document').ready(function() {
//   var currentMessage = '';
//   var messagePool = [];

//   $('#submitMessage').on('click', function() {
//     //console.log('submit works');
//     currentMessage = $('#currentMessageBox').val();
//     console.log(currentMessage);
//     document.getElementById('messageBoxForm').reset();
//   });


/////





  $('#getMessagePool').on('click', function() {
    console.log('get messages from server works');

    //GET AJAX FOR MESSAGES
    // $.ajax({
    //   // This is the url you should use to communicate with the parse API server.
    //   url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
    //   type: 'GET',
    //   //data: JSON.stringify(message),
    //   contentType: 'application/json',
    //   success: function (data) {
    //     console.log('chatterbox: messages received');
    //     console.log(data);
    //   },
    //   error: function (data) {
    //     // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    //     console.error('chatterbox: Failed to get messages', data);
    //   }
    // });
                                                              
    $.get('http://parse.sfm6.hackreactor.com/chatterbox/classes/messages', function (data, status) { 
      console.log('DATA = ', data.results, 'STATUS = ', status); 
      //window.messagePool = data;
      console.log('LAST ONE = ', data.results[data.results.length - 1]);
      for (var i = 0; i < 21; i++) {
        messagePool.push(data.results[i]);
        var $message = $('<div class="specificMessage></div>');
        var $messageText = $('<p class="messageText"></p>');
        var $date = $('<p class="date"></p>');
        var $time = $('<p class="time"></p>');
        var $userName = $('<p class="userName></p>');
        $messageText.text(data.results[i].text);
        $date.text(data.results[i].createdAt);
      } 
      console.log('LAST 20 POOL = ', messagePool);
    });
    
    console.log('MESSAGEPOOL', messagePool);
  });


});

