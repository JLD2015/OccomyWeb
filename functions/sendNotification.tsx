import admin from "../firebase/firebase";

export function sendNotification(
  registrationToken: string,
  title: string,
  body: string,
  callback: (arg0: string) => void
) {
  var payload = {
    notification: {
      title: title,
      body: body,
      sound: "default",
    },
  };

  var options = {
    priority: "high",
  };

  admin
    .messaging()
    .sendToDevice(registrationToken, payload, options)
    .then(function (response) {
      callback("Notification sent");
      if (response.results[0].error != null) {
        callback("Failed");
      } else {
        callback("Success");
      }
    })
    .catch(function (error) {
      callback("Failed");
    });
}

export async function addNotification(userID: string, newNotification: string) {
  // We first need a copy of the user's notifications
  const userRef = admin.firestore().collection("users").doc(userID);
  const doc = await userRef.get();
  if (!doc.exists) {
    console.log("User does not exist");
  } else {
    const notifications = doc.data().notifications;

    // Add new notification and update
    notifications.push(newNotification);

    await userRef.update({ notifications: notifications });
  }
}
