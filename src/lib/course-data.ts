// Mock "Course Database" that would be our own improved version of roadmap.sh content
export type Course = {
    title: string
    platform: string
    link: string
    type: 'video' | 'article' | 'interactive'
}

export type Topic = {
    id: string
    label: string
    description?: string
    resources: Course[]
}

export const COURSE_DATABASE: Record<string, Topic> = {
    'html': {
        id: 'html',
        label: 'HTML',
        description: 'The standard markup language for documents designed to be displayed in a web browser.',
        resources: [
            { title: 'HTML Full Course - Build a Website Tutorial', platform: 'YouTube (freeCodeCamp)', link: 'https://www.youtube.com/watch?v=pQN-pnXPaVg', type: 'video' },
            { title: 'MDN Web Docs - HTML', platform: 'Mozilla', link: 'https://developer.mozilla.org/en-US/docs/Web/HTML', type: 'article' }
        ]
    },
    'css': {
        id: 'css',
        label: 'CSS',
        description: 'Style sheet language used for describing the presentation of a document written in HTML.',
        resources: [
            { title: 'CSS Crash Course', platform: 'YouTube (Traversy Media)', link: 'https://www.youtube.com/watch?v=yfoY53QXEnI', type: 'video' },
            { title: 'Flexbox Froggy', platform: 'Independent', link: 'https://flexboxfroggy.com/', type: 'interactive' }
        ]
    },
    'js': {
        id: 'js',
        label: 'JavaScript',
        description: 'Programming language that conforms to the ECMAScript specification.',
        resources: [
            { title: 'Namaste JavaScript', platform: 'YouTube', link: 'https://www.youtube.com/watch?v=pN6jk0uUrD8&list=PLlasXeu85E9cQ32gLCvAvr9vNaUccPVNP', type: 'video' },
            { title: 'JavaScript.info', platform: 'Web', link: 'https://javascript.info/', type: 'article' }
        ]
    },
    'react': {
        id: 'react',
        label: 'React',
        description: 'A JavaScript library for building user interfaces.',
        resources: [
            { title: 'React Documentation', platform: 'React.dev', link: 'https://react.dev/learn', type: 'article' },
            { title: 'Full Modern React Tutorial', platform: 'YouTube (Net Ninja)', link: 'https://www.youtube.com/watch?v=j942wKiXFu8&list=PL4cUxeGkcC9gZD-Tvwfod2GaISupBVGme', type: 'video' }
        ]
    },
    'docker': {
        id: 'docker',
        label: 'Docker',
        description: 'Platform using OS-level virtualization to deliver software in packages called containers.',
        resources: [
            { title: 'Docker for Beginners', platform: 'YouTube (TechWorld with Nana)', link: 'https://www.youtube.com/watch?v=3c-iBn73dDE', type: 'video' },
            { title: 'Docker Curriculum', platform: 'Web', link: 'https://docker-curriculum.com/', type: 'article' }
        ]
    },
    'kubernetes': {
        id: 'kubernetes',
        label: 'Kubernetes',
        description: 'Open-source container orchestration system.',
        resources: [
            { title: 'Kubernetes Crash Course', platform: 'YouTube (TechWorld with Nana)', link: 'https://www.youtube.com/watch?v=X48VuDVv0do', type: 'video' }
        ]
    },
    'node': {
        id: 'node',
        label: 'Node.js',
        description: 'JavaScript runtime built on Chrome\'s V8 JavaScript engine.',
        resources: [
            { title: 'Node.js Crash Course', platform: 'YouTube (Traversy Media)', link: 'https://www.youtube.com/watch?v=fBNz5xF-Kx4', type: 'video' },
            { title: 'Node.js Docs', platform: 'nodejs.org', link: 'https://nodejs.org/en/docs/', type: 'article' }
        ]
    },
    'typescript': {
        id: 'ts',
        label: 'TypeScript',
        description: 'TypeScript is JavaScript with syntax for types.',
        resources: [
            { title: 'TypeScript for Beginners', platform: 'YouTube (Programming with Mosh)', link: 'https://www.youtube.com/watch?v=BwuLxPH8IDs', type: 'video' },
            { title: 'TypeScript Handbook', platform: 'typescriptlang.org', link: 'https://www.typescriptlang.org/docs/handbook/intro.html', type: 'article' }
        ]
    },
    'sql': {
        id: 'sql',
        label: 'SQL',
        description: 'Standard language for storing, manipulating and retrieving data in databases.',
        resources: [
            { title: 'SQL Tutorial - Full Database Course', platform: 'YouTube (freeCodeCamp)', link: 'https://www.youtube.com/watch?v=HXV3zeQKqGY', type: 'video' },
            { title: 'W3Schools SQL Tutorial', platform: 'W3Schools', link: 'https://www.w3schools.com/sql/', type: 'interactive' }
        ]
    },
    'aws': {
        id: 'aws',
        label: 'AWS',
        description: 'Amazon Web Services offers reliable, scalable, and inexpensive cloud computing services.',
        resources: [
            { title: 'AWS Basics', platform: 'YouTube (Fireship)', link: 'https://www.youtube.com/watch?v=g2JOHJHhjk8', type: 'video' },
            { title: 'AWS Training', platform: 'AWS', link: 'https://aws.amazon.com/training/', type: 'interactive' }
        ]
    }
}
