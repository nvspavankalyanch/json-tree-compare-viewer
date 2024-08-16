# JSON Tree Compare Viewer

A React-based web application for comparing and visualizing JSON structures side by side.

## Features

- Input two JSON structures for comparison
- Visual tree representation of JSON data
- Color-coded differences highlighting
- Expandable/collapsible nodes for easy navigation
- Copy and clear functionality for input fields

## Getting Started

### Prerequisites

- Node.js (version 12 or higher)
- npm (usually comes with Node.js)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/json-tree-compare-viewer.git
   ```

2. Navigate to the project directory:
   ```
   cd json-tree-compare-viewer
   ```

3. Install dependencies:
   ```
   npm install
   ```

### Running the Application

To start the development server:


Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

## Usage

1. Enter or paste JSON data into the "Left JSON" and "Right JSON" text areas.
2. Click the "Compare" button to visualize the JSON structures.
3. Expand or collapse nodes to explore the JSON hierarchy.
4. Use the copy and clear buttons for easy input management.

## Color Legend

- Red: Extra data in left JSON
- Blue: Extra data in right JSON
- Green: Matching primitive values
- Gray: Matching keys or array indices

## Technologies Used

- React
- Tailwind CSS
- Lucide React (for icons)

## Project Structure

The main component of the application is `JsonTreeCompareViewer`, which can be found in:

 <a href="https://github.com/nvspavankalyanch/json-tree-compare-viewer/blob/main/src/JsonTreeCompareViewer.jsx">JsonTreeCompareViewer</a>




## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

