// ApiConfigContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context
const ApiConfigContext = createContext({ apiBaseUrl: '' });

// Provider component
export const ApiConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [apiBaseUrl, setApiBaseUrl] = useState('');

    useEffect(() => {
        fetch('/config.json')  // Ensure the config.json file is accessible via this URL
            .then(response => response.json())
            .then(data => {
                setApiBaseUrl(data.apiBaseUrl);
            })
            .catch(error => {
                console.error('Error loading the API config:', error);
                // Optionally set a default API base URL or handle the error as needed
            });
    }, []);

    return (
        <ApiConfigContext.Provider value={{ apiBaseUrl }}>
            {children}
        </ApiConfigContext.Provider>
    );
};

// Hook to use the API config in other components
export const useApiConfig = () => useContext(ApiConfigContext);
