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
            text: 'OT_logs',
            passStatus: 'Pass',
            versionFailStatus: 'Old',
            failStatus: 'No',
            version: 1,
            description: 'Clobber'
        }
    },
    badgeUrlTemplate: 'http://img.shields.io/badge/%s-%s-%s.%s',
    badgeAltTemplate: '%s: %s [%s]',
    badgeFilenameTemplate : '%s-%s-%s.png',
    passColour: 'green',
    versionFailColour: 'orange',
    failColour: 'red'
}