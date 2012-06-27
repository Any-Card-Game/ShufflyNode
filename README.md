ShufflyNode
===========

An implementation of the Shuffly Concept using Node.js

Changed Concepts
--------

* Games will be written in javascript
* Live debugging will be available

Dependencies
------------

* Nodejs v0.6.18+
* Fibers 
* socket.io

Google Document
--------------- 
* https://docs.google.com/document/d/1awwLCyOkEkVUFXiO8jueHF6jiD1iQatxTnlLi_FXkbM/edit

 

Author : Salvatore Aiello (dested) Licence : LGPL V2



List to demo
------------

* **Finalize site framework**
	* html5 skinnable draggable windows 
		* Minimized/maximized/tiled/fancy
		* animations 
		* gestures
	* player stuff
		* forgot password
		* guest accounts
		* friends
		* elaborate tracking
			* favorite games
			* number of fish gotten
		* storing elaborate layout location cookies
	* chat
* **Finalize site server**
	* Finalize site api
		* see flowchart
	* load balancing
	* properly measuring max concurrent load
	* properly serving chat server information
* **Finalize main site**
	* constant playing game in the background
		* load cost of this
	* making all calls
		* see flowchart
	* seemless loadbalance
		* can no one miss their friends?
* **Finalize game server**
	* stress test with web
		* automate
		* determine concurrent game limit per instance
	* different servers for development
		* ratio?
	* switching loadbalance
	* log everything
	* Finalize game api
		* see flowchart
* **Finalize game site**
	* skinnable question window
		* editor?
	* canvas drawing
		* question location
		* proper scaled game drawing
			* phone browser support?
* **Finalize developer site**
	* development area
		* upload content
			* name 
			* images
			* card fronts
			* card back
			* advertising code
		* debugging area
		* proper app crash support
	* see game stuff
		* track custom elaborate statistics
			* how many fish have been gotten
	* ad views
		* update ad codes
* **Finalize chat server**
	* simple chat
	* player list
	* has rooms
		* pre game
		* game
		* room
	* proper room load balancing
	* log everything
* **Finish debugging area**
	* debugger.log
	* debugger.pause
	* Code Mirror
		* tabs?
		* Intellisense
		* control+w?
		* skinning
	* Console
		* variable lookup
	* watch
	* immeditate window
		* safely execute javascript...
	* documentation window
	* playing all players at once
	* saving responses
	* log everything
* **Admin tool**
	* web based, easy phone usage
	* approve games
		* approve assets
		* approve ad codes
	* ad views stuff
	* server statistics
	* game / room statistics
	* player stats
	* player lookup
* **Proper database solution**
	* define schema
	* nosql options 
		* mongo
	* log everything
	* clustering
* **Finalize game framework**
	* game layout editor
		* drag and drop/resize for spaces on the grid
		* properties window
		* outputs json? in real time
	* asking questions
		* to one person
			* wait for one reply
		* to multiple people
			* wait for all replies
			* wait for single reply, potentially in a contant loop
	* debugging
* **Finalize layout framework**
	* one board grid
		* xy widthheight
	* player table spaces
		* options for different layers for different num of players
	* main area table space
	* Table spaces
		* own grid
			* x,y on board grid
			* width height on board grid
		* types
			* absolute position
			* card flow
				* vert/horz
				* sticky card position? (sevems)
	* images
		* at xy, scale
	* premade boards/spaces
		* simple player flowing
		* simple cards cascading in both directions
		* advanced pyramid shape
* **Finalize question framework**
	* Custom css 
		* for question popup
		* for answer buttons on grid
		* Editor?
	* Question
		* Show in popup
		* Show at xy on main grid
	* Answer
		* Show in popup 
			* as checkbuttons
				* with submit
			* as radio buttons
		* floating button answers
			* x,y location on main grid
			* check button
				* with submit
			* radio button
		* card answers
			* allow dragging
				* define allowable dragend
					* spaces
					* rect area on main grid
* **Finalize effect framework**
	* Where
		* Card
		* Space
		* Player
		* Mouse
		* At rect on boardgrid
	* Types
		* Glow
		* Rotate
		* Scale
		* Colorize
		* Fade?
	* Duration
	* Chaining Effects
* **Build games**
	* sevens
	* blackjack
		* dealer
	* go fish
		* two player
	* 7 card no peek
		* poker rules
	* war
		* has to be only two players?
		* casino war?
	* rummy
	* spit
		* hard
	* thirtyone
* **Learn about facebook**
	* how can i support ads?
	* fullscreen??
* **Learn about ads**
	* text based
		* adsense 
		* options
	* video ads
		* duration
		* options
	* sharing text based codes
* **Learn about bringing linode servers on quick**
	* options (remember xss)
	* proper magic load balancing
* **Learn about amazon hosting/options**
	* serving index.html?
	* serve all js and css

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

