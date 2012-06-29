
Old Flow
--------
	* **Flow**
		* Users goes to url.com
		* **Head Server* serves index.html 
			* very small (under 1k?)
			* javascript files are pointed to the cloud
				* amazon s3  
			* **Site Server** ip will be embed in the html
		* user connects to the appropriate site server
			* receives live playing game
			* receives last couple of games waiting to start
		* user searches for rooms
			* search criterea
				* games (multiselect)
				* name
				* player number
				* friends?
		* user enters room
			* connects to chat server
			* receives list of games waiting to start and running
		* user joins game 
			* connects to new room in chat server, if server is different swap socket
		* game starts
		* windows swing away, cards are dealt
		* questions are asked
		* game concludes
		* rejoin room which the game was initial created
		* $
		