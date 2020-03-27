// JavaScript Document

import $ from "jquery";
import 'popper.js';
import 'bootstrap';

import debounce from 'lodash.debounce';
import swipe from 'jquery-touchswipe';
import selectpicker from 'bootstrap-select';
import moment from 'moment';
import daterangepicker from 'daterangepicker';
import {rwdMedia} from "./rwdMedia";
import {wavesInit} from './waves.js';
import bsSelectInit from './bootstrap-select.js';
import {bodyLock} from './body-lock.js';
import {sidebarInit} from './sidebar.js';
import DataTable from 'datatables.net-dt';

window.debounce = debounce;
window.swipe = swipe;
window.selectpicker = selectpicker;
window.moment = moment;
window.daterangepicker = daterangepicker;
window.rwdMedia = rwdMedia;
window.wavesInit = wavesInit;
window.bsSelectInit = bsSelectInit;
window.bodyLock = bodyLock;
window.sidebarInit = sidebarInit;
window.DataTable = DataTable;

sidebarInit();


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

    $('.js-date-picker').daterangepicker({
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



    const jsSingleDatePicker= $('.js-single-date-picker')

    $('.js-single-date-picker').daterangepicker({
        singleDatePicker: true,
        autoUpdateInput: false,
        startDate: '+1d',
        cancelClass: "btn-secondary",
        parentEl: '#view',
        locale: {
            format: 'DD.MM.YYYY'
        }
    }).data('daterangepicker');

    jsSingleDatePicker.on('apply.daterangepicker', function(ev, picker) {
        $(this).val(picker.startDate.format('DD.MM.YYYY hh:mm'));
    });

    jsSingleDatePicker.on('cancel.daterangepicker', function(ev, picker) {
        $(this).val('');
    });


    const jsSingleDateTimePicker= $('.js-single-date-time-picker')

    jsSingleDateTimePicker.daterangepicker({
        singleDatePicker: true,
        autoUpdateInput: false,
        timePicker: true,
        timePicker24Hour: true,
        startDate: '+1d',
        cancelClass: "btn-secondary",
        parentEl: '#view',
        locale: {
            format: 'DD.MM.YYYY hh:mm'
        }
    }).data('daterangepicker');

    jsSingleDateTimePicker.on('apply.daterangepicker', function(ev, picker) {
        $(this).val(picker.startDate.format('DD.MM.YYYY hh:mm'));
    });

    jsSingleDateTimePicker.on('cancel.daterangepicker', function(ev, picker) {
        $(this).val('');
    });


    $('.js-custom-select').bsSelectInit();

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
