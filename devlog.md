# Development log
A document to make notes and reflections about the development of my game

### 24/12/2021
 - Investigated means to create a game using JS. Discovered Kaboom.js and replit, a JS library and browser based IDE that work together to make 
    the process of game creation more simple.
 - Watched parts of a tutorial on how to use Kaboom to create clones of Space Invaders, Super Mario and Zela. Useful but noted that the video is outdated,
   and the syntax for using Kaboom has changed
   
### 26/12/2021
 - Experimented with Kaboom.js and replit. Made some simple sprites and created a map, added some movement functionality for moving a player around.

### 29/12/2021

 - Created a basic map with walls and player sprite. Player has movement that changes based on direction, walls and player are solid so can't move through each other. 

 - created the structure of the first map.

 - tried to get text to appear when player is in proximity to an object in the game. Can only get text to appear, cannot seem to find functionality for checking constant proximity. 

 ### 30/12/2021

 - Worked on trying to get text appear when player is near object. after trying several methods including using collision, I found I could access the property for the players x and y position, and use this to check if they were near the console object. By changing the movement speed of the character, I could get them to stop when they press a key by the console, and return to normal gameplay by pressing another key to get out. Note: one particular issue I am having is that the docs appear to have some mistakes.

  ### 31/12/2021
  - added a character text input once the player accesses the console.

  ### 1/01/2021
   - Due to a multitude of issues with the text entry functionality, decided to change the way the player interacts with the console by giving a set menu of options. This was achieved by registering a button input and creating a sprite showing a list of options the player could choose.

   - once the player is using the console, a boolean is toggled that allows them to choose where the bridge will move to based on CSS flexbox code. I decided to make the bridge two parts, so it made more sense from a CSS Flexbox perspective how it works. This was done by creating functions which create and destroy bridge sprites, based on x and y coordinates added in. The same was done with invisible walls which make sure the player can't go out of bounds.

   - to make the level more interesting, a switch was added that unlocks the door. Now, to complete the level the player must use on flexbox setting to access the switch, then another to access the door. 

   - it has been challenging using a library that is very new. There is not a lot of help online about other people using kaboom js so most troubleshooting has had to be done through the documentation.

   Next steps:
    - Finalise the first level. Make the door lead to a new map
    - Add another interactive sign that explains the bridge
    - add text that tells the player the door is locked if they try using it before the switch is flipped

### 2/01/2021
  - to simplify the code, tried to move parts of it to another file and import it to main.js. This is proving problematic however, and I can't seem to resolve it. I have got it working with the level maps, so these have been moved to maps.js as well as the object configuring the maps. 

  - added an intro screen, and moved the code into a scene structure. first scene is an intro screen, second scene is the first level of the game.

  - added a check for if the door is locked or not. if locked, the player gets a message telling them this which is removed after 3 seconds. Had to make the text a variable with a tag and "destroyall" targetting that tag to get the message to dissapear if the player constantly tries to access the door.

  - added a message that lets the player know the door has been unlocked when they flip the switch.

  - added an intro screen explaining the first level

