import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, Alert, StyleSheet } from "react-native";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";

const SetNotification = () => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [reminders, setReminders] = useState([]);
  

  useEffect(() => {
    // Load stored reminders on component mount
    loadReminders();

    // Add notification response listener
    const subscription = Notifications.addNotificationResponseReceivedListener(
      async (response) => {
        // Dismiss the notification from the tray
        await Notifications.dismissNotificationAsync(
          response.notification.request.identifier
        );
      }
    );

    // Cleanup listener on component unmount
    return () => {
      subscription.remove();
    };
  }, []);

  const loadReminders = async () => {
    try {
      const storedReminders = await AsyncStorage.getItem("reminders");
      if (storedReminders) {
        setReminders(JSON.parse(storedReminders));
      }
    } catch (error) {
      console.log("Error loading reminders:", error);
    }
  };

  const handleSetReminder = async () => {
    try {
      // Schedule notification
      const identifier = await Notifications.scheduleNotificationAsync({
        content: {
          title: "Workout Reminder",
          body: "Time for your workout!",
          sound: "default", // Add sound here
        },
        trigger: {
          hour: date.getHours(),
          minute: date.getMinutes(),
          repeats: true, // Daily reminder
        },
      });

      const newReminder = { id: identifier, date };
      const updatedReminders = [...reminders, newReminder];

      // Save reminder to AsyncStorage
      await AsyncStorage.setItem("reminders", JSON.stringify(updatedReminders));
      setReminders(updatedReminders);

      Alert.alert(
        "Reminder Set",
        `Your reminder is set for ${date.toLocaleTimeString()}`
      );
    } catch (error) {
      console.log("Error setting reminder:", error);
    }
  };

  const handleRemoveReminder = async (id) => {
    try {
      // Cancel notification
      await Notifications.cancelScheduledNotificationAsync(id);

      const updatedReminders = reminders.filter(
        (reminder) => reminder.id !== id
      );
      setReminders(updatedReminders);

      // Update AsyncStorage
      await AsyncStorage.setItem("reminders", JSON.stringify(updatedReminders));
    } catch (error) {
      console.log("Error removing reminder:", error);
    }
  };

  const showDatePickerHandler = () => {
    setShowDatePicker(true);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Set Workout Reminder
      </Text>

      <Button title="Choose Date & Time" onPress={showDatePickerHandler} />

      {/* Display selected date */}
      <Text style={styles.selectedDateText}>
        {date && `Selected Date: ${date.toLocaleTimeString()}`}
      </Text>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="time"
          display="default"
          onChange={handleDateChange}
        />
      )}

      {/* Button to Set Reminder */}
      <Button
        title="Set Reminder"
        onPress={handleSetReminder}
        style={styles.setReminderButton}
      />

      <Text style={{ marginTop: 20, fontSize: 18 }}>Existing Reminders:</Text>
      <FlatList
        data={reminders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 5,
            }}
          >
            <Text>{`Reminder at: ${new Date(
              item.date
            ).toLocaleTimeString()}, Daily`}</Text>
            <Button
              title="Remove"
              onPress={() => handleRemoveReminder(item.id)}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  selectedDateText: {
    fontSize: 16,
    marginVertical: 10,
    color: "#555",
  },
  setReminderButton: {
    marginTop: 20,
  },
});

export default SetNotification;
