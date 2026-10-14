import mongoose from "mongoose";
import { env } from "../config/env.js";
import { connectDB } from "../config/db.js";

import Company from "../models/Company.js";
import Team from "../models/Team.js";
import Employee from "../models/Employee.js";
import Department from "../models/Department.js";
import Client from "../models/Client.js";
import Project from "../models/Project.js";
import Task from "../models/Task.js";
import Contract from "../models/Contract.js";
import ActivityLog from "../models/ActivityLog.js";

const maleFirst = [
  "Aarav",
  "Arjun",
  "Aditya",
  "Vivaan",
  "Rohan",
  "Rahul",
  "Aman",
  "Karan",
  "Varun",
  "Nikhil",
  "Pranav",
  "Harsh",
  "Ankit",
  "Akash",
  "Siddharth",
  "Aryan",
  "Krishna",
  "Shivam",
  "Abhishek",
  "Yash",
  "Dhruv",
  "Ishaan",
  "Manish",
  "Deepak",
  "Raj",
];

const femaleFirst = [
  "Aanya",
  "Aditi",
  "Ananya",
  "Priya",
  "Neha",
  "Simran",
  "Isha",
  "Kavya",
  "Mehak",
  "Navya",
  "Pooja",
  "Riya",
  "Sanya",
  "Shreya",
  "Saloni",
  "Tanya",
  "Tanvi",
  "Khushi",
  "Muskan",
  "Sakshi",
];

const lastNames = [
  "Sharma",
  "Verma",
  "Gupta",
  "Singh",
  "Kumar",
  "Malhotra",
  "Kapoor",
  "Mehta",
  "Bansal",
  "Arora",
  "Chopra",
  "Rana",
  "Gill",
  "Kaur",
  "Patel",
  "Jain",
  "Agarwal",
  "Mishra",
  "Yadav",
  "Joshi",
];

const universities = [
  "Dr. B. R. Ambedkar National Institute of Technology",
  "Lovely Professional University",
  "Punjab Technical University",
  "Chandigarh University",
  "Thapar Institute of Engineering and Technology",
  "Panjab University",
  "Chitkara University",
  "Guru Nanak Dev University",
  "Delhi Technological University",
];

const skillsByDept = {
  WEB: [
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "TypeScript",
    "Next.js",
    "Redux",
  ],
  WP: ["WordPress", "PHP", "Elementor", "WooCommerce", "CSS", "MySQL"],
  SHO: ["Shopify", "Liquid", "JavaScript", "Theme Dev", "Klaviyo"],
  GFX: [
    "Figma",
    "Photoshop",
    "Illustrator",
    "UI/UX",
    "Branding",
    "After Effects",
  ],
  ECOM: ["Amazon FBA", "Marketplace", "PPC", "Product Research", "Inventory"],
  BD: ["Upwork", "LinkedIn Sales", "Proposal Writing", "CRM", "Lead Gen"],
  QA: ["Manual Testing", "Selenium", "Cypress", "Jest", "Postman", "JIRA"],
  IT: ["Networking", "Linux", "Windows Server", "Hardware", "Security"],
  HR: ["Recruitment", "Onboarding", "HRIS", "Payroll", "Employee Relations"],
  FIN: ["Accounting", "QuickBooks", "Payroll", "Taxation", "Excel"],
  ADMIN: ["Office Mgmt", "Coordination", "Communication"],
  PMO: ["Agile", "Scrum", "JIRA", "Stakeholder Mgmt", "Risk Mgmt"],
};

