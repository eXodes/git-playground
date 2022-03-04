import dotenv from "dotenv";
import { Octokit } from "octokit";
dotenv.config();

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER;
const GITHUB_REPO = process.env.GITHUB_REPO;

const octokit = new Octokit({
  auth: `token ${GITHUB_TOKEN}`,
});

const pr = await octokit.rest.pulls.get({
  owner: GITHUB_OWNER,
  repo: GITHUB_REPO,
  pull_number: 4370,
});

const allowedList = [9076458]

const baseRef = pr.data.base.ref;
const allowed = allowedList.includes(pr.data.user.id)

console.log({ baseRef, allowed });
