# TV Show Finder Website

## Overview
A JavaScript-based web application that allows users to search for TV shows and view detailed information including episodes, ratings, and show metadata using the TVMaze API.

## Technologies Used
- HTML5
- CSS3
- JavaScript (ES6+)
- jQuery
- TVMaze API
- LocalStorage

---

## Features

### Search Functionality
- **Real-time Search**: Dynamic search triggered after typing 3+ characters
- **Multiple Results**: Displays top 3 matching shows
- **Show Information Display**:
  - Show title
  - Show poster image
  - Average rating
  - Selection link to view details

### Show Details Page
- **Comprehensive Show Information**:
  - Full-size original poster image
  - Complete show summary
  - Genre listing
  - Original language
- **Episode Guide**:
  - Complete episode list organized by season
  - Episode numbers and titles
  - Direct links to episode pages on TVMaze

### Data Persistence
- Uses LocalStorage to maintain selected show between pages
- Seamless navigation from search to details

---

### Key Components

#### Search Page (script1.js)
**Main Functions:**
- `main(showName)` - Orchestrates search and display
- `FetchShowInfo(showName)` - Fetches show data from TVMaze API
- Event listeners for input handling and show selection

**Key Elements:**
- `#userSearch` - Search input field
- `#search-results` - Results container
- `#user-input-box` - Input instruction container

#### Details Page (script2.js)
**Main Functions:**
- `main(showName)` - Retrieves and displays show details
- `FetchShowDetails(showName)` - Fetches detailed show information
- `FetchShowEpisodes(showId)` - Fetches all episodes for a show

**Key Elements:**
- `#display-land` - Details display container
- Dynamic episode list generation

---

## API Integration

### TVMaze API
The application uses the following endpoints:

1. **Show Search**
```
   GET https://api.tvmaze.com/search/shows?q={showName}
```
   Returns: Array of shows matching search query

2. **Episode List**
```
   GET https://api.tvmaze.com/shows/{showId}/episodes
```
   Returns: Complete list of episodes for a show

### Data Retrieved
- Show ID
- Show name
- Poster images (medium and original sizes)
- Average rating
- Show summary
- Genres array
- Language
- Episode details (season, number, name, URL)

---

## User Flow

1. **Search Phase**
   - User enters show name in search box
   - After 3+ characters, search is triggered automatically
   - Top 3 results are displayed with images and ratings

2. **Selection Phase**
   - User clicks "Select Show" on desired result
   - Show name is stored in localStorage
   - User is redirected to Details.html

3. **Details Phase**
   - Selected show name is retrieved from localStorage
   - Detailed show information is fetched and displayed
   - All episodes are loaded and organized by season
   - User can click episode links to view more on TVMaze

---

## How to Run

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for API calls)
- Local or remote web server

### Installation & Setup

1. **Clone or download the project files**
```bash
   git clone <repository-url>
```

2. **Ensure jQuery is included**
   Add to HTML head:
```html
   <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
```

3. **Open the application**
   - Option 1: Open `index.html` directly in browser
   - Option 2: Use a local server (recommended)

4. **Access the application**
   - Navigate to `http://localhost:8000` (if using server)
   - Or open `index.html` directly

---

## Usage Instructions

### Searching for a Show
1. Type at least 3 characters in the search box
2. Results will appear automatically
3. Review show titles, images, and ratings

### Viewing Show Details
1. Click "Select Show" on your preferred result
2. You'll be redirected to the details page
3. View show information and episode list
4. Click episode links to learn more

---

## Technical Details

### Error Handling
- API response validation
- Try-catch blocks for async operations
- Console error logging
- Null checks for missing data

### Asynchronous Operations
- Uses `async/await` for cleaner asynchronous code
- Fetch API for HTTP requests
- Promise-based error handling

### DOM Manipulation
- Dynamic content creation using `createElement()`
- Template literals for HTML injection
- Event delegation for dynamically created elements

---

## Known Limitations

1. **Fixed Result Count**: Only displays top 3 search results
2. **Genre Display**: Currently only shows last genre in array (needs fixing)
3. **No Loading States**: No visual feedback during API calls
4. **Error Messages**: Limited user-facing error messaging

---

## Author
Ahmed - Computer Science Student

## Acknowledgments
- [TVMaze API](https://www.tvmaze.com/api) for providing free TV show data
- jQuery for DOM manipulation utilities

---
