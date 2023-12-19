import React, {useEffect, useState} from 'react';
import { useSearchParams } from 'react-router-dom';
import { verifyReview } from '../../services/ReviewService.js'; // Import the service function

function VerifyReview() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [loading, setLoading] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState(null);

  useEffect(() => {
    if (token) {
      // Use the verifyReview function from ReviewService.js
      verifyReview(token)
          .then(() => {
            // Handle successful verification
            setVerificationStatus('success');
          })
          .catch(error => {
            if (error.response && error.response.data) {
              setVerificationStatus('error');
            } else {
              setVerificationStatus('error');
            }
          })
          .finally(() => {
            setLoading(false);
          });
    }
  }, [token]);

  const renderContent = () => {
    if (loading) {
      return <span className="loading loading-spinner text-primary"></span>;
    } else if (verificationStatus === 'success') {
      return <div className="alert alert-success w-2/3 animate animate-pulse">
        <span>Review Has Been Added</span>
      </div>
    } else if (verificationStatus === 'error') {
      return <div className="alert alert-error w-2/3 animate animate-pulse">
        <span>Review verification failed</span>
      </div>;
      
    } else {
      return<div className="alert alert-error w-2/3 animate animate-pulse">
        <span>No Token Provided</span>
      </div>
    }
  };

  return (
      <div className="flex justify-center items-center w-full">
        {renderContent()}
      </div>
  );
}

export default VerifyReview;