#Star Wars Characters App
This project is a web application built with Next.js, Chakra UI, React Flow, and Axios. Jest is used for testing, and Turbo Repo is utilized for managing dependencies.

##Description
The Star Wars Characters App allows users to retrieve a list of Star Wars characters, navigate through pages of characters, and view additional information about each character. When a character is clicked, a modal window opens displaying a graph showing the character's relationships, along with information about the films the character appeared in and the starships they piloted.

###Technologies Used
- Next.js
- Chakra UI
- React Flow: A library for building interactive node-based graphs.
- Axios
- Jest
- turborepo
  
### Installation
- Clone the repository:
`git clone <repository-url>`
- Navigate to the project directory:
`cd star-wars-characters-app`
- Install dependencies using Turbo Repo:
`turbo install`
- Start the development server:
`npm run dev`
Open your browser and visit http://localhost:3000.

### Usage
- Upon opening the application, users will see a list of Star Wars characters.
- Use the pagination controls to navigate through different pages of characters.
- Click on a character to view additional information in a modal window.
- Inside the modal, explore the graph showing the character's relationships, along with details about the films they appeared in and the starships they piloted.

### Testing
Jest is used for unit and integration testing. To run tests, use the following command:
`npm run test` or `npm run test:watch`
Contributing
Contributions are welcome! Feel free to open issues or pull requests for any improvements or new features you'd like to see added to the project.
