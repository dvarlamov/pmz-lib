"use strict";
var metadata_1 = require('../model/metadata');
function load(ini) {
    var options = ini.Options;
    var delayNames = (options['DelayNames'] || '').split('\n');
    return new metadata_1.PmzMetadata(options.Name, options.CityName, options.Country, options.NeedVersion, options.MapAuthors.reduce(function (a, c) { return a + '\n' + c; }), options['Comment'], delayNames);
}
exports.load = load;
function save(metadata) {
    var ini = {
        Options: {
            Name: metadata.name,
            CityName: metadata.cityName || 'Unknown',
            Country: metadata.countryName || 'Unknown',
            NeedVersion: metadata.version || '1.0.0',
            MapAuthors: (metadata.description || '').split('\n')
        }
    };
    if (metadata.comment) {
        ini.Options.Comment = metadata.comment;
    }
    if (metadata.delays) {
        ini.Options.DelayNames = metadata.delays.reduce(function (a, c) { return a + ',' + c; });
    }
    return ini;
}
exports.save = save;
