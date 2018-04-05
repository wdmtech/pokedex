# Pokedex

A full-stack Pokédex implementation, using 

- FeathersJS (server) 
- VueJS (SPA client)
- MongoDB (database)
- Mongoose (MongoDB schemas)

![screenshot](screenshot.png)

# Prerequisites

[Node.js](https://nodejs.org/en/download/) > 8.11.* 

[MongoDB](https://www.mongodb.com/download-center#community) 3.6.*

# Installation

First clone this repository:

`git clone https://github.com/wdmtech/pokedex`

## Running with Docker

`docker-compose up`

Then visit 

`http://localhost:8080`

## Running locally

to start the client: 

`cd client`

`npm run dev`

to start the server:

`cd server`

`npm run start`

# Evaluation

To inspect the database, I recommend using [Robo 3T](https://robomongo.org/)

Connect to the database using `localhost:27017`

# Possible improvements following MVP

- Add authentication, allowing for multiple users
- ~~Add notifications and messages for adding/deleting properties~~ (added!)
- Validate inputs for better UX, better user communication
- Implement image upload for new Pokémon
- Improve UI
- Restrict types and weaknesses to those that don't exist for a given Pokémon
- Add tooltips (e.g. when the user hovers over the Pokémon, indicating that they may favourite it)
- Refactor Pokemon component into smaller, reusable components
- Add tests for hooks, and UI elements

# Copyright and licensing

The software is licensed under the MIT license. See the LICENSE file for full copyright and license text. The short version is that you can do what you like with the code, as long as you say where you got it.

This repository includes data extracted from the Pokémon series of video games. 

All of it is the intellectual property of Nintendo, Creatures, inc., and GAME FREAK, inc. and is protected by various copyrights and trademarks. The author believes that the use of this intellectual property for a fan reference is covered by fair use — the use is inherently educational, and the software would be severely impaired without the copyrighted material.

That said, any use of this library and its included data is at your own legal risk.
