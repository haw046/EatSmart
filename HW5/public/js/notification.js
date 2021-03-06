// var data = [{"title":"Sleep 8 hours", "weekly_frequency":[1,3,5], "daily_frequency":1,"time_interval":1,"from":"2:27", "to":"5:30"},
//  				{"title":"Bite nails", "weekly_frequency":[2,3,4], "daily_frequency":1,"time_interval":2, "from":"2:29", "to":"13:00"}];

var data = [];
var count = 1;
getData();

function getData(){
	var ref = new Firebase("https://burning-heat-9490.firebaseio.com/");
	ref.onAuth(function(authData) {
		if(authData){
			ref.child('Custom').child(authData.uid).on("value", function(snapshot) {
			    data = _.toArray(snapshot.val().Habits);
			}, function (errorObject) {
			   data = [];
			});
		}
	});
}
function parseData(){
	var today = new Date();
	var currentTime = toSecond(today.getHours()+":"+today.getMinutes());
	for(var i = 0; i< data.length; i++){
			var from = toSecond(data[i].from);
			var to = toSecond(data[i].to);
			if(checkDayInterval(data[i]) != -1){
				data[i].next_reminder_time = calculateNextTime(currentTime, from, to, data[i].time_interval);
			}
			else {
				data[i].next_reminder_time = 30*3600;
			}
	}
	data = _.sortBy(data, 'next_reminder_time');
}

function reminder(){
	if(data.length){
		if(count > 0){
			count--;
			parseData(data);
		};
		var today = new Date();
		var currentTime = toSecond(today.getHours()+":"+today.getMinutes());
		if(currentTime == data[0].next_reminder_time){
			var item = data.shift();
			Notification.requestPermission();
			var theBody = "It's time to complete "+item.title;
		  	var theIcon = "../img/logo.png";
		  	var theTitle = "Virtue/Vice";
		  	spawnNotification(theBody,theIcon,theTitle);
		  	item.next_reminder_time = calculateNextTime(currentTime,item.from, item.to, item.time_interval);
		  	data.push(item);
		  	data = _.sortBy(data, 'next_reminder_time');
		}  
	}
	setTimeout(reminder, 500);
}
function checkDayInterval(data){
	var d = new Date();
    var day = d.getDay();

	var checkDay =_.findIndex(data.weekly_frequency, function(d) {
  		return d == day;
	});
    return checkDay;

}
function spawnNotification(theBody,theIcon,theTitle) {
	var options = {
		body: theBody,
		icon: theIcon
	}
	var n = new Notification(theTitle,options);
	setTimeout(n.close.bind(n), 3000); 
}
function toSecond(timeStr) {
 	var time = timeStr.substr(0,timeStr.indexOf(":"))*3600;
 	time += timeStr.substr(timeStr.indexOf(":")+1)*60;
 	return time;
}
function calculateNextTime(currTime, from, to, n){
	if(currTime >= from && currTime <= to && n!=0){
		var nextTime = from;
		var curr = currTime;
		while(nextTime < curr){
			nextTime += n *3600;
		}
		if(nextTime <= to){
			return nextTime;
		}
	}
	return 30*3600; 
}