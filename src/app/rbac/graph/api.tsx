

export type N = {
    id: string;
    type: string;
    level: number;
}

export type E = {
    from: string;
    to: string;
    relation: string;
}

export const nodes :N[] = [
    { id: "CEO", type: "CEO", level: 0 },
    { id: "CTO-1", type: "CTO", level: 1 },
    { id: "CTO-2", type: "CTO", level: 1 },
    { id: "HR-1", type: "HR", level: 2 },
    { id: "PM-1", type: "PM", level: 3 },
    { id: "TL-1", type: "TeamLead", level: 2 },
    { id: "TL-2", type: "TeamLead", level: 2 },
    { id: "TL-3", type: "TeamLead", level: 2 },
    { id: "SR-1", type: "Senior", level: 3 },
    { id: "SR-2", type: "Senior", level: 3 },
    { id: "SR-3", type: "Senior", level: 3 },
    { id: "SR-4", type: "Senior", level: 3 },
    { id: "JR-1", type: "Junior", level: 4 },
    { id: "JR-2", type: "Junior", level: 4 },
    { id: "JR-3", type: "Junior", level: 4 },
    { id: "JR-4", type: "Junior", level: 4 },
    { id: "JR-5", type: "Junior", level: 4 },
    { id: "JR-6", type: "Junior", level: 4 },

    { id: "Salary", type: "Salary", level: 3 },
    { id: "SA", type: "SA", level: 4 },
    { id: "AWS-cred-1", type: "AWS-cred", level: 3 },
    { id: "AWS-cred-2", type: "AWS-cred", level: 3 },
    { id: "Github", type: "Github", level: 5 },
]

export const edges: E[] = [
    { from: "CEO", to: "CTO-1", relation: "parent" },
    { from: "CEO", to: "CTO-2", relation: "parent" },

    { from: "CTO-1", to: "HR-1", relation: "parent" },
    { from: "CTO-2", to: "PM-1", relation: "parent" },
    { from: "CTO-1", to: "TL-1", relation: "parent" },
    { from: "CTO-1", to: "TL-3", relation: "parent" },
    { from: "CTO-2", to: "TL-2", relation: "parent" },

    { from: "TL-1", to: "PM-1", relation: "parent" },
    { from: "TL-2", to: "PM-1", relation: "parent" },   
    { from: "TL-3", to: "PM-1", relation: "parent" },

    { from: "TL-1", to: "SR-1", relation: "parent" },
    { from: "TL-2", to: "SR-2", relation: "parent" },
    { from: "TL-3", to: "SR-3", relation: "parent" },
    { from: "TL-3", to: "SR-4", relation: "parent" },

    { from: "SR-1", to: "JR-1", relation: "parent" },
    { from: "SR-2", to: "JR-2", relation: "parent" },
    { from: "SR-3", to: "JR-3", relation: "parent" },
    { from: "SR-4", to: "JR-4", relation: "parent" },
    { from: "TL-1", to: "JR-5", relation: "parent" },
    { from: "TL-2", to: "JR-6", relation: "parent" },

    { from: "HR-1", to: "Salary", relation: "parent" },
    { from: "TL-1", to: "AWS-cred-1", relation: "parent" },
    { from: "TL-2", to: "AWS-cred-2", relation: "parent" },
    { from: "TL-3", to: "SA", relation: "parent" },
    { from: "SR-3", to: "SA", relation: "parent" },
    { from: "SR-1", to: "Github", relation: "parent" },
    { from: "SR-2", to: "Github", relation: "parent" },
    { from: "SR-3", to: "Github", relation: "parent" },
    { from: "SR-4", to: "Github", relation: "parent" },
    { from: "JR-1", to: "Github", relation: "parent" },
    { from: "JR-2", to: "Github", relation: "parent" },
    { from: "JR-3", to: "Github", relation: "parent" },
    { from: "JR-4", to: "Github", relation: "parent" },
    { from: "JR-5", to: "Github", relation: "parent" },
    { from: "JR-6", to: "Github", relation: "parent" },
    { from: "TL-1", to: "Github", relation: "parent" },
    { from: "TL-2", to: "Github", relation: "parent" },
    { from: "TL-3", to: "Github", relation: "parent" },

    { from: "CEO", to: "Github", relation: "parent" },
    { from: "CEO", to: "Salary", relation: "parent" },
    { from: "CEO", to: "AWS-cred-1", relation: "parent" },
    { from: "CEO", to: "AWS-cred-2", relation: "parent" },
    { from: "CEO", to: "SA", relation: "parent" },

    { from: "CTO-1", to: "Github", relation: "parent" },
    { from: "CTO-1", to: "Salary", relation: "parent" },
    { from: "CTO-1", to: "AWS-cred-1", relation: "parent" },
    { from: "CTO-1", to: "AWS-cred-2", relation: "parent" },
    { from: "CTO-1", to: "SA", relation: "parent" },

    { from: "CTO-2", to: "Github", relation: "parent" },
    { from: "CTO-2", to: "Salary", relation: "parent" },
    { from: "CTO-2", to: "AWS-cred-1", relation: "parent" },
    { from: "CTO-2", to: "AWS-cred-2", relation: "parent" },
    { from: "CTO-2", to: "SA", relation: "parent" },
]