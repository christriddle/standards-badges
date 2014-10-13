# standards-badges

A way of bragging about your compliance with company standards

## Installation

```
npm install
node app.js
```

## Badges

This service lets you expose badges on your Github readme. The aim is to show what standards the project satisfies.

A badge has the following properties:
* `Name` - The name of the badge/standard for identification.
* `Badge text` - The text that displayed on the badge describing the standard.
* `Status`  - One each for each state [Pass, Version Fail, Fail]. The text that is displayed on the badge depending on the badge pass state. 
* `Description` - Used for tooltip text.
* `Version` - Badges are versioned, so for example you might pass an earlier version of the requirements for a badge, but not the later.

States:
* `Pass` - The current version of the standard is being followed
* `Version Fail` - A previous version of the standard is being followed, but not the current version.
* `Fail` - The standard is not being followed (or does not exist in the request query parameters).

### /?badge_name=version&badge_name=version

* `badge_name=version` - Current badges and versions:
  * serviceStatusEndpoint = 1
  * logSchema = 1

To omit a badge, set version to 0 in the query parameters.

### /image?badge_name=version&badge_name=version

Gets a dynamic image containing the badges. For use in the Github readme. See the above method for more information.

## Configuration

The file `badge-config.js` contains all configuration.

## Generating images

Due to being lazy, images have to be generated at the moment. This can be done by running the script in the images directory.

```
cd images
node generateBadges.js
```

The images have the form: badge_name-badge_status-colour.png