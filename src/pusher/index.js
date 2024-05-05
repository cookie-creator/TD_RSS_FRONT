import Pusher from "pusher-js";

const pusher = {
    pusher : {},
    channel : {},
    init: function () {
        Pusher.logToConsole = true;

        pusher.value = new Pusher(import.meta.env.VITE_APP_PUSHER_APP_KEY,
            {
                cluster: 'eu',
                channelAuthorization: {
                    endpoint: import.meta.env.VITE_APP_REMOTE_API_URL + 'api/v1/broadcasting/auth'
                },
            });

        channel.value = pusher.value.subscribe('notification.User.' + res.user.id);
        channel.value.bind('NewNotificationCreatedBroadcastEvent', function(data) {
            app.messages.peush(JSON.stringify(data));
        });
    }
}

export default pusher;