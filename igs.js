var request = require('sync-request');

function Stories(mediatype , img , video , link ){
    this.mediatype=mediatype;
    this.img=img;
    this.video=video;
    this.link=link;
}

var fd = {
    getDescriptor: function (profile_name) {
        try{
            var res = request('POST', 'https://api.insta-stories.ru/profile', {
                json: {
                    string: profile_name
                }
            });
            var fd = res.getBody('utf8');
            fd = JSON.parse(fd);
            return fd;
        }catch(e){
            fd = JSON.parse(e.body);
            return fd;
        }
    },
    getProfileImagefd: function (fd){
        if(fd.hasOwnProperty('user')){
            return fd.user.picture;
        }else if(fd.hasOwnProperty('username')){
            return fd.username.picture;
        }
        return null;
    },
    getStoriesfd: function (fd){
        if(fd!=null){
            var stories = [];
            if(!fd.hasOwnProperty('stories')){
                return null;
            }
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
        return null;
    }
};

module.exports = fd ; 
