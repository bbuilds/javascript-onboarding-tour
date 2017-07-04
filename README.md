# JavaScript Onboarding Tour

A basic on-boarding tour created with Javascript. Created using object oriented programming with vanilla JavaScript. No dependencies needed.

## Project Structure

The project uses a template from Foundation with it's default JS and CSS files. Using custom made data attributes on HTML element 

### Files

These files below are where to look for the code used to create the website guide.

```
index.html - added data attributes with JSON for the tour stops
app.js - used to call the tour function
aptour.js - file where the AP tour and it's constructor funcitons are called

```

### Usage

Add the data attribute  "data-aptour" to the HTML element you want to highlight in the guide. 
Use title to give a title to the item.
Use desc to give a short description of the item.
Use position to direct where the tour window will be placed in relation to the item.
Position can be top, right, bottom, left.


```
 <div data-aptour='{"title": "Responsive Menu", "desc": "Our new and improved menu system", "position": "bottom"}'> 
```

