var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Notification Model
 * =============
 */

var Notification = new keystone.List('Notification', {
    defaultSort: "time"
});

Notification.add({  
   message: {type: String, required: true, initial: true},
   time: {type: Types.Datetime, required: true, initial: true, default: Date.now, format: 'MM/DD/YYYY hh:mm A'},
   sent: {type: Types.Boolean, initial: true, default: false},
   ministries: {type: Types.Relationship, initial: true, many: true, ref: 'Ministry', label: 'Ministries to send to (none = everyone)'}
});

Notification.defaultColumns = 'message, sent, time, ministries';
Notification.register();