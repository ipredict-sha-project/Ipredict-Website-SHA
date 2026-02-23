import { collection, getDocs, query, where, orderBy, limit, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';

/**
 * Fetch devices with high failure risk
 * @param {number} minProbability - Minimum failure probability (default 35)
 * @param {number} maxDevices - Maximum number of devices to return (default 4)
 * @returns {Promise<Array>} Array of device objects
 */
export const fetchDevicesAtRisk = async (minProbability = 35, maxDevices = 4) => {
  try {
    const devicesRef = collection(db, 'devices');
    const q = query(
      devicesRef,
      where('failureProbability', '>=', minProbability),
      orderBy('failureProbability', 'desc'),
      limit(maxDevices)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching devices at risk:', error);
    return [];
  }
};

/**
 * Fetch current system metrics
 * @returns {Promise<Object|null>} Metrics object or null
 */
export const fetchMetrics = async () => {
  try {
    const metricsRef = collection(db, 'metrics');
    const snapshot = await getDocs(metricsRef);
    if (!snapshot.empty) {
      return snapshot.docs[0].data();
    }
    return null;
  } catch (error) {
    console.error('Error fetching metrics:', error);
    return null;
  }
};

/**
 * Fetch recent alerts
 * @param {number} maxAlerts - Maximum number of alerts to return (default 7)
 * @returns {Promise<Array>} Array of alert objects
 */
export const fetchAlerts = async (maxAlerts = 7) => {
  try {
    const alertsRef = collection(db, 'alerts');
    const q = query(
      alertsRef,
      orderBy('triggeredAt', 'desc'),
      limit(maxAlerts)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching alerts:', error);
    return [];
  }
};

/**
 * Fetch dashboard statistics
 * @returns {Promise<Object|null>} Stats object or null
 */
export const fetchDashboardStats = async () => {
  try {
    const statsRef = collection(db, 'stats');
    const snapshot = await getDocs(statsRef);
    if (!snapshot.empty) {
      return snapshot.docs[0].data();
    }
    return null;
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return null;
  }
};

/**
 * Fetch risk factors data
 * @returns {Promise<Array>} Array of risk factor objects
 */
export const fetchRiskFactors = async () => {
  try {
    const riskFactorsRef = collection(db, 'riskFactors');
    const q = query(riskFactorsRef, orderBy('percentage', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching risk factors:', error);
    return [];
  }
};

/**
 * Fetch predictive insights
 * @param {number} maxInsights - Maximum number of insights to return (default 3)
 * @returns {Promise<Array>} Array of insight objects
 */
export const fetchPredictiveInsights = async (maxInsights = 3) => {
  try {
    const insightsRef = collection(db, 'predictiveInsights');
    const q = query(
      insightsRef,
      orderBy('accuracy', 'desc'),
      limit(maxInsights)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching predictive insights:', error);
    return [];
  }
};

/**
 * Subscribe to real-time metrics updates
 * @param {Function} callback - Function to call when data changes
 * @returns {Function} Unsubscribe function
 */
export const subscribeToMetrics = (callback) => {
  const metricsRef = collection(db, 'metrics');
  return onSnapshot(metricsRef, (snapshot) => {
    if (!snapshot.empty) {
      callback(snapshot.docs[0].data());
    }
  }, (error) => {
    console.error('Error subscribing to metrics:', error);
  });
};

/**
 * Subscribe to real-time alerts updates
 * @param {Function} callback - Function to call when data changes
 * @param {number} maxAlerts - Maximum number of alerts to subscribe to
 * @returns {Function} Unsubscribe function
 */
export const subscribeToAlerts = (callback, maxAlerts = 7) => {
  const alertsRef = collection(db, 'alerts');
  const q = query(
    alertsRef,
    orderBy('triggeredAt', 'desc'),
    limit(maxAlerts)
  );
  return onSnapshot(q, (snapshot) => {
    const alerts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(alerts);
  }, (error) => {
    console.error('Error subscribing to alerts:', error);
  });
};

/**
 * Fetch all devices
 * @returns {Promise<Array>} Array of device objects
 */
export const fetchDevices = async () => {
  try {
    const devicesRef = collection(db, 'devices');
    const snapshot = await getDocs(devicesRef);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching devices:', error);
    return [];
  }
};

/**
 * Fetch all sensors
 * @returns {Promise<Array>} Array of sensor objects
 */
export const fetchSensors = async () => {
  try {
    const sensorsRef = collection(db, 'sensors');
    const snapshot = await getDocs(sensorsRef);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching sensors:', error);
    return [];
  }
};

/**
 * Fetch all users
 * @returns {Promise<Array>} Array of user objects
 */
export const fetchUsers = async () => {
  try {
    const usersRef = collection(db, 'users');
    const snapshot = await getDocs(usersRef);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

/**
 * Fetch all reports
 * @returns {Promise<Array>} Array of report objects
 */
export const fetchReports = async () => {
  try {
    const reportsRef = collection(db, 'reports');
    const q = query(reportsRef, orderBy('generatedDate', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching reports:', error);
    return [];
  }
};

/**
 * Fetch system settings
 * @returns {Promise<Object|null>} Settings object or null
 */
export const fetchSettings = async () => {
  try {
    const settingsRef = collection(db, 'settings');
    const snapshot = await getDocs(settingsRef);
    if (!snapshot.empty) {
      return snapshot.docs[0].data();
    }
    return null;
  } catch (error) {
    console.error('Error fetching settings:', error);
    return null;
  }
};

/**
 * Update system settings
 * @param {Object} settings - Settings object to update
 * @returns {Promise<boolean>} Success status
 */
export const updateSettings = async (settings) => {
  try {
    const settingsRef = collection(db, 'settings');
    const snapshot = await getDocs(settingsRef);
    if (!snapshot.empty) {
      const docRef = snapshot.docs[0].ref;
      await updateDoc(docRef, settings);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error updating settings:', error);
    return false;
  }
};

/**
 * Fetch security data
 * @returns {Promise<Object|null>} Security data object or null
 */
export const fetchSecurityData = async () => {
  try {
    const securityRef = collection(db, 'security');
    const snapshot = await getDocs(securityRef);
    if (!snapshot.empty) {
      return snapshot.docs[0].data();
    }
    return null;
  } catch (error) {
    console.error('Error fetching security data:', error);
    return null;
  }
};
