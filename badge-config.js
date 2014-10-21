module.exports = {
    badges: {
        serviceStatusEndpoint: {
            text: 'Service_Status',
            passStatus: 'Present',
            versionFailStatus: 'Present',
            failStatus: 'Not_present',
            version: 1,
            description: 'Each application instance should have a http endpoint to provide information about the health of that instance.'
        },
        logSchema: {
            text: 'OT_log_schema',
            passStatus: 'Pass',
            versionFailStatus: 'Outdated',
            failStatus: 'No',
            version: 2,
            description: 'Each application should log to our logging infrastructure with the correct logging schema.'
        },
        githubReadme: {
            text: 'Github_readme',
            passStatus: 'Present',
            versionFailStatus: '',
            failStatus: 'Not_present',
            version: 1,
            description: 'Each project should have a Github readme with information about the project, or a link to the information in the wiki.'
        }
    },
    ignoreStatus: 'Ignored',
    badgeUrlTemplate: 'http://img.shields.io/badge/%s-%s-%s.%s',
    badgeAltTemplate: '%s: %s [%s]',
    badgeFilenameTemplate : '%s-%s-%s.png',
    passColour: 'green',
    versionFailColour: 'orange',
    failColour: 'red',
    ignoreColour: 'gray'
}