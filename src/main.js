import dotenv from 'dotenv';
import { Octokit } from "octokit";
dotenv.config();

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER;
const GITHUB_REPO = process.env.GITHUB_REPO;
const MAIN_BRANCH = process.env.GITHUB_MAIN_BRANCH;
const DEV_BRANCH = process.env.GITHUB_DEV_BRANCH;

const octokit = new Octokit({
    auth: `token ${GITHUB_TOKEN}`,
});

const getListOfCommitNo = (numbers) => {
    return numbers.map(number => `#${number}`)
}

const getTicketNumbersFromCommitList = (list) => {
    return list.map(item => item.split(': ').pop().split(' ')[0]);
}

const createTextStringFromArray = (array) => {
    return array.join(', ');
}

const createSlugFromArray = (array) => {
    return array.join('-').replace(' ', '-');
}

const getCommitsMessageFromCommitList = (list) => {
    return list.map(item => item.commit.message.split('\n')[0])
}

// 1. Compare commits between dev and master and get the diff commits

const { data: dev } = await octokit.rest.repos.listCommits({
    owner: GITHUB_OWNER,
    repo: GITHUB_REPO,
    sha: DEV_BRANCH
})

const { data: master } = await octokit.rest.repos.listCommits({
    owner: GITHUB_OWNER,
    repo: GITHUB_REPO,
    sha: MAIN_BRANCH
})

const devList = getCommitsMessageFromCommitList(dev);

const masterList = getCommitsMessageFromCommitList(master);

const commitDiffs = devList.filter(item => !masterList.includes(item))

// 2. Get the commits that need to be merged

const PRs = ["43", "942"];

const prList = getListOfCommitNo(PRs);


const selectedPRs = prList.flatMap(pr => {
    return commitDiffs.filter(diff => {
        return diff.includes(pr)
    });
});

const ticketNumbers = getTicketNumbersFromCommitList(selectedPRs);

// 3. Cherry-pick selected commits into new branch from main branch
const { data: branch } = await octokit.rest.repos.getBranch({
    owner: GITHUB_OWNER,
    repo: GITHUB_REPO,
    branch: MAIN_BRANCH
})

const { data: createdRef } = await octokit.rest.git.createRef({
    owner: GITHUB_OWNER,
    repo: GITHUB_REPO,
    ref: `refs/heads/cherry-pick-${createSlugFromArray(ticketNumbers)}`,
    sha: branch.commit.sha,
})

const refSha = createdRef.object.sha;
const refName = createdRef.ref.split('/')[2];

// const res = await octokit.rest.repos.merge({
//     owner: GITHUB_OWNER,
//     repo: GITHUB_REPO,
//     base: refName,
// })

console.log({ data })

// 4. Create PR from cherry-picked commits

// const response = await octokit.request("POST /repos/{owner}/{repo}/pulls", {
//     owner: GITHUB_OWNER,
//     repo: GITHUB_REPO,
//     title: `Cherry-pick ${createTextStringFromArray(ticketNumbers)}`
// })

