var request = require('request');
var fs = require('fs');
var dotenv  = require('dotenv').config({path: '.env'});

console.log('Welcome to the Github Avatar Downloader!')

var GITHUB_USER = "YOUR USERNAME HERE";
var GITHUB_TOKEN = "YOUR ACCESSTOKEN HERE";

var dir = "./avatars/"
var repoOwner = process.argv[2];
var repoName = process.argv[3];

if (process.argv.length !== 4){
  console.log('Need input like this: node download_Avatars.js <repoOwner> <repoName>');
} else if(!fs.existsSync('./.env')){
  console.log('the .env file does not exist')
} else if (!GITHUB_TOKEN || !GITHUB_USER) {
  console.log('Either GITHUB_TOKEN or GITHUB_USER is not defined in .env file')
} else if (!fs.existsSync(dir)) {
  console.log('Directory ${dir} has been created')
}

  else {
  getRepoContributors(repoOwner, repoName, function(err, result) {
  // var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  // console.log(requestURL)
  // console.log(result)
    if(!err){
      result.forEach(function(userData){
        var filePath =  `${dir}${userData.login}.jpg`;
        downloadImageByURL(userData.avatar_url, filePath);
      })
    } else{
        console.log('errors:', err)
      }
    });
  }

function downloadImageByURL(url, filePath) {

  request.get(url)

  .on('err', function(err){
    throw err;
  })
  .pipe(fs.createWriteStream(filePath))
  .on('finish', function(){
    console.log('Github avatar saved to ' + filePath)
  });
}

module.exports = {
  downloadImageByURL : downloadImageByURL
}
