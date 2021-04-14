# anime-stat-bros

## Project Descption
This project aims to create a statistics based web app for anime data. Project will be published online once I finish the database. 

## Preview

![AnimeStatBros](AnimeStatBros1.JPG?raw=true 'output')
![AnimeStatBros](AnimeStatBros2.JPG?raw=true 'output')
![AnimeStatBros](AnimeStatBros3.JPG?raw=true 'output')
![AnimeStatBros](AnimeStatBros4.JPG?raw=true 'output')
![AnimeStatBros](AnimeStatBros5.JPG?raw=true 'output')

## To do list:
- [X] get list of requirements
- [X] basic page layouts
- [ ] second round
## home page
- [X] remove load more buttona and add it to the top and add refresh button on top right for discussions and top anime trends cards
- [X] sync colors for small stats cards and resolve for responsiness
- [ ] WishList: stats cards should cycle through different data via animation every 10 secs
- [X] add auhor name to industry new cards
- [X] add option to see cards in tabukar format for top anime trends card
- [X] remove horizontal bar from top trends card
## Disscussion card componet
- [X] replace comment with reply
- [ ] use comment services like disqus
- [ ] ability to search comments for subjects and keywords
## Dashboard page
- [X] include add and remove card fuctions
- [X] include menu button for each card
- [ ] filter system for cards with the default chart type options
- [ ] create each default card to be dynamic
- [ ] check responsiveness on mobile layout
- [X] solve for text issue on anime info card
- [ ] ability to save templetes and load templetes
## Anime Stats page
- [X] make small stats col dynamic with row
- [X] drop down filter on chart cards to which to different types of cards
- [X] figure out what to put on the genere analysis card. its just a place holder right now (will use as pie chart for MAL watch, drop,...categoeies)
- [X] resolve for responsiveness for d3 charts inside cards
- [ ] WishList: reset zoom and brush
- [X] resonsivness for aniome descriptions card
- [X] light shade area chart for time series and make graphic look better
- [X] get multi select feature to work
- [X] Wishlist: add tool tip on time series chart
- [X] added legend
- [X] normalized chart watch, drop,... % of total and anything else for comparative analysis
- [X] ratings chart
- [X] categories chart
- [X] word cloud chart for semiment analyis
- [X] connect table and chart to show data being displayed as tabular
- [ ] load issues with word cloud. might use d3 instead. calac should be done on backend. then sent to db. only use top X
- [X] use prop type for d3 charts
- [ ] click on small stats to show info function 
## Season Stats page 
- [X] drop down filter on chart cards to which to different types of cards. Options include on: Rating (time scale by %? from start to end of season or days?), %change, comments,watching, dropped,episode,anime count, number of studios,   
- [X] resolve for responsiveness for d3 charts inside cards
- [X] line breaks for season info card
- [ ] click on small stats to show info function
## Anime industry page
- [ ] add refresh button to top of top indstry news card
- [ ] space for ads on the bottom of the top industry news card. there fore give card max height
## profile page
- [X] ability to change password
- [ ] WishList: all your comments section
## search bar
- [ ] will take you to page and link for what you are searching
- [ ] separate from comments search???
## others
- [X] remove notifications feature
- [ ] create twitter account for site
- [ ] my anime list API
- [ ] anime news encylapidia API
