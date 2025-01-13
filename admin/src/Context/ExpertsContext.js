import React, { createContext, useState, useEffect } from "react";
import { useFetch } from "../Hooks/useFetch"; 

export const ExpertsContext = createContext(null);

const ExpertsContextProvider = ({ children }) => {

  const { data: allExpertsData, isLoading: allExpertsLoading, error: allExpertsError } = useFetch("http://localhost:5000/admin/allExperts");
  const { data: unApprovedExpertsData, isLoading: unApprovedExpertsLoading, error: unApprovedExpertsError } = useFetch("http://localhost:5000/admin/unApprovedExperts");

  // using useState so pages showing the data can be updated when the data changes
  const [allExperts, setAllExperts] = useState([]);
  const [unApprovedExperts, setUnApprovedExperts] = useState([]);

  // initial state from useFetch data
  useEffect(() => {
    if (allExpertsData) setAllExperts(allExpertsData.data);
  }, [allExpertsData]);

  // initial state from useFetch data
  useEffect(() => {
    if (unApprovedExpertsData) {
      setUnApprovedExperts(unApprovedExpertsData.data); 
    }
  }, [unApprovedExpertsData]);
  

  // Approve an expert and update the state
  const approveExpert = async (expertId) => {
    try {
      const response = await fetch(`http://localhost:5000/admin/approveExpert/${expertId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
  
      const result = await response.json();
      if (response.ok) {
        // Add the approved expert to the allExperts state
        setAllExperts((prevAllExperts) => [...prevAllExperts, result.data]);
        // Remove the approved expert from the unApprovedExperts state
        setUnApprovedExperts((prevUnApprovedExperts) =>
          prevUnApprovedExperts.filter((expert) => expert.expertID !== expertId)
        );
      } else {
        throw new Error(result.message || "Failed to approve expert");
      }
    } catch (error) {
      throw error;
    }
  };
  

  // Provide the context value
  const contextValue = {
    allExperts,
    unApprovedExperts,
    allExpertsLoading,
    unApprovedExpertsLoading,
    allExpertsError,
    unApprovedExpertsError,
    approveExpert,
  };

  return (
    <ExpertsContext.Provider value={contextValue}>
      {children}
    </ExpertsContext.Provider>
  );
};

export default ExpertsContextProvider;
