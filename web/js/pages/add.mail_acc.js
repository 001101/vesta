App.Actions.MAIL_ACC.enable_unlimited = function(elm, source_elm) {
    $(elm).data('checked', true);
    $(elm).data('prev_value', $(elm).val()); // save prev value in order to restore if needed
    $(elm).val(App.Constants.UNLIM_TRANSLATED_VALUE);
    $(elm).attr('disabled', true);
    $(source_elm).css('opacity', '1');
}

App.Actions.MAIL_ACC.disable_unlimited = function(elm, source_elm) {
    $(elm).data('checked', false);
    if ($(elm).data('prev_value') && $(elm).data('prev_value').trim() != '') {
        var prev_value = $(elm).data('prev_value').trim();
        $(elm).val(prev_value);
        if (App.Helpers.isUnlimitedValue(prev_value)) {
            $(elm).val('0');
        }
    }
    else {
        if (App.Helpers.isUnlimitedValue($(elm).val())) {
            $(elm).val('0');
        }
    }
    $(elm).attr('disabled', false);
    $(source_elm).css('opacity', '0.5');
}

// 
App.Actions.MAIL_ACC.toggle_unlimited_feature = function(evt) {
    var elm = $(evt.target);
    var ref = elm.prev('.vst-input');
    if (!$(ref).data('checked')) {
        App.Actions.MAIL_ACC.enable_unlimited(ref, elm);
    }
    else {
        App.Actions.MAIL_ACC.disable_unlimited(ref, elm);
    }
}

App.Listeners.MAIL_ACC.checkbox_unlimited_feature = function() {
    $('.unlim-trigger').on('click', App.Actions.MAIL_ACC.toggle_unlimited_feature);
}

App.Listeners.MAIL_ACC.init = function() {
    $('.unlim-trigger').each(function(i, elm) {
        var ref = $(elm).prev('.vst-input');
        if (App.Helpers.isUnlimitedValue($(ref).val())) {
            App.Actions.MAIL_ACC.enable_unlimited(ref, elm);
        }
        else {
            $(ref).data('prev_value', $(ref).val());
            App.Actions.MAIL_ACC.disable_unlimited(ref, elm);
        }
    });
}

App.Helpers.isUnlimitedValue = function(value) {
    var value = value.trim();
    if (value == App.Constants.UNLIM_VALUE || value == App.Constants.UNLIM_TRANSLATED_VALUE) {
        return true;
    }

    return false;
}

//
// Page entry point
// Trigger listeners
App.Listeners.MAIL_ACC.init();
App.Listeners.MAIL_ACC.checkbox_unlimited_feature();
$('form[name="v_quota"]').bind('submit', function(evt) {
    $('input:disabled').each(function(i, elm) {
        $(elm).attr('disabled', false);
        if (App.Helpers.isUnlimitedValue($(elm).val())) {
            $(elm).val(App.Constants.UNLIM_VALUE);
        }
    });
});


