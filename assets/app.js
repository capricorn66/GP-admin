// vendor: JQuery v3.4.1
import JQuery from 'jquery';
window.$ = window.JQuery = JQuery;

// vendor: Bootstrap v4.3.1 (https://getbootstrap.com/) with popper v1.14.7
import 'popper.js';
import 'bootstrap';

// vendor: lodash.debounce v4.0.8
import debounce from 'lodash.debounce';
window.debounce = debounce;

// vendor: jquery-touchswipe v1.6.19,
import swipe from 'jquery-touchswipe';
window.swipe = swipe;

// vendor: bootstrap-select v1.13.10,
import selectpicker from 'bootstrap-select';
window.selectpicker = selectpicker;

// vendor: moment v2.24.0,
import moment from 'moment';
window.moment = moment;

// vendor: daterangepicker v3.0.5,
import daterangepicker from 'daterangepicker';
window.daterangepicker = daterangepicker;

// rwdMedia
import rwdMedia from './js/rwdMedia.js';
window.rwdMedia = rwdMedia;

// waves
import {wavesInit} from './js/waves.js';
window.wavesInit = wavesInit;

// bootstrap-select custom
import bsSelectInit from './js/bootstrap-select.js';
window.bsSelectInit = bsSelectInit;

// bodyLock
import {bodyLock} from './js/body-lock.js';
window.bodyLock = bodyLock;

// sidebar
import {sidebarInit} from './js/sidebar.js';
window.sidebarInit = sidebarInit;
sidebarInit();

// dataTable
import DataTable from 'datatables.net-dt';
window.DataTable = DataTable;


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

    $('.btn-accordion .btn').click(function(event) {
        event.preventDefault();
        event.stopPropagation();
        var modalId = $(this).attr('id');
        $(modalId).modal();
    });

    moment.locale('pl');

    $('.date-picker').daterangepicker({
        timePicker: true,
        timePicker24Hour: true,
        useSeconds: false,
        timePickerIncrement: 30,
        cancelClass: "btn-secondary",
        timePickerSeconds: false,
        parentEl: '#view',
        locale: {
            format: 'HH:mm',
            cancelLabel: 'ANULUJ',
            applyLabel: 'ZAPISZ',
        }
    }).on('show.daterangepicker', function (ev, picker) {
        picker.container.find(".calendar-table").hide();
        picker.container.addClass('timePicker');
    });

    $('.single-date-picker').daterangepicker({
        singleDatePicker: true,
        startDate: '+1d',
        cancelClass: "btn-secondary",
        parentEl: '#view',
        locale: {
            format: 'DD.MM.YYYY'
        }
    }).data('daterangepicker');

    $('.sort-table').DataTable({
        "lengthChange": false,
        "ordering": true,
        "info": false,
        "paging": false,
        "searching": false,
        "order": [[ 1, "desc" ]]
    });

    $('.custom-select').bsSelectInit();

    function selectRow(elem) {
        let $this = $(elem),
            $row = $(elem).closest('tr');

        if ($this.prop("checked") === true){
            $row.removeClass('unselected');
            $row.addClass('selected');
        } else if ($this.prop("checked") === false){
            $row.removeClass('selected');
            $row.addClass('unselected');
        }
    }

    window.selectRow = selectRow;

});



import './scss/app.scss';
