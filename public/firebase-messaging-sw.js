self.addEventListener("install", function () {
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("push", function (event) {
  var title = "Jesus tem sua resposta";
  var options = {
    body: "Você recebeu uma nova mensagem.",
    icon: "/logo.png",
    badge: "/favicon-32x32.png",
    data: {
      url: "/"
    }
  };

  if (event.data) {
    try {
      var payload = event.data.json();

      if (payload.notification) {
        title = payload.notification.title || title;
        options.body = payload.notification.body || options.body;
        options.icon = payload.notification.icon || options.icon;
      }

      if (payload.data) {
        title = payload.data.title || title;
        options.body = payload.data.body || options.body;
        options.data.url = payload.data.url || "/";
      }
    } catch (error) {
      options.body = event.data.text();
    }
  }

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  var url = event.notification.data && event.notification.data.url
    ? event.notification.data.url
    : "/";

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(function (clientList) {
      for (var i = 0; i < clientList.length; i++) {
        var client = clientList[i];

        if (client.url.includes(self.location.origin) && "focus" in client) {
          return client.focus();
        }
      }

      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});