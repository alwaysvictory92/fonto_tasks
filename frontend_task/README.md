# Fonto Frontend task 

Users to retrieve properties and its valuations along with total valuation calculated and displayed. Users are also able to enter property details added feature. This document demonstrate description of the built. Assumptions and designs taken into consideration. 

## Technologies Used

---
1. HTML, CSS and Javascript
2. In extension to JS, XHR to make HTTP GET and POST requests and FormData to retrieve property details is used.
---

## Assumption

To complete this task, it is assumed that the addresses which are entered by user and retrieved is Australian and formatted accordingly. 

## Potential Design Improvement 

The following are the design improvements made in addition to the task description. 

---
1. Validations is made when adding the property from the form. The checks are done only for empty values. 
2. Success and error messages are embedded within modal i.e. when a property is added successfully, it shows success message and such incident such as network problem would show the error message. 
3. On successful insertion of the property, the table is instantly updated. 
---

## Instruction 

The application can be run by executing the 'index.html' file in the browser. 

## Demonstration 

The following are the screenshots with description provided that run through application. 

### Loading and Populating the Properties Data 

While the web application waits for the API to respond with the list of properties, the website displays the message of "please wait...". 
![This is an image](/assets/src1.png)

Once loaded, the table is populated with the data provided that key: hidden is false in each object. 
![This is an image](/assets/src2.png)

### Adding a New Property 

For adding a new property, simply click the 'add property' button and a new modal will apear. 
![This is an image](/assets/src3.png)

The values are made manadatory for elimination of the null values, hence if the user tries to submit the form empty or when valuation value is not number or less than zero. 
![This is an image](/assets/src4.png)

If one of other is not entered. 
![This is an image](/assets/src7.png)

Hence, when entered values properly, it will continue the process. 
![This is an image](/assets/src5.png)

On successful addition, a success message with property ID is displayed. The table is updated along with the total valuation value. 
![This is an image](/assets/src6.png)