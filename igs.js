var request = require('sync-request');

function Stories(mediatype , img , video , link ){
    this.mediatype=mediatype;
    this.img=img;
    this.video=video;
    this.link=link;
}

var fd = {
    getDescriptor: function (profile_name) {
        var res = request('POST', 'https://api.insta-stories.ru/profile', {
            json: {
                string: profile_name
            }
        });
        var fd = res.getBody('utf8');
        fd = JSON.parse(fd);
        return fd;
    },
    getProfileImage: function (name) {
        fd=this.getDescriptor(name);
        var profile_image = fd.user.picture;
        return profile_image;
    },
    getProfileImagefd: function (fd){
        return fd.user.picture;
    },
    getFullName: function (name) {
        fd=this.getDescriptor(name);
        var fullName = fd.user.fullName;
        return fullName;
    },
    getStories: function (name) {
        var fd = this.getDescriptor(name);
        var stories = [];
        var num_element = fd.stories.length ; 
        if(num_element < 0 ){
            return null; 
        }
        for(i = 0 ; i< num_element ; i++){
            var story= fd.stories[i];
            stories[stories.length] = new Stories (story.mediaType, story.img, story.video, story.link);
        }
        return stories; 
    },
    getStoriesfd: function (fd){
        var stories = [];
        var num_element = fd.stories.length ; 
        if(num_element < 0 ){
            return null; 
        }
        for(i = 0 ; i< num_element ; i++){
            var story= fd.stories[i];
            stories[stories.length] = new Stories (story.mediaType, story.img, story.video, story.link);
        }
        return stories;
    }
};

module.exports = fd ; 