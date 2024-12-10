import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  Alert,
  StyleSheet,
  Platform,
  Pressable,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SetNotification = () => {
  const [date, setDate] = useState(new Date()); // Holds the selected date
  const [time, setTime] = useState(new Date()); // Holds the selected time
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    loadReminders();

    const subscription = Notifications.addNotificationResponseReceivedListener(
      async (response) => {
        await Notifications.dismissNotificationAsync(
          response.notification.request.identifier
        );
      }
    );

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
      const combinedDateTime = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        time.getHours(),
        time.getMinutes()
      );

      if (combinedDateTime <= new Date()) {
        Alert.alert(
          "Invalid Date/Time",
          "Please select a future date and time."
        );
        return;
      }

      const identifier = await Notifications.scheduleNotificationAsync({
        content: {
          title: "Workout Reminder",
          body: "Time for your workout!",
          sound: "default",
        },
        trigger: combinedDateTime,
      });

      const newReminder = { id: identifier, dateTime: combinedDateTime };
      const updatedReminders = [...reminders, newReminder];

      await AsyncStorage.setItem("reminders", JSON.stringify(updatedReminders));
      setReminders(updatedReminders);

      Alert.alert(
        "Reminder Set",
        `Your reminder is set for ${combinedDateTime.toLocaleString()}`
      );
    } catch (error) {
      console.log("Error setting reminder:", error);
    }
  };

  const handleRemoveReminder = async (id) => {
    try {
      await Notifications.cancelScheduledNotificationAsync(id);

      const updatedReminders = reminders.filter(
        (reminder) => reminder.id !== id
      );
      setReminders(updatedReminders);

      await AsyncStorage.setItem("reminders", JSON.stringify(updatedReminders));
    } catch (error) {
      console.log("Error removing reminder:", error);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    if (event.type === "set" && selectedDate) {
      setDate(selectedDate);
    }
    setShowDatePicker(false);
  };

  const handleTimeChange = (event, selectedTime) => {
    if (event.type === "set" && selectedTime) {
      setTime(selectedTime);
    }
    setShowTimePicker(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Set Workout Reminder</Text>

      {/* Buttons for Selecting Date and Time */}
      <View className="flex-row justify-between items-center ">
        <Pressable
          className="bg-primary w-[45%] px-3 py-2 rounded-md   "
          onPress={() => setShowDatePicker(true)}
        >
          <Text className="text-center text-light ">Choose Date</Text>
        </Pressable>
        <Pressable
          className="bg-primary w-[45%] px-3 py-2 rounded-md   "
          onPress={() => setShowTimePicker(true)}
        >
          <Text className="text-center text-light ">Choose Time</Text>
        </Pressable>
      </View>

      {/* Display Selected Date and Time */}
      <Text style={styles.selectedDateText}>{`Selected Date & Time:`}</Text>
      <Text className="my-3 font-bold text-md ">
        {`${date.toLocaleDateString()} At ${time.toLocaleTimeString()}`}
      </Text>

      {/* DateTimePickers */}
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === "ios" ? "inline" : "default"}
          onChange={handleDateChange}
        />
      )}
      {showTimePicker && (
        <DateTimePicker
          value={time}
          mode="time"
          display={Platform.OS === "ios" ? "inline" : "default"}
          onChange={handleTimeChange}
        />
      )}

      {/* Button to Set Reminder */}
      <Button title="Set Reminder" onPress={handleSetReminder} />

      <Text style={styles.remindersHeader}>Existing Reminders:</Text>
      <FlatList
        data={reminders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.reminderItem}>
            <Text>{`Reminder at: ${new Date(
              item.dateTime
            ).toLocaleString()}`}</Text>
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
  container: {
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  selectedDateText: {
    fontSize: 16,
    marginVertical: 10,
    color: "#555",
  },
  remindersHeader: {
    marginTop: 20,
    fontSize: 18,
  },
  reminderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
    alignItems: 'center',
  },
});

export default SetNotification;
