export const logEvent = (eventName: string, eventParams: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
    (window as any).gtag('event', eventName, eventParams);
  } else {
    console.warn(`gtag not available. Google Analytics Event ${eventName} was not sent.`);
  }
};
