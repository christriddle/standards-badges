# standards-badges

A way of bragging about your compliance with company standards

[<img src="http://standards-badges.herokuapp.com/image?appName=standards-badges&serviceStatusEndpoint=0&logSchema=0&githubReadme=1">](http://standards-badges.herokuapp.com/image?appName=standards-badges&serviceStatusEndpoint=0&logSchema=0&githubReadme=1)

## Using on your Github readme

These badges are designed to be displayed on your projects Github readme.
 
You can add badges to your readme by adding a link to a dynamic image that is configured by query string parameters.
 
A good place to start is to add this to your README.md markdown:

```
[<img src="http://standards-badges.herokuapp.com/image?appName=your-app-name&serviceStatusEndpoint=1">](http://standards-badges.herokuapp.com/image?appName=your-app-name&serviceStatusEndpoint=1)
```

Note, in this example, the 'serviceStatusEndpoint' badge will show as being present (and green). All other badges will be in a failed state, but still displayed.

### Removing a badge

To opt-out of a standard (and remove the badge from the image), set the name of the badge in the query string to 0. E.g. logSchema=0.

### Versioning of badges

Sometimes a badge's meaning changes, for example if an additional conditions to achieve a badge is added.
This is handled by the badge having a version in the configuration.

The assigned value in the query string (e.g. serviceStatusEndpoint=1) relates to the version of that standard the project is currently passing.
If that value is less that the current version of the badge, you will get what is called a 'version failed' state.

If you want to set the image to pass a the latest version of the badge, set the query string parameter for that badge to equal the current version of the badge.

### Additional details

You might notice in the example above, the badge image is also a link to an page that is very similar to the image url.

Following the link will show more information about the badges, along with the current state of them.

Note, you must supply the exact same query string parameters to the link as to the image.

### Readme Example

![Application View](screenshots/ApplicationView.png)

## Installation

```
npm install
npm start
```

## Config

The file `badge-config.js` contains all configuration.

### Badges

This service lets you expose badges on your Github readme. The aim is to show what standards the project satisfies.

A badge has the following properties:
* `Name` - The name of the badge/standard for identification.
* `Badge text` - The text that displayed on the badge describing the standard.
* `Status`  - One each for each state [Pass, Version Fail, Fail]. The text that is displayed on the badge depending on the badge pass state. 
* `Description` - Used for to describe the badge.
* `Version` - Badges are versioned, so for example you might pass an earlier version of the requirements for a badge, but not the later.

States:
* `Pass` - The current version of the standard is being followed
* `Version Fail` - A previous version of the standard is being followed, but not the current version.
* `Fail` - The standard is not being followed (or does not exist in the request query parameters).

## API

### /?appName=applicationName&badge_name=version&badge_name=version

* `badge_name=version` - Current badges and versions:
  * serviceStatusEndpoint = 1
  * logSchema = 2
  * githubReadme = 1

To omit a badge, set version to 0 in the query parameters.

### /image?badge_name=version&badge_name=version

Gets a dynamic image containing the badges. For use in the Github readme. See the above method for more information.

## Generating images

Due to being lazy, images have to be generated at the moment. This can be done by running the script in the images directory.

```
cd images
node generateBadges.js
```

The images have the form: badge_name-badge_status-colour.png