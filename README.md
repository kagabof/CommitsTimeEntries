# CommitsTimeEntries

**CommitsTimeEntries** is a Node.js TypeScript project that retrieves all Git commits within a specified date range and pushes them as daily time entries to the Clockify API.

## Features

- Retrieves Git commit messages between two specified dates.
- Groups commits by day and formats them for use in Clockify.
- Pushes the formatted commits as time entries to the Clockify API.
- Utilizes environment variables for configuration.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js** and **Yarn** are installed on your machine.
- A Git repository exists locally, and you want to track the commits.
- A Clockify account with access to API keys.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/CommitsTimeEntries.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd CommitsTimeEntries
   ```

3. **Install dependencies using Yarn:**

   ```bash
   yarn install
   ```

4. **Create a `.env` file** at the root of the project and configure it with your settings:

   ```bash
   touch .env
   ```

   Add the following variables to the `.env` file:

   ```bash
   GIT_REPO_PATH=/path/to/your/local/git/repository
   API_URL=https://api.clockify.me/api/v1/workspaces
   API_KEY=your-clockify-api-key
   WORK_SPACE_ID=your-clockify-workspace-id
   PROJECT_ID=your-project-id
   START_DATE=2024-10-01
   END_DATE=2024-10-31
   ```

   - `GIT_REPO_PATH`: The path to your local Git repository.
   - `API_URL`: The Clockify API base URL.
   - `API_KEY`: Your Clockify API key.
   - `WORK_SPACE_ID`: Your workspace ID from Clockify.
   - `PROJECT_ID`: The Clockify project ID where the time entries will be added.
   - `START_DATE` and `END_DATE`: The date range for fetching Git commits.

## Usage

To start the script and push the commits to Clockify:

1. **Run the script:**

   ```bash
   yarn start
   ```

This will retrieve all Git commits within the specified date range, format them, and push them as time entries to Clockify.

## Project Structure

```bash
CommitsTimeEntries/
│
├── src/
│   └── push_commits.ts      # The main script for processing and pushing commits
├── dist/                    # Compiled JavaScript files will be generated here (if compiled)
├── node_modules/            # Node.js dependencies
├── package.json             # Project metadata and dependencies
├── tsconfig.json            # TypeScript configuration
├── .gitignore               # Files to ignore in version control
└── .env                     # Environment variables (not tracked in version control)
```

## Scripts

- `yarn start`: Runs the main script (`push_commits.ts`) using `ts-node`.

## Example `.env` File

```bash
GIT_REPO_PATH=/Users/username/your-repo
API_URL=https://api.clockify.me/api/v1/workspaces
API_KEY=your-clockify-api-key
WORK_SPACE_ID=your-clockify-workspace-id
PROJECT_ID=your-project-id
START_DATE=2024-10-01
END_DATE=2024-10-31
```

## Dependencies

- **axios**: A promise-based HTTP client for making requests to the Clockify API.
- **dotenv**: Loads environment variables from the `.env` file.
- **ts-node**: Enables running TypeScript files directly.
- **typescript**: TypeScript compiler.

## Development Dependencies

- **@types/node**: TypeScript type definitions for Node.js.
- **typescript**: TypeScript compiler for type checking and compiling `.ts` files.

## License

This project is licensed under the MIT License.

## Author

<img src="https://github.com/kagabof.png?size=150" alt="Kagabo Faustin" style="border-radius: 50%; width: 150px;"/>

[Kagabo Faustin](https://github.com/kagabof)

[kagabof](https://github.com/kagabof)
