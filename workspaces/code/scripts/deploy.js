import dotenv from 'dotenv';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = 'hlsitechio';
const REPO_NAME = 'Flexio.dev';
const BRANCH = 'main';

async function buildProject() {
  try {
    console.log('Building the project...');
    execSync('npm run build', { stdio: 'inherit' });
    console.log('Project built successfully!');
  } catch (error) {
    console.error('Error building the project:', error.message);
    process.exit(1);
  }
}

async function deployToGitHub() {
  try {
    console.log('Deploying to GitHub...');

    // Configure Git
    execSync(`git config user.name "GitHub Actions Bot"`, { stdio: 'inherit' });
    execSync(`git config user.email "actions@github.com"`, { stdio: 'inherit' });

    // Add all changes
    execSync('git add -A', { stdio: 'inherit' });

    // Commit changes
    execSync('git commit -m "Automated deployment"', { stdio: 'inherit' });

    // Push to GitHub
    execSync(`git push https://${GITHUB_TOKEN}@github.com/${REPO_OWNER}/${REPO_NAME}.git ${BRANCH}`, { stdio: 'inherit' });

    console.log('Successfully deployed to GitHub!');
  } catch (error) {
    console.error('Error deploying to GitHub:', error.message);
    process.exit(1);
  }
}

async function deploy() {
  await buildProject();
  await deployToGitHub();
}

deploy();