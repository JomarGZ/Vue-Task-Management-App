set -e

echo "Deployment started..."

git pull origin master
echo "New changes copied to server !"

echo "Installing Dependencies"
npm install --yes

echo "Creating Production Build"
npm run Build

echo "Deployment Finished!"
