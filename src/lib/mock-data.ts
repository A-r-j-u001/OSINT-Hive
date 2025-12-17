
export type Profile = {
    id: string
    name: string
    role: string
    company: string
    source: string
    college: string
    batch?: string
    skills: string[]
    email: string
    match_score: number
    roadmap: Array<{ year: string; title: string; org: string; desc: string }>
    verified: boolean
    tags: string[]
    osint_metadata?: any
}

export const HERO_PROFILES: Profile[] = [
    {
        "id": "usr_hero_001",
        "name": "Rohan Sharma",
        "role": "Senior Backend Engineer",
        "company": "Swiggy",
        "source": "INTERNAL_DB",
        "college": "AKTU",
        "batch": "2023",
        "skills": ["Node.js", "Express", "MongoDB", "Redis", "Docker"],
        "email": "rohan.sharma23@gmail.com",
        "match_score": 98,
        "roadmap": [
            { "year": "2021", "title": "Intern", "org": "TechStart", "desc": "Learned API Design" },
            { "year": "2022", "title": "GSoC Participant", "org": "Apache", "desc": "Open Source Contrib" },
            { "year": "2023", "title": "SDE-1", "org": "Swiggy", "desc": "Campus Placement" }
        ],
        "verified": true,
        "tags": ["Alumni", "High Responder"]
    },
    {
        "id": "usr_hero_002",
        "name": "Aditya Singh",
        "role": "Full Stack Developer",
        "company": "Open Source / Freelance",
        "source": "OSINT_GITHUB",
        "college": "Unknown",
        "skills": ["React", "Next.js", "TypeScript", "Tailwind", "PostgreSQL"],
        "email": "aditya.dev@protonmail.com",
        "match_score": 78,
        "osint_metadata": {
            "found_via": "GitHub API",
            "repo_count": 45,
            "followers": 312,
            "smtp_valid": true
        },
        "roadmap": [
            { "year": "2022", "title": "Contributor", "org": "React-Router", "desc": "Found in Commit Logs" },
            { "year": "2024", "title": "Maintainer", "org": "Personal Portfolio", "desc": "Readme.md Analysis" }
        ],
        "verified": false,
        "tags": ["OSINT", "Top Contributor"]
    },
    {
        "id": "usr_hero_003",
        "name": "Priya Verma",
        "role": "Data Scientist",
        "company": "Google",
        "source": "INTERNAL_DB",
        "college": "IIT Delhi",
        "skills": ["Python", "TensorFlow", "Kubernetes", "BigQuery", "Statistics"],
        "email": "priya.v@google.com",
        "match_score": 42,
        "roadmap": [
            { "year": "2020", "title": "Research Intern", "org": "DRDO", "desc": "AI Research" },
            { "year": "2021", "title": "Masters", "org": "IISc", "desc": "Data Science" },
            { "year": "2023", "title": "Data Scientist", "org": "Google", "desc": "Off-Campus" }
        ],
        "verified": true,
        "tags": ["Gap Analysis Target", "FAANG"]
    },
    {
        "id": "usr_hero_004",
        "name": "Meera Iyer",
        "role": "Product Manager",
        "company": "Razorpay",
        "source": "OSINT_PDF",
        "college": "Unknown",
        "skills": ["JIRA", "Agile", "SQL", "Figma", "User Research"],
        "email": "meera.iyer@razorpay.com",
        "match_score": 65,
        "osint_metadata": {
            "found_via": "Google Dorking",
            "file_type": "PDF",
            "source_url": "s3.razorpay.com/careers/resume_meera.pdf"
        },
        "roadmap": [
            { "year": "2019", "title": "Analyst", "org": "KPMG", "desc": "Extracted from Resume" },
            { "year": "2021", "title": "MBA", "org": "IIM B", "desc": "Education History" }
        ],
        "verified": false,
        "tags": ["OSINT", "Management"]
    },
    {
        "id": "usr_hero_005",
        "name": "Aman Gupta",
        "role": "DevOps Engineer",
        "company": "Zomato",
        "source": "INTERNAL_DB",
        "college": "AKTU",
        "batch": "2024",
        "skills": ["Linux", "AWS", "Jenkins", "Terraform", "Ansible"],
        "email": "aman.gupta@zomato.com",
        "match_score": 88,
        "roadmap": [
            { "year": "2022", "title": "Cloud Intern", "org": "AWS", "desc": "Summer Internship" },
            { "year": "2024", "title": "DevOps Trainee", "org": "Zomato", "desc": "PPO Received" }
        ],
        "verified": true,
        "tags": ["Alumni", "Recent Grad"]
    },
    {
        "id": "usr_hero_006",
        "name": "Vikram Malhotra",
        "role": "Founder & CEO",
        "company": "TechSpire (Startup)",
        "source": "OSINT_LINKEDIN",
        "college": "AKTU",
        "skills": ["Entrepreneurship", "System Design", "Fundraising", "Go", "Cloud Architecture"],
        "email": "vikram@techspire.io",
        "match_score": 85,
        "osint_metadata": {
            "found_via": "Crunchbase API",
            "funding_round": "Series A",
            "public_email": "investors@techspire.io"
        },
        "roadmap": [
            { "year": "2018", "title": "SDE-1", "org": "TCS", "desc": "Service based start" },
            { "year": "2020", "title": "Co-Founder", "org": "B2B SaaS", "desc": "Failed Startup experience" },
            { "year": "2023", "title": "Founder", "org": "TechSpire", "desc": "Y-Combinator Backed" }
        ],
        "verified": false,
        "tags": ["Entrepreneur", "High Value"]
    },
    {
        "id": "usr_hero_007",
        "name": "Sanya Kapoor",
        "role": "Product Designer",
        "company": "Cred",
        "source": "INTERNAL_DB",
        "college": "NIFT",
        "skills": ["Figma", "Adobe XD", "User Research", "Prototyping", "Wireframing"],
        "email": "sanya.k@cred.club",
        "match_score": 30,
        "roadmap": [
            { "year": "2021", "title": "Graphic Intern", "org": "Ogilvy", "desc": "Brand Design" },
            { "year": "2023", "title": "UI Designer", "org": "Cred", "desc": "Portfolio Selection" }
        ],
        "verified": true,
        "tags": ["Design", "Creative"]
    },
    {
        "id": "usr_hero_008",
        "name": "Dr. Kavita Reddy",
        "role": "AI Researcher",
        "company": "DeepMind",
        "source": "OSINT_PDF",
        "college": "IIT Madras",
        "skills": ["PyTorch", "NLP", "Reinforcement Learning", "Academic Writing", "LaTeX"],
        "email": "kavita.r@deepmind.com",
        "match_score": 91,
        "osint_metadata": {
            "found_via": "Google Scholar",
            "citations": 450,
            "paper_link": "arxiv.org/abs/2301.000"
        },
        "roadmap": [
            { "year": "2019", "title": "PhD Candidate", "org": "Stanford", "desc": "Thesis on LLMs" },
            { "year": "2024", "title": "Research Scientist", "org": "DeepMind", "desc": "Core Team" }
        ],
        "verified": false,
        "tags": ["Research", "Academic"]
    },
    {
        "id": "usr_hero_009",
        "name": "Arjun Das",
        "role": "Blockchain Developer",
        "company": "Polygon",
        "source": "OSINT_GITHUB",
        "college": "Unknown",
        "skills": ["Solidity", "Rust", "Web3.js", "Smart Contracts", "Cryptography"],
        "email": "arjun.eth@gmail.com",
        "match_score": 68,
        "osint_metadata": {
            "found_via": "GitHub",
            "starred_repos": 150,
            "contributions": 900
        },
        "roadmap": [
            { "year": "2021", "title": "Hackathon Winner", "org": "ETHIndia", "desc": "DeFi Project" },
            { "year": "2023", "title": "Protocol Eng", "org": "Polygon", "desc": "Remote Role" }
        ],
        "verified": false,
        "tags": ["Web3", "Remote"]
    },
    {
        "id": "usr_hero_010",
        "name": "Zainab Ali",
        "role": "Cybersecurity Analyst",
        "company": "CrowdStrike",
        "source": "INTERNAL_DB",
        "college": "AKTU",
        "skills": ["Network Security", "Penetration Testing", "Wireshark", "Python", "Linux"],
        "email": "zainab.ali@crowdstrike.com",
        "match_score": 82,
        "roadmap": [
            { "year": "2022", "title": "Bug Bounty Hunter", "org": "HackerOne", "desc": "Found P2 bug in Uber" },
            { "year": "2024", "title": "Sec Analyst", "org": "CrowdStrike", "desc": "Blue Team" }
        ],
        "verified": true,
        "tags": ["Security", "Cyber"]
    }
]


