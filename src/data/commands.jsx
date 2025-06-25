import { fileSystem } from './fileSystem';
import { portfolioData } from './portfolioData';

const helpText = `
Available commands:
- help          : Show this help message
- ls            : List directory contents
- cd [dir]      : Change directory
- cat [file]    : Display file contents
- clear         : Clear the terminal
- about         : About me
- skills        : My skills
- projects      : My projects
- contact       : Contact information
`;

export const executeCommand = (command, currentDir, setCurrentDir) => {
  const parts = command.split(' ');
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);

  switch (cmd) {
    case 'help':
      return helpText;
    
    case 'ls':
      return listDirectory(currentDir);
    
    case 'cd':
      return changeDirectory(args, currentDir, setCurrentDir);
    
    case 'cat':
      return readFile(args, currentDir);
    
    case 'clear':
      return 'CLEAR'; // Special case handled in Terminal component
    
    case 'about':
      return portfolioData.about;
    
    case 'skills':
      return portfolioData.skills.join(', ');
    
    case 'projects':
      return portfolioData.projects.map(p => `${p.name}: ${p.description}`).join('\n');
    
    case 'contact':
      return portfolioData.contact.join('\n');
    
    default:
      return `Command not found: ${cmd}. Type "help" for available commands.`;
  }
};

const listDirectory = (currentDir) => {
  let dir = fileSystem;
  const path = currentDir.split('/').filter(p => p !== '~' && p !== '');
  
  for (const part of path) {
    if (dir[part] && dir[part].type === 'dir') {
      dir = dir[part].contents;
    } else {
      return `Error: ${part} is not a directory`;
    }
  }
  
  return Object.keys(dir).join(' ');
};

const changeDirectory = (args, currentDir, setCurrentDir) => {
  if (args.length === 0) {
    setCurrentDir('~');
    return '';
  }
  
  const target = args[0];
  
  if (target === '..') {
    const path = currentDir.split('/').filter(p => p !== '');
    if (path.length <= 1) {
      setCurrentDir('~');
    } else {
      setCurrentDir(path.slice(0, -1).join('/'));
    }
    return '';
  }
  
  if (target === '~' || target === '/') {
    setCurrentDir('~');
    return '';
  }
  
  let dir = fileSystem;
  const path = currentDir.split('/').filter(p => p !== '~' && p !== '');
  
  for (const part of path) {
    if (dir[part] && dir[part].type === 'dir') {
      dir = dir[part].contents;
    } else {
      return `Error: ${part} is not a directory`;
    }
  }
  
  if (dir[target] && dir[target].type === 'dir') {
    setCurrentDir(currentDir === '~' ? `~/${target}` : `${currentDir}/${target}`);
    return '';
  } else {
    return `Error: ${target} is not a directory`;
  }
};

const readFile = (args, currentDir) => {
  if (args.length === 0) {
    return 'Usage: cat [file]';
  }
  
  const filename = args[0];
  let dir = fileSystem;
  const path = currentDir.split('/').filter(p => p !== '~' && p !== '');
  
  for (const part of path) {
    if (dir[part] && dir[part].type === 'dir') {
      dir = dir[part].contents;
    } else {
      return `Error: ${part} is not a directory`;
    }
  }
  
  if (dir[filename] && dir[filename].type === 'file') {
    return dir[filename].content;
  } else {
    return `Error: ${filename} is not a file or does not exist`;
  }
};