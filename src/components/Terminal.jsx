import React, { useState, useEffect, useRef } from 'react';
import CommandLine from './CommandLine';
import Output from './Output';
import { executeCommand } from '../data/commands';
import { fileSystem } from '../data/fileSystem';

const Terminal = () => {
  const [output, setOutput] = useState([
    { text: 'Welcome to my portfolio! Type "help" to see available commands.', isCommand: false }
  ]);
  const [currentDir, setCurrentDir] = useState('~');
  const terminalRef = useRef(null);

  const handleCommand = (command) => {
    // Add command to output
    setOutput(prev => [...prev, { text: `$ ${command}`, isCommand: true }]);
    
    // Handle clear command separately
    if (command.trim() === 'clear') {
      setOutput([]);
      return;
    }
    
    // Execute command and add result to output
    const result = executeCommand(command, currentDir, setCurrentDir);
    setOutput(prev => [...prev, { text: result, isCommand: false }]);
    
    // Scroll to bottom
    setTimeout(() => {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }, 0);
  };

  return (
    <div className='h-screen flex items-center justify-center bg-gray-800 text-gray-100'>
        <div 
        ref={terminalRef}
        className="bg-gray-900 text-gray-100 font-mono p-5 rounded-lg overflow-y-auto"
        style={{
          width: '70%', // Customize width (e.g., 600px or 50%)
          height: '60%', // Customize height (e.g., 400px or 80vh)
          maxWidth: '90%', // Optional: Add responsiveness
          maxHeight: '80vh', // Optional: Prevent overflow
        }}
        >
        <Output output={output} />
        <CommandLine 
            handleCommand={handleCommand} 
            currentDir={currentDir}
            />
        </div>
    </div>
  );
};

export default Terminal;