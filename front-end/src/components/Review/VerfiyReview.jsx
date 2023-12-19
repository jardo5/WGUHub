import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { verifyReview } from './ReviewService'; // Import the service function

function VerifyReview() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      console.log('Verifying review with token:', token);

      // Use the verifyReview function from ReviewService.js
      verifyReview(token)
          .then(() => {
            // Handle successful verification
            alert('Review verified!');
          })
          .catch(error => {
            if (error.response && error.response.data) {
              alert('Error: ' + error.response.data);
            } else {
              alert('An error occurred during verification.');
            }
          });
    }
  }, [token]);

  return (
      <div>
        {token ? <p>Verifying your review...</p> : <p>No token provided.</p>}
      </div>
  );
}

export default VerifyReview;