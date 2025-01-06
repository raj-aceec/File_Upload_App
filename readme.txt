## File Upload Application
1. Install the dependencies "npm init"
2. Start the server "node server.js"

## Front End
1. Index.html :- Used to Upload the File
2. Style.css :- Used to apply some styles
3. Script.js :- Used to send the file to the backend using POST request

## Back End
1. It has a route that accepts the POST requests for file uploads
2. It has a middleware to handle file uploads (multer)
3. It responds to the client with the download link

## Restrictions
1. It accepts only .png .pdf .docx file formats
2. The file should not exceed 2MB
3. If it is a image the dimension should be less than 400*300 pixels