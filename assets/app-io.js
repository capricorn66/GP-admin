// vendor: JQuery v3.4.1
import JQuery from 'jquery';
window.$ = window.JQuery = JQuery;

// vendor: Bootstrap v4.3.1 (https://getbootstrap.com/) with popper v1.14.7
import 'popper.js';
import 'bootstrap';

// rwdMedia
import rwdMedia from './js/rwdMedia.js';
window.rwdMedia = rwdMedia;

// waves
import {wavesInit} from './js/waves.js';
window.wavesInit = wavesInit;

// bodyLock
import {bodyLock} from './js/body-lock.js';
window.bodyLock = bodyLock;


function tagglePass(elem) {
    const $this = $(elem);
    const thisType = $this.attr('type');

    if (thisType === 'password') {
        $this.attr('type', 'text');
        $this.next();
        $('.icon-eye-slash', $this.next()).removeClass('d-none');
        $('.icon-eye', $this.next()).addClass('d-none');
    }
    else if (thisType === 'text') {
        $this.attr('type', 'password');
        $('.icon-eye-slash', $this.next()).addClass('d-none');
        $('.icon-eye', $this.next()).removeClass('d-none');
    }
}

window.tagglePass = tagglePass;

$(document).ready( function() {

    wavesInit();

});



import './scss/app-io.scss';
