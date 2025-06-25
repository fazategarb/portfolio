import React from 'react';

const Output = ({ output }) => {
  return (
    <div className="mb-3">
      {output.map((item, index) => (
        <div 
          key={index} 
          className={`mb-1 ${item.isCommand ? 'text-gray-400' : 'text-gray-100'} whitespace-pre-wrap`}
        >
          {item.text}
        </div>
      ))}
    </div>
  );
};

export default Output;