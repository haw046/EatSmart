/* Display habit list */
//$(window).load(
    /*
    var delay = 0; 
function slideIn(){
    $(this).style.opacity = 1; 
    $(this).animate({right: '0px'}, 750); 
}*/
    //var habitLists = document.getElementsByClassName('habit-item'); 

    //console.log(habitLists.length); 

    /*for (var i = 0; i < habitLists.length; i++){  
        habitList[i].style.opacity = 1; 
        $(habitList[i]).delay(delay).animate({right: '0px'}, 750); 
        delay+=100; 
}*/
//function slideIn() {
    //var habitList = document.getElementById('habit-list').children.length;
    /*
    var habitList = $('#habit-list').children()['prevObject'][0]['children']; 


    console.log("slide");
    console.log(habitList);

    var j = 0; 

    console.log(habitList.length);
/*
    for (child in habitList){
        console.log(child); 
        child.style.opacity = 1; 
        $(child).delay(delay).animate({right: '0px'}, 750); 
        delay+=100; 
    }
*/
/*
    for (var j = 0; j < habitList.length; j++){
        console.log("loop");
        habitList[j].style.opacity = 1; 
        $(habitList[j]).delay(delay).animate({right: '0px'}, 750); 
        delay+=100; 
    }
    console.log("end"); 

    /*
    var habitList = document.getElementById('habit-list').children;
    console.log(habitList);

    for (var i = 0; i < habitList.length; i++){
        habitList[i].style.right = '1500px';
    }

    // Add transition*/
//}); 

function displayHabits (name, text) {
    $('<div/>').text(text).prepend($('<em/>').text(title+': ')).appendTo($('#messagesDiv'));
    $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
};

function updateProgress(element, int) {
    var msgElement = (element.parentNode.parentNode.getElementsByClassName("message-today"))[0];
    $(msgElement).animate({opacity: 1}, 300); 

    //Progress bar animation 
    var progress = element.parentNode.parentNode.getElementsByClassName('progress');
    var oldx2 = progress[0].getAttribute('x2'); 

    var bar = element.parentNode.parentNode.getElementsByClassName('bar');
    var oldx1 = bar[0].getAttribute('x1'); 
    
    int++;

    // Animates from current location on the bar 
    $({x2:oldx2}).animate(
        {x2: (Number(oldx2) + 5) + 'px'},
        {
            duration:200,
            step:function(now){$(progress).attr('x2', now);
            queue: false; 
        }
    });

    $({x1:oldx1}).animate(
        {x1: (Number(oldx1) + 5) + 'px'},
        {
            duration:200,
            step:function(now){$(bar).attr('x1', now);
            queue: false; 
        }
    });

    //keep track of clicks 
    var incrementProgress = new Firebase('https://burning-heat-9490.firebaseio.com/');

    //creates a new, incremental record
    $('#increment').on('click', incrementId);

    var errorId = 0;
    //creates a new, incremental record
    function incrementId(){
        //increment the counter
        incrementProgress.child('counter').transaction(function(currentValue){
            return (currentValue || 0) + 1
        }, function(err, committed, ss){
            if(err){
                setError(err);
            }
            
            else if(committed){
                //if update succeeds, then create a record
                addRecord(ss.val());
            }
        });
    }

    //create new incremental record
    function addRecord(id) {
        setTimeout(function() {
            incrementProgress.child('records').child('rec'+id).set('record #'+id, function(err) {
                err && setError(err);
            });        
        });
    }
}

/* Transition animations when a habit is deleted */
function deleteHabit(element) {
    var child = element.parentNode.parentNode;
    var parent = child.parentNode;

     ///Slides up to delete 
     $(child).closest('li').slideUp('slow', function(){
         $(child).remove(); 
         var childKey = child.key(); 
         console.log(childKey);
     }); 
}

// keep track of habit progress 
var errorId = 0;
function incrementId(){
    var incrementProgress = new Firebase('https://burning-heat-9490.firebaseio.com/');
    //increment the counter
    incrementProgress.child('progressCounter').transaction(function(currentValue){
        return (currentValue || 0) + 1
    });
}   

/*function(err, committed, ss){
             if(err){
                 setError(err);
             }
             else if(committed){
                 //if update succeeds, then create a record
                 addRecord(ss.val());
             }
         });
     }

 //create new incremental record
 function addRecord(id) {
     setTimeout(function() {
         incrementProgress.child('records').child('rec'+id).set('record #'+id, function(err) {
             err && setError(err);
         });        
     });
 }*/

/* Transition animations on navigating to the edit page */
function editPageTransition(){
    var habitList = document.getElementById('habit-list').children;
    var delay = 0; 

    for (var i = 0; i < habitList.length; i++){
        
        if (i != habitList.length - 1){
            $(habitList[i]).delay(delay).animate({right: '1500px'}, 500); 
            delay+=100; 
        }
        
        else{
            $(habitList[i]).delay(delay).animate({right: '1500px'}, 500, function(){window.location.href='edit.html'}); 
        }
    }
}

/* Transition animations on navigating to the add page */
function addPageTransition(){
    var habitList = document.getElementById('habit-list').children;
    var delay = 0; 

    for (var i = 0; i < habitList.length; i++){
        if (i != habitList.length - 1){
            $(habitList[i]).delay(delay).animate({right: '1500px'}, 500); 
            delay+=100; 
        }
        
        else{
            $(habitList[i]).delay(delay).animate({right: '1500px'}, 500, function(){window.location.href='add.html'}); 
        }
    }

    if (habitList.length == 0){
        window.location.href='add.html'; 
    }

}




