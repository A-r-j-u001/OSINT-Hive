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
            { title: 'HTML Full Course - Build a Website Tutorial', platform: 'YouTube (freeCodeCamp)', link: '#', type: 'video' },
            { title: 'MDN Web Docs - HTML', platform: 'Mozilla', link: '#', type: 'article' }
        ]
    },
    'css': {
        id: 'css',
        label: 'CSS',
        description: 'Style sheet language used for describing the presentation of a document written in HTML.',
        resources: [
            { title: 'CSS Crash Course', platform: 'YouTube', link: '#', type: 'video' },
            { title: 'Flexbox Froggy', platform: 'Independent', link: '#', type: 'interactive' }
        ]
    },
    'js': {
        id: 'js',
        label: 'JavaScript',
        description: 'Programming language that conforms to the ECMAScript specification.',
        resources: [
            { title: 'Namaste JavaScript', platform: 'YouTube', link: '#', type: 'video' },
            { title: 'JavaScript.info', platform: 'Web', link: '#', type: 'article' }
        ]
    },
    'react': {
        id: 'react',
        label: 'React',
        description: 'A JavaScript library for building user interfaces.',
        resources: [
            { title: 'React Documentation', platform: 'React.dev', link: '#', type: 'article' },
            { title: 'Full Modern React Tutorial', platform: 'YouTube', link: '#', type: 'video' }
        ]
    },
    'docker': {
        id: 'docker',
        label: 'Docker',
        description: 'Platform using OS-level virtualization to deliver software in packages called containers.',
        resources: [
            { title: 'Docker for Beginners', platform: 'YouTube', link: '#', type: 'video' },
            { title: 'Docker Curriculum', platform: 'Web', link: '#', type: 'article' }
        ]
    },
    'kubernetes': {
        id: 'kubernetes',
        label: 'Kubernetes',
        description: 'Open-source container orchestration system.',
        resources: [
            { title: 'Kubernetes Crash Course', platform: 'YouTube', link: '#', type: 'video' }
        ]
    }
}
