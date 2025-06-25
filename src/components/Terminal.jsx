import React, { useState, useEffect, useRef } from 'react';
import CommandLine from './CommandLine';
import Output from './Output';
import { executeCommand } from '../data/commands';
import { fileSystem } from '../data/fileSystem';

const Terminal = () => {
  const gradientArt = [
    { text: 'Type "help" to see available commands.', isCommand: false },
  ]

  const [output, setOutput] = useState([
    ...gradientArt.map(line => ({ text: line.text, color: line.color, isCommand: false })),
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
    <div className='h-[90vh] flex items-center justify-center bg-gray-800 text-gray-100'>
      <div 
      ref={terminalRef}
      className="bg-gray-900 text-gray-100 font-mono p-5 rounded-lg overflow-y-auto"
      style={{
        width: '70%', // Customize width (e.g., 600px or 50%)
        height: '80%', // Customize height (e.g., 400px or 80vh)
        maxWidth: '90%', // Optional: Add responsiveness
        maxHeight: '80vh', // Optional: Prevent overflow
      }}
      >
      <div className='mb-4'>
        <h1 className='text-2xl font-bold mb-2'>Welcome to My Portfolio Terminal</h1>
        <p className='text-gray-400'>Explore my projects, skills, and contact information.</p>
      </div>
      <hr className='border-gray-500 mb-2'></hr>
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