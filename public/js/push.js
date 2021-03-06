$.ajax({
    type: 'get',
    url: 'api/campus/list',
    success: function(response) {
        var campuses = $(response);
        
        campuses.each(function(index, campus) {
            $('select[name="ministries[]"]').append("<option data-id='" + campus._id + "' disabled>----- " + campus.name + " -----</option>");
            
            $.ajax({
                type: 'post',
                url: 'api/ministry/find',
                data: {campuses : campus._id},
                async: false,
                success: function(ministries) {
                    var ministries = $(ministries);
                    
                    ministries.each(function(index, ministry) {
                        $('#push-form select[name="ministries[]"]').append("<option value='" + ministry._id + "'>" + ministry.name + "</option>");
                        $('#schedule-form select[name="ministries[]"]').append("<option value='" + ministry._id + "'>" + ministry.name + "</option>");
                    });
                }
            });
        });
        $('select[name="ministries[]"]').attr('size', $('#push-form select[name="ministries[]"] option').length);
    }
})

$("#push-form").ajaxForm({
    success: function(response) {
        if (response.success == true) {
            $('#result').html("Message sent successfully");
            $('#result').removeClass('text-danger');
            $('#result').addClass('text-success');

            $.ajax({
                type: 'POST',
                url: 'api/notification/create',
                data: {
                    message: $("#push-form textarea").val(),
                    sent: true,
                    ministries: $("#push-form select").val(),
                    time: new Date(Date.now)}
            });
        }           
        else {
            $('#result').html("Message failed to send"); 
            $('#result').removeClass('text-success');
            $('#result').addClass('text-danger');
        }
    }
});

$("#schedule-form").ajaxForm({
    beforeSubmit: function(arr, $form, options) {         
        var time = new Date(arr[1].value);
        arr[1].value = time.toISOString();
    },
    success: function(response) {
        $("#scheduled-notifications").load('/notifications/renderScheduledNotifications');
    }
});

$("#datetimepicker").datetimepicker({
    format: 'YYYY-MM-DD hh:mm A'
    });

$(".list-group-item").click(function() {
    var item = $(this);
    $('#event-notifications').load('/notifications/renderEventNotifications', {event_id: item.attr('data-id')}, function() {
        $('#create-event-notification-form').ajaxForm({
            success: function() {
                $('#event-notification-table').load('/notifications/renderEventNotificationTable', {event_id: item.attr('data-id')});
            }
        });
    });
})