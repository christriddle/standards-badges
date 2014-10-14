module.exports = {
    badges: {
        serviceStatusEndpoint: {
            text: 'Service_Status',
            passStatus: 'Present',
            versionFailStatus: 'Present',
            failStatus: 'Not_present',
            version: 1,
            description: 'This project has a service status endpoint'
        },
        logSchema: {
            text: 'OT_log_schema',
            passStatus: 'Pass',
            versionFailStatus: 'Old',
            failStatus: 'No',
            version: 2,
            description: 'This service logs with the correct OT log schema'
        },
        githubReadme: {
            text: 'Github_readme',
            passStatus: 'Present',
            versionFailStatus: '',
            failStatus: 'Not_present',
            version: 1,
            description: 'This project has a Github readme'
        }
    },
    badgeUrlTemplate: 'http://img.shields.io/badge/%s-%s-%s.%s',
    badgeAltTemplate: '%s: %s [%s]',
    badgeFilenameTemplate : '%s-%s-%s.png',
    passColour: 'green',
    versionFailColour: 'orange',
    failColour: 'red'
}