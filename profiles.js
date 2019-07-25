var fs = require('fs');

var profilesList = {
    getProfiles: function(){
        var profiles = [] ;
        fs.readFileSync('igprofiles.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
        profiles[profiles.length] = line;
        });

        return profiles ;
    }
};

module.exports = profilesList ; 




