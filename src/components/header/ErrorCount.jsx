import React from 'react';
 {/* component for displaying error count when card will not be matched */}

const ErrorCount = ({ errorCount = 0 }) => <p className="timer">Error Count :{errorCount}</p>
export default ErrorCount;
