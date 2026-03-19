import React, { createContext, useContext, useState, useEffect } from 'react';

const SubscriptionContext = createContext();

export const SubscriptionProvider = ({ children }) => {
  const [activePlan, setActivePlan] = useState(() => {
    return localStorage.getItem('cloudvault_plan') || 'Free';
  });

  const [billingCycle, setBillingCycle] = useState(() => {
    return localStorage.getItem('cloudvault_billing') || 'monthly';
  });

  useEffect(() => {
    localStorage.setItem('cloudvault_plan', activePlan);
    localStorage.setItem('cloudvault_billing', billingCycle);
  }, [activePlan, billingCycle]);

  const upgradePlan = (planName, cycle) => {
    setActivePlan(planName);
    if (cycle) setBillingCycle(cycle);
  };

  const isTierGreater = (tier1, tier2) => {
    const tiers = ['Free', 'Pro', 'Business', 'Enterprise'];
    return tiers.indexOf(tier1) > tiers.indexOf(tier2);
  };

  return (
    <SubscriptionContext.Provider value={{ activePlan, billingCycle, upgradePlan, isTierGreater, setBillingCycle }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
    const context = useContext(SubscriptionContext);
    if (!context) throw new Error('useSubscription must be used within a SubscriptionProvider');
    return context;
};