* **Thoughts**
	* complicated dockable window system
	* game config items
		* players can drop
		* join in the middle
			* game.acceptNewPlayers() returns array of new players?
	* game playbacks
		* queue every 100ms due to server/database to recreate game
	* determine static list of categories
	* mark game as interesting
		* rank
	* movable resizable ads
		* cant go off page, can be smushed
	* chat rooms
		* starred 1-3
		* name
		* simulate irc
			* /me
			* channel operators
			* topic
			* colors?
		* list of games
		* list of chatters/ingame users
	* chat in the developer area
		* developer channel
			* mark people as helpful
	* public user statistics
		* image
			* gravatar
			* upload
			* is offensive?
	* create/submit a site skin
		* editor
	* window drift
	* plugins?
		* youtube? 
	* game editor
		* property window 
		* keys
			* none
				* left click: drag corner
				* right click: context menu 
			* shift
				* left click: move space
				* right click: 
			* control
				* left click: 
				* right click: 
			* alt
				* left click: 
				* right click: 
			* tab
				* cycle selected space


* **UI Layouts**
	* Main window
		* scrollable with locks 



* **Game protocol** 
	* Area.Game.Create.Request
	* Area.Game.Create.Response
	* Area.Game.Join.Request
	* Area.Game.Join.Response
	* Area.Game.DebuggerJoin.Request
	* Area.Game.DebuggerJoin.Response
	* Area.Game.AskQuestion
	* Area.Game.AnswerQuestion
	* Area.Game.UpdateLayout
* **Main protocol** 
	* Area.Main.Login.Request
	* Area.Main.Login.Response
* **Ad protocol** 
	* Area.Ad.Fresh
* **Site protocol** 
	* Area.Site.ListCardGames.Request
	* Area.Site.ListCardGames.Response
	* Area.Site.ListRooms.Request
	* Area.Site.ListRooms.Response
	* Area.Site.SearchRooms.Request
	* Area.Site.SearchRooms.Response
	* Area.Site.JoinRoom.Request
	* Area.Site.JoinRoom.Response
	* Area.Site.LeaveRoom.Request
	* Area.Site.LeaveRoom.Response
	* Area.Site.CreateRoom.Request
	* Area.Site.CreateRoom.Response
	* Area.Site.Room.CreateGame.Request
	* Area.Site.Room.CreateGame.Response
	* Area.Site.Room.JoinGame.Request
	* Area.Site.Room.JoinGame.Response
	* Area.Site.Room.Info
	* Area.Site.Room.WaitingInfo
	* Area.Site.Room.StartGame.Request
	* Area.Site.Room.StartGame.Response
	* Area.Site.Room.GameStarted

	










***game/debug stuff***
--------

* Code Mirror
	* tabs?
	* Intellisense
	* control+w?
* Console
* watch
* documentation window
* playing all players at once
* saving responses
* log everything
* debugger.log
* debugger.pause
	* variable lookup when paused
	* immeditate window
		* safely execute javascript...
* skinnable question window
* game logic editor
* canvas drawing
	* question location
	* proper scaled game drawing
		* phone browser support?
* game layout editor
	* drag and drop/resize for spaces on the grid
	* properties window
	* outputs json? in real time
* asking questions
	* to one person
		* wait for one reply
	* to multiple people
		* wait for all replies
		* wait for single reply, potentially in a constant loop
* player table spaces
	* options for different layers for different num of players
* Table spaces
	* own grid
		* x,y on board grid
		* width height on board grid
	* types
		* absolute position
		* card flow
			* vert/horz
			* sticky card position? (sevems)
* images
	* at xy, scale
* premade boards/spaces
	* simple player flowing
	* simple cards cascading in both directions
	* advanced pyramid shape
	* development area
	* upload content
		* name 
		* images
		* card fronts
		* card back
		* advertising code
	* debugging area
	* proper app crash support
* see game stuff
	* track custom elaborate statistics
		* how many fish have been gotten
* ad views
	* update ad codes


***site stuff***
--------
* define protocols		
* **Finalize site framework**
	* html5 skinnable draggable windows 
		* Minimized/maximized/tiled/fancy
		* animations 
		* gestures
	* player stuff
		* forgot password
		* guest accounts
		* friends
		* elaborate tracking
			* favorite games
			* number of fish gotten
		* storing elaborate layout location cookies
	* chat
* **Finalize site server**
	* Finalize site api
		* see flowchart
	* load balancing
	* properly measuring max concurrent load
	* properly serving chat server information
* **Finalize main site**
	* constant playing game in the background
		* load cost of this
	* making all calls
		* see flowchart
	* seemless loadbalance
		* can no one miss their friends?
* **Finalize game server**
	* stress test with web
		* automate
		* determine concurrent game limit per instance
	* different servers for development
		* ratio?
	* switching loadbalance
	* log everything
	* Finalize game api
		* see flowchart
* **Finalize chat server**
	* simple chat
	* player list
	* has rooms
		* pre game
		* game
		* room
	* proper room load balancing
	* log everything
* **Proper database solution**
	* define schema
	* nosql options 
		* mongo
	* log everything
	* clustering
