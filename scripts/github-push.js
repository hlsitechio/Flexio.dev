import { execSync } from 'child_process';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const REPO_OWNER = 'hlsitechio';
const REPO_NAME = 'Flexio.dev';
const BRANCH = 'main';

async function pushToGitHub() {
  try {
    console.log('Pushing to GitHub...');

    // Configure Git
    execSync('git config user.name "GitHub Actions Bot"', { stdio: 'inherit' });
    execSync('git config user.email "actions@github.com"', { stdio: 'inherit' });

    // Add all changes
    execSync('git add -A', { stdio: 'inherit' });

    // Commit changes
    execSync('git commit -m "Automated deployment"', { stdio: 'inherit' });

    // Push to GitHub using SSH
    execSync(`git push git@github.com:${REPO_OWNER}/${REPO_NAME}.git ${BRANCH}`, { stdio: 'inherit' });

    console.log('Successfully pushed to GitHub!');
    
    // Trigger Netlify deployment
    await triggerNetlifyDeploy();
  } catch (error) {
    console.error('Error in push process:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
  }
}

async function triggerNetlifyDeploy() {
  console.log('Triggering Netlify deployment...');
  try {
    const netlifyBuildHook = 'https://api.netlify.com/build_hooks/670ed2634d35b062c352f3eb';
    await axios.post(netlifyBuildHook);
    console.log('Netlify deployment triggered successfully');
  } catch (error) {
    console.error('Error triggering Netlify deployment:', error.message);
    throw error;
  }
}

pushToGitHub();