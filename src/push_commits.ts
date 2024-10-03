import { execSync } from 'child_process';
import axios from 'axios';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config();

// Define the shape of a commit entry
interface CommitEntry {
  billable: boolean;
  customAttributes: any[];
  description: string;
  end: string;
  projectId: string | undefined;
  start: string;
  tagIds: any[];
  type: string;
}

// Function to get Git commits between start and end date
function getGitCommits(startDate: string, endDate: string): CommitEntry[] {
  try {
    const projectId = process.env.PROJECT_ID;
    const repoPath = process.env.GIT_REPO_PATH;
    if (!repoPath || !projectId) {
      throw new Error("PROJECT_ID, WORK_SPACE_ID or GIT_REPO_PATH is missing in the .env file");
    }

    // Change directory to the Git repository
    process.chdir(path.resolve(repoPath));

    const gitLogCommand = `git log --since="${startDate}" --until="${endDate}" --pretty=format:"%h - %an, %ad : %s" --date=iso`;
    const result = execSync(gitLogCommand).toString();

    const commitLines = result.trim().split('\n');
    const commitsByDay: { [key: string]: string[] } = {};

    commitLines.forEach((line: string) => {
      try {
        const [commitInfo, commitMessage] = line.split(" : ");
        const cleanedMessage = commitMessage.replace(/\s?\(#.*?\)/g, "").trim();
        const commitDateStr = commitInfo.split(", ")[1].split(" ")[0];  // Extract the date part

        if (!commitsByDay[commitDateStr]) {
          commitsByDay[commitDateStr] = [];
        }

        commitsByDay[commitDateStr].push(cleanedMessage);
      } catch (error) {
        console.error(`Error parsing line: ${line}`);
      }
    });

    const commitDayList: CommitEntry[] = [];
    Object.keys(commitsByDay).forEach(day => {
      const description = commitsByDay[day].join(" / ");
      commitDayList.push({
        billable: true,
        customAttributes: [],
        description,
        end: `${day}T16:00:00Z`,
        projectId: projectId,  // Use projectId from env
        start: `${day}T08:00:00Z`,
        tagIds: [],
        type: "REGULAR"
      });
    });

    return commitDayList;
  } catch (error) {
    console.error(`Error running git log: ${error}`);
    return [];
  }
}

// Function to push commits to API using axios
async function pushCommitsToAPI(commitDayList: CommitEntry[]): Promise<void> {
  const apiUrl = process.env.API_URL;
  const apiKey = process.env.API_KEY;
  const workspaceID = process.env.WORK_SPACE_ID;

  if (!apiUrl || !apiKey || !workspaceID) {
    console.error('API_URL or API_KEY is missing in the .env file');
    return;
  }

  for (const commitEntry of commitDayList) {
    try {
      const response = await axios.post(`${apiUrl}/${workspaceID}/time-entries`, commitEntry, {
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': apiKey
        }
      });

      if (response.status === 201) {
        console.log(`Successfully pushed data for day ${commitEntry.start}`);
      } else {
        console.error(`Failed to push data for day ${commitEntry.start}. Status Code: ${response.status}`);
      }
    } catch (error) {
      console.error(`Error pushing data for day ${commitEntry.start}: ${error}`);
    }
  }
}

// Example usage
const startDate = process.env.START_DATE;
const endDate = process.env.END_DATE;

if (!startDate || !endDate) {
  console.error('START_DATE or END_DATE is missing in the .env file');
} else {
  const commitDayList = getGitCommits(startDate, endDate);
  pushCommitsToAPI(commitDayList);
}
