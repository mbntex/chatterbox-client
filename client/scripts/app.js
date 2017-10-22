// YOUR CODE HERE:

var App = function() {
  this.messagePool = [];
  this.currentMessage = '';
  this.currentRoom = 'Lobby';
  this.allRooms = {};
  this.userName = function () {
    var string = window.location.search;
    var cutPlace = string.indexOf('username=');
    var userName = string.slice(cutPlace + 9);
    return userName;
  }();
  this.messagePool = [];
  this.server = 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages';
  this.friends = [];
  this.addedrooms = [];
};


console.log('THIS', window.location.search);



var app = new App();
// app.username = username();

App.prototype.init = function() {};

App.prototype.updateRoom = function() {
  app.currentRoom = $('#roomsList option:selected').val();
  console.log('current room = ', app.currentRoom);
};


App.prototype.clearMessages = function () {
  $('#chats').html('');
};

App.prototype.renderRoom = function (room) {
  $('#roomsList').append('room');
};

App.prototype.fetch = function() {
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
                                                            
  $.get(app.server, {order: '-createdAt'}, function (data, status) { 
    // console.log('DATA QUERY SENDING = ', data);
    // var escapeText = function (dataReceived, arr) {
    app.clearMessages();

    // };
    // escape(data, ['<', '>', '(', ')']);
    // console.log('DATA = ', data.results, 'STATUS = ', status); 
    // data.results.unshift({text: '<script>alert("PWNED")</script>', createdAt: "", username: ""});
    console.log('LAST ONE = ', data.results[data.results.length - 1]);
    for (var i = 0; i < 21; i++) {
      //app.allRooms = {Lobby: "Lobby"};
      app.allRooms[data.results[i].roomname] = data.results[i].roomname;

      if (app.currentRoom === 'Lobby') {
        app.messagePool.push(data.results[i]);
        var $specificMessage = $('<div class="specificMessage"></div>');
        var $messageText = $('<p class="messageText"></p>');
        var $date = $('<p class="date"></p>');
        var $time = $('<p class="time"></p>');
        var $roomname = $('<p class="roomname"></p>');
        var $userName = $('<p class="userName"></p>');
        $messageText.text(data.results[i].text);
        if (app.friends.indexOf(data.results[i].username) > -1) {
          $messageText.css("font-weight", "Bold");
        }
        $date.text(data.results[i].createdAt);
        $userName.text(data.results[i].username);
        $roomname.text(data.results[i].roomname);
        $specificMessage.append($userName);
        $specificMessage.append($roomname);
        $specificMessage.append($date);
        $specificMessage.append($messageText);
        $('#chats').append($specificMessage);
      } else if (app.currentRoom === data.results[i].roomname) {
        app.messagePool.push(data.results[i]);
        var $specificMessage = $('<div class="specificMessage"></div>');
        var $messageText = $('<p class="messageText"></p>');
        var $date = $('<p class="date"></p>');
        var $time = $('<p class="time"></p>');
        var $roomname = $('<p class="roomname"></p>');
        var $userName = $('<p class="userName"></p>');
        $messageText.text(data.results[i].text);
        if (app.friends.indexOf(data.results[i].username) > -1) {
          $messageText.css("font-weight", "Bold");
        }
        $date.text(data.results[i].createdAt);
        $userName.text(data.results[i].username);
        $roomname.text(data.results[i].roomname);
        $specificMessage.append($userName);
        $specificMessage.append($roomname);
        $specificMessage.append($date);
        $specificMessage.append($messageText);
        $('#chats').append($specificMessage);
      }
    } 

    for (var k in app.allRooms) {
      if (app.addedrooms.indexOf(k) === -1) {
        app.addedrooms.push(k);
        var $newRoom = document.createElement('option');
        $newRoom.text = k;
        document.getElementById('roomsList').add($newRoom);
      }
    }
    console.log('LAST 20 POOL = ', app.messagePool);
    $('.userName').on('click', function() {
      app.friends.push(this.innerHTML);
    });
  });
  console.log('MESSAGEPOOL', app.messagePool);
};
  
App.prototype.renderMessage = function (message) {
  $('#chats').append('<div></div>');
};

App.prototype.send = function(message) {
  
  // app.currentMessage = $('#currentMessageBox').val();
  console.log(app.currentMessage);
  console.log('message = ', message);
  //document.getElementById('messageBoxForm').reset();  //<-- THIS THREW SOME ERRORS IN MOCHA & ALSO NEEDS DOC GETELEBYID FOR SOME REASON?

  // var messageToSend = {
  //   roomname: app.currentRoom, 
  //   text: app.currentMessage,
  //   userName: app.userName
  // };

  // if (message) { messageToSend = message; } 


  //if (message) { messageToSend = message; }
  // console.log('TEST MESSAGE TO SEND = ', testMessage);
  // console.log('appSSS = ', app);

  $.ajax({
    // app is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
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

  $('#submitMessage').on('click', function() {
    var $message = $('#currentMessageBox').val();
    var message = {
      roomname: app.currentRoom, 
      text: $message,
      username: app.userName
    }; 
    app.send(message); 
    document.getElementById('messageBoxForm').reset();
  });
  $('#updateRoom').on('click', function() {
    app.updateRoom();
    app.fetch();
  });

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


  $('#addRoom').on('click', function() {
    var $newRoom = document.createElement('option');
    $newRoom.text = $('#roomToAdd').val();
    document.getElementById('roomsList').add($newRoom);
    document.getElementById('roomBox').reset();
  });

  $('#deleteShownMessages').on('click', function() {
    app.clearMessages();
  });


  $('#getMessagePool').on('click', function() {
    app.fetch();
  });


});