// --- EXPANDED DATA POOLS (For Bulk Gen) ---
const firstNames = [
    "Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun", "Sai", "Reyansh", "Ayan", "Krishna", "Ishaan",
    "Diya", "Saanvi", "Ananya", "Aadhya", "Pari", "Saanvi", "Riya", "Anvi", "Pihu", "Prachi",
    "Karan", "Siddharth", "Vikram", "Neha", "Pooja", "Rohan", "Sneha", "Manish", "Rahul", "Kavya",
    "Kabir", "Meera", "Yash", "Nisha", "Varun", "Simran", "Aryan", "Tanvi", "Dev", "Isha"
]

const lastNames = [
    "Sharma", "Verma", "Gupta", "Malhotra", "Singh", "Kumar", "Das", "Patel", "Joshi", "Mehta",
    "Reddy", "Nair", "Bhatia", "Chopra", "Deshmukh", "Iyer", "Rao", "Saxena", "Yadav", "Mishra",
    "Kulkarni", "Chauhan", "Pandey", "Sinha", "Roy", "Banerjee", "Dutta", "Biswas", "Tiwari", "Dubey"
]

const roles = [
    "Software Engineer", "Frontend Developer", "Backend Developer", "Data Scientist", "DevOps Engineer",
    "Full Stack Developer", "Product Manager", "UI/UX Designer", "Cybersecurity Analyst",
    "Cloud Architect", "Mobile Developer (Flutter)", "AI Engineer", "Blockchain Developer", "QA Engineer"
]

