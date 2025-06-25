import React, { useState, useEffect, useRef } from 'react';

const CommandLine = ({ handleCommand, currentDir }) => {
  const [input, setInput] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center mt-3">
      <span className="whitespace-nowrap mr-3">
        <span className="text-green-400">fazategarb</span>
        <span className="text-gray-300">@</span>
        <span className="text-blue-400">portfolio</span>
        <span className="text-gray-300">:</span>
        <span className="text-yellow-300">{currentDir}</span>
        <span className="text-gray-300">$</span>
      </span>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        ref={inputRef}
        autoFocus
        className="bg-transparent border-none text-gray-100 font-mono w-full focus:outline-none"
      />
    </form>
  );
};

export default CommandLine;