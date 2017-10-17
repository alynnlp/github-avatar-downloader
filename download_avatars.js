var request = require('request');



console.log('Welcome to the Github Avatar Downloader!')

var GITHUB_USER = "YOUR USERNAME HERE";
var GITHUB_TOKEN = "YOUR ACCESSTOKEN HERE";

getRepoContributors(repoOwner, repoName, function(err, result) {
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  console.log(requestURL)
  
  console.log(result)
  if(!err){
    result.forEach(function(userData){
      var filePath =  `${dir}${userData.login}.jpg`;
      downloadImageByURL(userData.avatar_url, filePath);
    })
  } else{
      console.log('errors:', err)
    }
  });
