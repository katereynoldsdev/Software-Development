var child_id = 0;

function addCard(divID)
{
  var unique_id = divID+child_id;
  var tweet = $('<div class="card" id = "'+unique_id+'"> <img   src="twitter_logo.png" alt="twitter logo" height="200px" width="200px"><li class="list_group-item">Tweet</li><li class="list-group-item">Sample Tweet goes here!</li><button type="button" class="btn btn-danger" onclick="deleteCard('+unique_id+')">-</button>');
  tweet.appendTo('#'+divID);
  child_id++;
}

function deleteCard(cardId){
  cardId.remove();
}