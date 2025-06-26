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
                content: `${portfolioData.projects[0].name}\n${portfolioData.projects[0].description}`
            },
            'project2.txt': {
                type: 'file',
                content: `${portfolioData.projects[1].name}\n${portfolioData.projects[1].description}`
            }
        }
    },
    'hobby': {
        type: 'dir',
        contents: {
            'hobby1.txt': {
                type: 'file',
                content: 'I love coding and building projects in my free time.'
            },
            'hobby2.txt': {
                type: 'file',
                content: 'I enjoy hiking and exploring nature.'
            }
        }
    },
};