const companies = [
    "Google", "Microsoft", "Amazon", "Swiggy", "Zomato", "Razorpay", "Cred", "TCS", "Infosys",
    "Wipro", "Accenture", "Urban Company", "Flipkart", "Uber", "Ola", "PhonePe", "Paytm",
    "Zoho", "Freshworks", "Zerodha", "Groww", "Meesho", "InMobi", "MakeMyTrip"
]

const skillsPool = [
    "Python", "Java", "C++", "React.js", "Node.js", "Express", "MongoDB", "SQL", "Docker",
    "Kubernetes", "AWS", "TensorFlow", "Pytorch", "Figma", "Next.js", "TypeScript", "Redis",
    "GraphQL", "Flutter", "Dart", "Go", "Rust", "Solidity", "Linux", "Jenkins", "Terraform"
]

const colleges = ["AKTU", "IIT Delhi", "IIT Bombay", "NIT Trichy", "BITS Pilani", "Unknown", "VIT", "SRM", "Manipal", "IIIT Hyderabad"]

const sources = ["INTERNAL_DB", "INTERNAL_DB", "OSINT_GITHUB", "OSINT_PDF", "OSINT_LINKEDIN", "OSINT_TWITTER"]

// --- HELPER FUNCTIONS ---
const getRandom = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)]

const generateSkills = () => {
    const num = Math.floor(Math.random() * 5) + 3 // 3 to 7 skills
    const s = new Set<string>()
    while (s.size < num) s.add(getRandom(skillsPool))
    return Array.from(s)
}

const generateRoadmap = (role: string) => {
    const years = ["2019", "2020", "2021", "2022", "2023", "2024"]
    return [
        { year: years[Math.floor(Math.random() * 2)], title: "Student / Intern", org: "University Project", desc: "Started learning core stack" },
        { year: years[Math.floor(Math.random() * 2) + 2], title: "Junior " + role.split(" ")[0], org: getRandom(companies), desc: "First Industry Experience" },
        { year: years[5], title: role, org: getRandom(companies), desc: "Current Role" }
    ]
}

// --- DETERMINISTIC GENERATOR ---
// Using seeded modulo logic so the same ID always produces the same Profile.
// This prevents data mismatches between Search API and Profile Page.

export const generateBulkProfiles = (count: number): Profile[] => {
    const profiles: Profile[] = []

    for (let i = 0; i < count; i++) {
        // Pseudo-random indices based on 'i'
        const fIdx = (i * 7 + 3) % firstNames.length
        const lIdx = (i * 11 + 5) % lastNames.length

        const fname = firstNames[fIdx]
        const lname = lastNames[lIdx]
        const name = `${fname} ${lname}`

        const cIdx = (i * 13 + 7) % companies.length
        const company = companies[cIdx]

        const sIdx = (i * 5 + 2) % sources.length
        const source = sources[sIdx]

        const rIdx = (i * 3 + 1) % roles.length
        const role = roles[rIdx]

        const college = source === "INTERNAL_DB" ? "AKTU" : colleges[(i * 17) % colleges.length]

        // Deterministic Skills
        const mySkills: string[] = []
        const skillCount = (i % 4) + 3 // 3 to 6 interactions
        for (let s = 0; s < skillCount; s++) {
            const skillRef = (i * (s + 1) * 19) % skillsPool.length
            mySkills.push(skillsPool[skillRef])
        }
        const uniqueSkills = Array.from(new Set(mySkills))

        // Deterministic Match Score
        const score = 30 + (i * 7 % 70) // 30-99 range mostly

        const profile: Profile = {
            id: `usr_gen_${100 + i}`,
            name: name,
            role: role,
            company: company,
            source: source,
            college: college,
            skills: uniqueSkills,
            email: `${fname.toLowerCase()}.${lname.toLowerCase()}@${company.toLowerCase().replace(/\s/g, '')}.com`,
            match_score: score,
            roadmap: generateRoadmap(role), // generateRoadmap still needs fixing if it uses random
            verified: source === "INTERNAL_DB" ? true : (i % 3 !== 0), // 2/3 verified if internal? Logic mix.
            tags: source.includes("OSINT") ? ["OSINT Found"] : ["Alumni", "Verified"]
        }

        // Add OSINT specific data
        if (source === "OSINT_GITHUB") {
            profile.osint_metadata = {
                found_via: "GitHub API",
                repo_count: 10 + (i % 50),
                smtp_valid: true
            }
        }
        else if (source === "OSINT_PDF") {
            profile.osint_metadata = {
                found_via: "Google Dork",
                file_type: "PDF",
                doc_title: "Curriculum Vitae"
            }
        }

        profiles.push(profile)
    }
    return profiles
}

// Combined Data Export
export const MOCK_DB = [...HERO_PROFILES, ...generateBulkProfiles(90)]