const departments = [
  {
    name: "Executive Office",
    code: "EXEC",
    roles: [["Chief Executive Officer", "CEO", 500000, 1]],
  },
  {
    name: "Human Resources",
    code: "HR",
    roles: [
      ["HR Manager", "HR Manager", 100000, 1],
      ["Assistant HR Manager", "Team Lead", 80000, 1],
      ["HR Executive", "Employee", 60000, 1],
      ["Recruitment Officer", "Employee", 55000, 1],
      ["HR Intern", "Intern", 35000, 1],
    ],
  },
  {
    name: "Finance",
    code: "FIN",
    roles: [
      ["Finance Manager", "Finance Manager", 120000, 1],
      ["Senior Accountant", "Senior Developer", 90000, 1],
      ["Payroll Officer", "Employee", 70000, 1],
    ],
  },
  {
    name: "Administration",
    code: "ADMIN",
    roles: [
      ["Office Manager", "Department Head", 90000, 1],
      ["Receptionist", "Employee", 45000, 1],
      ["Office Assistant", "Employee", 40000, 1],
    ],
  },
  {
    name: "Project Management Office",
    code: "PMO",
    roles: [
      ["Senior Project Manager", "Project Manager", 180000, 1],
      ["Project Manager", "Project Manager", 150000, 1],
      ["Assistant Project Manager", "Team Lead", 100000, 1],
    ],
  },
  {
    name: "Business Development",
    code: "BD",
    roles: [
      ["Head of Business Development", "Department Head", 220000, 1],
      ["Senior Bid Manager", "Team Lead", 140000, 1],
      ["Senior Bidder", "Senior Developer", 110000, 2],
      ["Proposal Writer", "Employee", 80000, 2],
      ["Business Development Executive", "Employee", 85000, 2],
      ["Upwork Bidder", "Employee", 75000, 2],
      ["LinkedIn Lead Generator", "Employee", 70000, 2],
      ["Junior Bidder", "Junior Developer", 55000, 3],
    ],
  },
  {
    name: "Web Development",
    code: "WEB",
    roles: [
      ["Head of Web Development", "Department Head", 220000, 1],
      ["Senior Full Stack Developer", "Senior Developer", 170000, 1],
      ["Senior React Developer", "Senior Developer", 160000, 2],
      ["Senior Backend Developer", "Senior Developer", 160000, 2],
      ["MERN Stack Developer", "Developer", 120000, 3],
      ["React Developer", "Developer", 110000, 3],
      ["Backend Developer", "Developer", 110000, 3],
      ["Frontend Developer", "Developer", 100000, 2],
      ["Junior Developer", "Junior Developer", 80000, 2],
      ["React Intern", "Intern", 35000, 1],
    ],
  },
  {
    name: "WordPress Development",
    code: "WP",
    roles: [
      ["Head of WordPress", "Department Head", 200000, 1],
      ["Senior WordPress Developer", "Senior Developer", 140000, 2],
      ["WordPress Developer", "Developer", 110000, 8],
      ["Junior WordPress Developer", "Junior Developer", 70000, 3],
      ["WordPress Intern", "Intern", 35000, 1],
    ],
  },
  {
    name: "Shopify Development",
    code: "SHO",
    roles: [
      ["Head of Shopify", "Department Head", 200000, 1],
      ["Senior Shopify Developer", "Senior Developer", 150000, 2],
      ["Shopify Developer", "Developer", 120000, 8],
      ["Junior Shopify Developer", "Junior Developer", 75000, 3],
      ["Shopify Intern", "Intern", 35000, 1],
    ],
  },
  {
    name: "Graphic Design",
    code: "GFX",
    roles: [
      ["Creative Director", "Department Head", 200000, 1],
      ["Head Graphic Designer", "Team Lead", 140000, 1],
      ["Senior UI UX Designer", "Senior Developer", 130000, 2],
      ["Graphic Designer", "Developer", 90000, 5],
      ["Social Media Designer", "Developer", 80000, 2],
      ["Thumbnail Designer", "Employee", 70000, 2],
      ["Junior Designer", "Junior Developer", 55000, 1],
      ["Design Intern", "Intern", 35000, 1],
    ],
  },
  {
    name: "Ecommerce",
    code: "ECOM",
    roles: [
      ["Head of Ecommerce", "Department Head", 200000, 1],
      ["Senior Ecommerce Specialist", "Senior Developer", 130000, 2],
      ["Marketplace Specialist", "Developer", 100000, 4],
      ["Product Manager", "Team Lead", 110000, 2],
      ["Store Manager", "Employee", 90000, 3],
      ["Junior Specialist", "Junior Developer", 60000, 3],
    ],
  },
  {
    name: "Quality Assurance",
    code: "QA",
    roles: [
      ["QA Lead", "Team Lead", 130000, 1],
      ["Senior QA Engineer", "Senior Developer", 110000, 1],
      ["QA Engineer", "Developer", 100000, 2],
      ["Software Tester", "Employee", 80000, 2],
      ["Automation Tester", "Developer", 100000, 1],
      ["Manual Tester", "Employee", 75000, 1],
    ],
  },
  {
    name: "IT Support",
    code: "IT",
    roles: [
      ["IT Manager", "Department Head", 150000, 1],
      ["Network Engineer", "Senior Developer", 100000, 1],
      ["System Administrator", "Developer", 95000, 1],
      ["IT Support Engineer", "Employee", 70000, 1],
      ["Hardware Technician", "Employee", 60000, 1],
    ],
  },
];

