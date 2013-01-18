/*
 * Upload file
 */
 
exports.upload_mockup = function(req, res) {
  console.log('Upload started');
  
  res.writeHead(200, { 'Content-Type': 'text/html' }); 
  res.end();
};