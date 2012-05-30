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

Google Document
--------------- 
* https://docs.google.com/document/d/1awwLCyOkEkVUFXiO8jueHF6jiD1iQatxTnlLi_FXkbM/edit




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
		* safely.......
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