const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pad = (n, w = 4) => String(n).padStart(w, "0");

const randomDate = (startYear, endYear) => {
  const start = new Date(startYear, 0, 1).getTime();
  const end = new Date(endYear, 11, 31).getTime();
  return new Date(start + Math.random() * (end - start));
};

const usedEmails = new Set();

const buildEmail = (fullName, seq, domain = "example.com") => {
  const base = fullName
    .toLowerCase()
    .replace(/muhammad\s*/g, "")
    .trim()
    .replace(/\s+/g, ".")
    .replace(/[^a-z.]/g, "");

  let email = `${base || "user"}@${domain}`;

  if (usedEmails.has(email)) {
    email = `${base || "user"}.${seq}@${domain}`;
  }

  usedEmails.add(email);
  return email;
};

const ratingPool = ["Excellent", "Very Good", "Good", "Good", "Average"];
const bloodGroups = ["A+", "B+", "O+", "AB+", "A-", "O-"];

const run = async () => {
  await connectDB(env.mongoUri);
  console.log("Clearing existing data...");
  await Promise.all([
    Employee.deleteMany({}),
    Department.deleteMany({}),
    Client.deleteMany({}),
    Project.deleteMany({}),
    Task.deleteMany({}),
    Contract.deleteMany({}),
    ActivityLog.deleteMany({}),
    Team.deleteMany({}),
  ]);

  console.log("Provisioning demo company...");
  let company = await Company.findOne({ slug: "gsdc" });
  if (!company) {
    company = await Company.create({
      companyCode: "CMP-0001",
      slug: "gsdc",
      employeePrefix: "RSD",
      name: process.env.LEGACY_COMPANY_NAME || "Raj Software Developers",
      ownerName: process.env.LEGACY_OWNER_NAME || "Pratham Tanwar",
      email: (
        process.env.LEGACY_COMPANY_EMAIL || "admin@rajsoftwaredevelopers.com"
      ).toLowerCase(),
      phone: "+91 300 0000000",
      address: "Jalandhar, Punjab, India",
      industry: "Software Development",
      status: "Active",
    });
  }
  const companyId = company._id;

  console.log("Creating departments...");
  const deptDocs = {};
  for (const d of departments) {
    const doc = await Department.create({
      companyId,
      name: d.name,
      code: d.code,
      description: `${d.name} department at RSD.`,
    });
    deptDocs[d.code] = doc;
  }

  console.log("Creating employees...");
  let seq = 0;
  const created = [];
  const headsByDept = {};

  for (const dept of departments) {
    let femaleQuota = ["WEB", "WP", "SHO", "GFX", "ECOM", "BD"].includes(
      dept.code,
    )
      ? 5
      : 99;
    let femaleUsed = 0;

    for (const [designation, role, salary, count] of dept.roles) {
      for (let i = 0; i < count; i++) {
        seq += 1;

        let gender = "Male";
        if (femaleUsed < femaleQuota && Math.random() < 0.3) {
          gender = "Female";
          femaleUsed += 1;
        }

        const first = gender === "Male" ? rand(maleFirst) : rand(femaleFirst);
        const last = rand(lastNames);
        const fullName = `${first} ${last}`;
        const joiningDate = randomDate(2024, 2026);
        const contractStart = new Date(joiningDate);
        const contractEnd = new Date(joiningDate);
        contractEnd.setFullYear(contractEnd.getFullYear() + 2);

        const emp = {
          companyId,
          employeeId: `RSD-${pad(seq)}`,
          cardNumber: `CARD-${pad(1000 + seq)}`,
          avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(fullName)}`,

          firstName: first,
          lastName: last,
          fullName,
          gender,

          dateOfBirth: randomDate(1990, 2002),

          // Synthetic demo identifier; not a real government ID
          cnic: `DEMO-${pad(seq)}`,

          maritalStatus: rand(["Single", "Single", "Married"]),
          bloodGroup: rand(bloodGroups),

          // Synthetic Indian-format demo contact numbers
          phone: `+91 ${randInt(6000000000, 9999999999)}`,
          emergencyContact: `+91 ${randInt(6000000000, 9999999999)}`,

          personalEmail: buildEmail(fullName + ".personal", seq, "example.com"),
          email: buildEmail(fullName, seq),
          password: "Employee@123",

          currentAddress: `${randInt(1, 400)}, ${rand([
            "Model Town",
            "Urban Estate",
            "Green Park",
            "GTB Nagar",
            "Civil Lines",
            "Lajpat Nagar",
          ])}`,

          city: rand([
            "Jalandhar",
            "Ludhiana",
            "Chandigarh",
            "Amritsar",
            "Mohali",
            "Delhi",
            "Jaipur",
            "Gurugram",
          ]),
          province: "Punjab",

          qualification: rand([
            "B.Tech Computer Science",
            "B.Tech Information Technology",
            "B.E. Computer Engineering",
            "M.Tech Computer Science",
            "BBA",
            "MBA",
          ]),

          university: rand(universities),
          experienceYears: randInt(0, 8),

          skills: (skillsByDept[dept.code] || ["Communication"]).slice(
            0,
            randInt(3, 5),
          ),

          languages: ["Hindi", "English", "Punjabi"],

          department: deptDocs[dept.code]._id,
          designation,
          role,

          employmentType:
            role === "Intern"
              ? "Intern"
              : rand(["Full Time", "Full Time", "Hybrid", "Remote"]),

          status:
            role === "Intern"
              ? "Probation"
              : rand(["Active", "Active", "Active", "On Leave"]),

          salary,
          joiningDate,
          contractStart,
          contractEnd,

          attendancePercentage: randInt(82, 100),
          leaveBalance: randInt(6, 20),
          performanceRating: rand(ratingPool),

          biography: `${designation} in the ${dept.name} department at Raj Software Developers.`,
        };

        const doc = await Employee.create(emp);
        created.push(doc);

        if (
          ["Department Head", "CEO", "HR Manager", "Finance Manager"].includes(
            role,
          ) &&
          !headsByDept[dept.code]
        ) {
          headsByDept[dept.code] = doc;
        }
      }
    }
  }

  console.log("Creating Super Admin...");
  const admin = await Employee.create({
    companyId,
    employeeId: "RSD-0000",
    cardNumber: "CARD-0000",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Admin",
    firstName: "System",
    lastName: "Admin",
    fullName: "System Administrator",
    gender: "Male",
    email: "admin@example.com",
    password: "Admin@123",
    department: deptDocs["EXEC"]._id,
    designation: "System Administrator",
    role: "Company Admin",
    employmentType: "Full Time",
    status: "Active",
    salary: 0,
    joiningDate: new Date("2024-01-01"),
    city: "Jalandhar",
  });

  console.log("Linking heads & managers...");
  const ceo = created.find((e) => e.role === "CEO");
  for (const dept of departments) {
    const head = headsByDept[dept.code];
    const members = created.filter(
      (e) => String(e.department) === String(deptDocs[dept.code]._id),
    );
    if (head) {
      deptDocs[dept.code].head = head._id;
    }
    deptDocs[dept.code].headcount = members.length;
    await deptDocs[dept.code].save();

    for (const m of members) {
      if (head && String(m._id) !== String(head._id)) {
        m.reportingManager = head._id;
        await m.save();
      } else if (head && ceo && String(head._id) === String(m._id)) {
        m.reportingManager = ceo._id;
        await m.save();
      }
    }
  }

  console.log("Creating contracts...");
  for (const e of created) {
    await Contract.create({
      companyId,
      employee: e._id,
      title: "Employment Contract",
      type: e.role === "Intern" ? "Internship" : "Fixed Term",
      startDate: e.contractStart,
      endDate: e.contractEnd,
      durationMonths: 24,
      salary: e.salary,
      status: e.contractEnd < new Date() ? "Expired" : "Active",
    });
  }

  console.log("Creating clients...");
  const clientNames = [
    ["Bright Retail LLC", "USA", "Upwork"],
    ["Nova Fashion", "UK", "LinkedIn"],
    ["GreenLeaf Organics", "Canada", "Direct"],
    ["UrbanTech Solutions", "UAE", "Referral"],
    ["Peak Fitness", "Australia", "Upwork"],
    ["Silk Route Traders", "India", "Direct"],
    ["BlueWave Media", "USA", "Freelancer"],
    ["Everest Consulting", "Germany", "LinkedIn"],
    ["Sunrise Foods", "Saudi Arabia", "Referral"],
    ["Pixel Studios", "UK", "Upwork"],
  ];
  const clients = [];
  for (const [name, country, source] of clientNames) {
    const c = await Client.create({
      companyId,
      name,
      company: name,
      country,
      source,
      email: `contact@${name.toLowerCase().replace(/[^a-z]/g, "")}.com`,
      status: rand(["Active", "Active", "Prospect"]),
      totalValue: randInt(5000, 120000),
    });
    clients.push(c);
  }

  console.log("Creating projects...");
  const managers = created.filter((e) =>
    ["Project Manager", "Department Head"].includes(e.role),
  );
  const projectNames = [
    "Ecommerce Store Revamp",
    "SaaS Analytics Dashboard",
    "Corporate Website",
    "Shopify Migration",
    "Brand Identity Package",
    "Booking System",
    "Inventory Management ERP",
    "Real Estate Portal",
    "LMS Platform",
    "Restaurant POS System",
    "Fintech Mobile App",
    "Marketing Landing Pages",
  ];
  const projects = [];
  let pcode = 0;
  for (const name of projectNames) {
    pcode += 1;
    const dept = rand(["WEB", "WP", "SHO", "ECOM", "GFX"]);
    const teamPool = created.filter(
      (e) => String(e.department) === String(deptDocs[dept]._id),
    );
    const p = await Project.create({
      companyId,
      name,
      code: `PRJ-${pad(pcode, 3)}`,
      description: `${name} for ${rand(clients).company}.`,
      client: rand(clients)._id,
      department: deptDocs[dept]._id,
      manager: rand(managers)?._id,
      team: teamPool.slice(0, randInt(3, 6)).map((e) => e._id),
      category: dept,
      priority: rand(["Low", "Medium", "High", "Critical"]),
      status: rand([
        "Planning",
        "In Progress",
        "In Progress",
        "On Hold",
        "Completed",
      ]),
      progress: randInt(0, 100),
      budget: randInt(3000, 90000),
      startDate: randomDate(2024, 2025),
      deadline: randomDate(2025, 2026),
    });
    projects.push(p);
  }

  console.log("Creating tasks...");
  const taskTitles = [
    "Set up project repository",
    "Design database schema",
    "Build authentication",
    "Create landing page",
    "Integrate payment gateway",
    "Write unit tests",
    "Fix responsive layout",
    "Optimize page load",
    "Deploy to staging",
    "Client feedback revisions",
    "Add product filters",
    "SEO optimization",
  ];
  for (const p of projects) {
    const n = randInt(4, 8);
    for (let i = 0; i < n; i++) {
      const assignee = rand(created);
      await Task.create({
        companyId,
        title: rand(taskTitles),
        project: p._id,
        assignee: assignee._id,
        priority: rand(["Low", "Medium", "High", "Critical"]),
        status: rand(["Todo", "In Progress", "Review", "Done"]),
        progress: randInt(0, 100),
        estimatedHours: randInt(2, 40),
        loggedHours: randInt(0, 30),
        dueDate: randomDate(2025, 2026),
      });
    }
  }

  await ActivityLog.create([
    {
      companyId,
      actor: admin._id,
      action: "seeded",
      entityType: "System",
      meta: { note: "Initial data load" },
    },
    {
      companyId,
      actor: ceo?._id,
      action: "created",
      entityType: "Project",
      meta: { name: projects[0]?.name },
    },
  ]);

  company.admin = admin._id;
  await company.save();

  console.log("Creating teams...");
  for (const dept of departments) {
    const members = created.filter(
      (e) => String(e.department) === String(deptDocs[dept.code]._id),
    );
    const team = await Team.create({
      companyId,
      name: `${dept.name} Team`,
      code: dept.code,
      description: `Delivery team for ${dept.name}.`,
      department: deptDocs[dept.code]._id,
      lead: headsByDept[dept.code]?._id || null,
      members: members.map((m) => m._id),
      headcount: members.length,
    });
    if (members.length) {
      await Employee.updateMany(
        { _id: { $in: members.map((m) => m._id) } },
        { team: team._id },
      );
    }
  }

  const totalEmployees = await Employee.countDocuments();
  console.log("\n==============================================");
  console.log(`\u2713 Seed complete`);
  console.log(`  Departments : ${departments.length}`);
  console.log(`  Employees   : ${totalEmployees} (incl. admin)`);
  console.log(`  Clients     : ${clients.length}`);
  console.log(`  Projects    : ${projects.length}`);
  console.log("----------------------------------------------");
  console.log(`  Teams       : ${departments.length}`);
  console.log(`  Company     : ${company.name} (${company.companyCode})`);
  console.log("----------------------------------------------");
  console.log("  Company Admin ->  admin@example.com / Admin@123");
  console.log("  Super Admin   ->  run `npm run migrate` to create it");
  console.log("==============================================\n");

  await mongoose.disconnect();
  process.exit(0);
};

run().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
