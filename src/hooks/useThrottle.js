/**
 * useThrottle.js
 *
 * Returns a throttled version of the given value.
 * Limits how often a value updates, useful for scroll/resize events.
 *
 * @param {any} value - The value to throttle
 * @param {number} limit - Minimum time between updates in ms (default: 200ms)
 * @returns throttled value
 */

import { useState, useEffect, useRef } from 'react';

const useThrottle = (value, limit = 200) => {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastUpdated = useRef(Date.now());

  useEffect(() => {
    const now = Date.now();
    // Only update if enough time has passed since last update
    if (now - lastUpdated.current >= limit) {
      setThrottledValue(value);
      lastUpdated.current = now;
    } else {
      // Schedule an update for when the throttle window expires
      const timer = setTimeout(() => {
        setThrottledValue(value);
        lastUpdated.current = Date.now();
      }, limit - (now - lastUpdated.current));

      return () => clearTimeout(timer);
    }
  }, [value, limit]);

  return throttledValue;
};

export default useThrottle;
