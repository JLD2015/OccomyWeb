import apn from "apn";

export function APNsNotification(deviceToken: string, title: string, body: string) {
  let provider = new apn.Provider({
    token: {
      key: "certificates/apnskey.p8",
      keyId: "CSV4ZA2D57",
      teamId: "838HD9T5J5",
    },
    production: false,
  });

  var notification = new apn.Notification();
  notification.alert = {
    title: title,
    body: body,
  };
  notification.mutableContent = true;
  notification.sound = "bingbong.aiff";
  notification.topic = "com.occomy.Occomy";

  provider.send(notification, deviceToken).then((result) => {
    // see documentation for an explanation of result
    if (result.failed.length > 0) {
      console.log("Could not send APNs notification");
      console.log(result.failed);
    } else {
      console.log(result);
    }

    // Shut down the provider once the notification has been sent
    provider.shutdown();
  });
}
