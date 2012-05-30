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

* Finalize site framework
	** html5 preliminary windows
		*** Minimized/maximized/tiled/fancy
		*** animations 
	** player stuff
	** storing elaborate cookies
* Finalize site server
	** Finalize site api
		*** see flowchart
	** load balancing
* Finalize main site
	** constant playing game in the background
	** making all calls
	** switching loadbalance
* Finalize game server
	** stress test with web
		*** automate
	** different servers for development
	** switching loadbalance
	** log everything
	** Finalize game api
		*** see flowchart
* Finalize game site
	** proper scaled game drawing
		*** phone browser support?
	** question location
	** skinnable question area
		*** editor?
* Finalize developer site
	** development area
		***upload content
			****name 
			****images
			****card fronts
			****card back
			****advertising code
		*** debugging area
	** see game stuff
		** track custom elaborate statistics
			*** how many fish have been gotten
	** ad views	
* Finalize chat server
	** simple chat
	** has running rooms
		*** each game
			**** pre game
		*** each room
		*** proper room syncing
	** log everything
* Finish debugging area
	** Code Mirror
		*** Intelisense
		*** control+w?
		*** skinning
	** Console
	** playing all players at once
	** saving responses
	** log everything
* Proper database solution
	** nosql options 
		*** mongo
	** log everything
	** clustering
* Finalize game framework
	** game layout editor
	** asking question to multiple people, obtaining responses as they come
* Finalize layout framework
	** one board grid
		*** xy widthheight
	** player table spaces
		*** options for different layers for different num of players
	** main area table space
	** Table spaces
		*** own grid
			**** x,y on board grid
			**** width height on board grid
		*** types
			**** absolute position
			**** card flow
				***** vert/horz
	** premade boards/spaces
		*** simple player flowing
		*** simple cards cascading in both directions
* Finalize question framework
	** Show in popup
		*** fancy custom css?
			**** editor??
		** simple question answer
	** Show on gameboard
		*** x,y location on what grid?
		*** show question in popup still?
		*** button answers
		*** card answers
			**** allow dragging
				***** define allowable dragend
					****** spaces
					****** rect area on grid?
* Finalize effect framework
	** Where
		*** On Cards
		*** On Spaces
		*** On Players
		*** On Mouse?
		*** At xy on boardgrid
	** Types
		*** Glow
		*** Rotate
		*** Scale
		*** Colorize
		*** Fade?
	** Duration
	** Chaining Effects
* Build games
	** sevens
	** blackjack
		*** dealer
	** go fish
	** 7 card no peek
		*** poker rules
	** war
		*** has to be only two players?
		*** casino war?
	** rummy
	** spit
		*** hard
	** thirtyone
* Learn about ads
	** text based
		*** adsense 
		*** options
	** video ads
		*** duration
		*** options
	** sharing text based codes
* Learn about bringing linode servers on quick
	** options (remember xss)
	** proper magic load balancing
* Learn about amazon hosting/options
	** serving index.html?
	** serve all js and css

