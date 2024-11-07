import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

const CountdownTimer = ({ expiryDate }) => {
  const calculateTimeLeft = () => {
    const difference = new Date(expiryDate) - new Date();

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const renderTimer = () => {
    return Object.keys(timeLeft).length > 0 ? (
      <Text className="text-light my-2">{`${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m `}</Text>
    ) : (
      <Text className="text-light my-2">Subscription Expired</Text>
    );
  };

  return <View>{renderTimer()}</View>;
};

export default CountdownTimer;
