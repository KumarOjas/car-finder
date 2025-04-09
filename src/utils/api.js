import { Octokit } from "@octokit/core";

// Initialize Octokit with rate limit handling
const octokit = process.env.REACT_APP_GITHUB_TOKEN 
  ? new Octokit({ 
      auth: process.env.REACT_APP_GITHUB_TOKEN,
      request: { retries: 2, retryAfter: 5 }
    })
  : new Octokit({
      request: { retries: 2, retryAfter: 5 }
    });

export const fetchGitHubProfile = async (username) => {
  if (!username) throw new Error('Username is required');
  
  try {
    const response = await octokit.request('GET /users/{username}', {
      username: username,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching GitHub profile:', error);
    throw new Error(`Failed to fetch profile: ${error.message}`);
  }
};

export const fetchGitHubRepos = async (username) => {
  if (!username) throw new Error('Username is required');

  try {
    const response = await octokit.request('GET /users/{username}/repos', {
      username: username,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      },
      sort: 'updated',
      direction: 'desc',
      per_page: 100
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    throw new Error(`Failed to fetch repositories: ${error.message}`);
  }
};

export const fetchCommitActivity = async (username, repo) => {
  if (!username || !repo) throw new Error('Username and repo are required');

  try {
    const response = await octokit.request('GET /repos/{owner}/{repo}/stats/commit_activity', {
      owner: username,
      repo: repo,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching commit activity:', error);
    throw new Error(`Failed to fetch commit activity: ${error.message}`);
  }
};
