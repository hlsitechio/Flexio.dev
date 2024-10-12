import express from 'express';
import bodyParser from 'body-parser';

const router = express.Router();

router.post('/railway-webhook', bodyParser.json(), (req, res) => {
  const { type, project, environment, deployment } = req.body;

  console.log(`Received ${type} event for project ${project.name}`);
  console.log('Railway Environment Variables:');
  console.log(`RAILWAY_PRIVATE_DOMAIN: ${process.env.RAILWAY_PRIVATE_DOMAIN}`);
  console.log(`RAILWAY_PROJECT_NAME: ${process.env.RAILWAY_PROJECT_NAME}`);
  console.log(`RAILWAY_ENVIRONMENT_NAME: ${process.env.RAILWAY_ENVIRONMENT_NAME}`);
  console.log(`RAILWAY_SERVICE_NAME: ${process.env.RAILWAY_SERVICE_NAME}`);
  console.log(`RAILWAY_PROJECT_ID: ${process.env.RAILWAY_PROJECT_ID}`);
  console.log(`RAILWAY_ENVIRONMENT_ID: ${process.env.RAILWAY_ENVIRONMENT_ID}`);
  console.log(`RAILWAY_SERVICE_ID: ${process.env.RAILWAY_SERVICE_ID}`);

  // Handle different event types
  switch (type) {
    case 'DEPLOY':
      console.log(`New deployment: ${deployment.id} by ${deployment.creator.name}`);
      break;
    // Add more cases for other event types you want to handle
  }

  res.sendStatus(200);
});

export default router;