
Old servers
-----------
	* ***Server***
		* **Logic Servers**
			* **Head Server**
				* nodejs http server
				* Initial request to url.com
				* has socket connection to all **Site Servers**
				* determines **Site Server** with least load
				* serves index.html with that **Site Server** specified
			* **Site Server**
				* nodejs socketio server
				* connects to **mongos**
				* handles all user and room based transactions
				* has connection to **Head Game Server**
			* **Head Game Server**
				* nodejs socketio server
				* maintains connection with all game servers and site servers
				* handles creation of games
				* connects to **mongos**
			* **Game Server**
				* nodejs socketio server
				* has connection to users currently playing games
				* handles game logic execution
				* connects to **mongos**
			* **Chat Server**
				* nodejs socketio server
				* handles all chat transactions
				* maintains connection to all users who are in chat. 
					* if a player is in multiple rooms at once, only one connection will be made
			* **Ad Server**
				* nodejs restful http service
				* serves the proper ad based on the users current game 
				* handles developer ad percentage switching			
		* **Database Servers**
			* **mongos**
			* **config server**
				* 3
			* **shards**
				* 2
			* **backup**
				* needs research