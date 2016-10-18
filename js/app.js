$(document).ready( function() {

	var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin"];

	for (channel of channels) {
		twitchQuery(channel);
	}

	function twitchQuery(channel) {
		console.log(channel);
		$.ajax({
			dataType: "json",
			cache: false,
			url: 'https://wind-bow.hyperdev.space/twitch-api/streams/' + channel + '?callback=?',
			success: function(response) {

				var status = '';
				var description = '';
				var link = "https://www.twitch.tv/" + channel;

				if (response.status == 404) {
					status = "offline";
					description = "Channel does not exist."
				} else if (response.stream == null) {
					status = "offline";
					description = "Offline";
				} else {
					status = "online";
					description = response.stream.channel.game + ": " + response.stream.channel.status;
				}

	      		$('.channels-container')
	      			.append("<a href='" + link + "'</a>"
	      					+ "<div class='channel " + status + "'>" 
	      					+ "<div class='channel-name'>" 
	      					+ channel + "</div>"
	      					+ "<div class='channel-stream'>" + description + "</div></div>");


	      	}
		})
		
	}

	$('input[type="radio"]').click(function(){
 		if ($(this).is(':checked')) 
 		{
   			switch($(this).val()) {
   				case "all":
   					$('.channel').removeClass('hidden');
   					break;
   				case "online":
   					$(".channel.offline").addClass('hidden');
   					$(".channel.online").removeClass('hidden');
   					break;
   				case "offline":
   					$(".channel.online").addClass('hidden');
   					$(".channel.offline").removeClass('hidden');
   					break;
			}
		};
	});
});