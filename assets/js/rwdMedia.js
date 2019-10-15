const rwdMedia = {
    bs4_xs: function() {
        return document.getElementsByClassName('bs4-xs')[0].offsetParent ? !null : null;
    },
    bs4_sm: function() {
        return document.getElementsByClassName('bs4-sm')[0].offsetParent ? !null : null;
    },
    bs4_md: function() {
        return document.getElementsByClassName('bs4-md')[0].offsetParent ? !null : null;
    },
    bs4_lg: function() {
        return document.getElementsByClassName('bs4-lg')[0].offsetParent ? !null : null;
    },
    bs4_xl: function() {
        return document.getElementsByClassName('bs4-xl')[0].offsetParent ? !null : null;
    }
};

export default rwdMedia;

/*

Place the following html code near the end of your pages, right before the closing </body> tag

<div class="bs4-xs d-block d-sm-none"></div>
<div class="bs4-sm d-none d-sm-block d-md-none"></div>
<div class="bs4-md d-none d-md-block d-lg-none"></div>
<div class="bs4-lg d-none d-lg-block d-xl-none"></div>
<div class="bs4-xl d-none d-xl-block"></div>
*/

