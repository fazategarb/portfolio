import { portfolioData } from './portfolioData';

export const fileSystem = {
    'about.txt': {
        type: 'file',
        content: portfolioData.about
    },
    'skills.txt': {
        type: 'file',
        content: portfolioData.skills.join(', ')
    },
    'contact.txt': {
        type: 'file',
        content: portfolioData.contact.join('\n')
        },
    'projects': {
        type: 'dir',
        contents: {
        'project1.txt': {
            type: 'file',
            content: `${portfolioData.projects[0].name}\n\n${portfolioData.projects[0].description}`
        },
        'project2.txt': {
            type: 'file',
            content: `${portfolioData.projects[1].name}\n\n${portfolioData.projects[1].description}`
        }
        }
    },
};