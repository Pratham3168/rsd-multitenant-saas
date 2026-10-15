import mongoose from 'mongoose';
import { tenantPlugin } from '../utils/tenancy.js';
import bcrypt from 'bcryptjs';

const ROLES = [
  'Company Admin',
  'Super Admin',
  'CEO',
  'HR Manager',
  'Finance Manager',
  'Project Manager',
  'Department Head',
  'Team Lead',
  'Senior Developer',
  'Developer',
  'Junior Developer',
  'Intern',
  'Employee',
];

export const COMPANY_ADMIN_ROLES = ['Company Admin', 'Super Admin', 'CEO'];

const employeeSchema = new mongoose.Schema(
  {
    // Internal employee identifiers
    employeeId: {
      type: String,
      required: true,
      trim: true, // e.g. RSD-0001
    },
    cardNumber: { type: String, required: true, trim: true },
    avatar: { type: String, default: '' },

    // Personal information
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    fullName: { type: String, required: true, trim: true },

    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      required: true,
    },

    dateOfBirth: { type: Date },

    // Optional Indian identity information
    aadhaarNumber: {
      type: String,
      trim: true,
      select: false,
      set: (value) => (value === '' ? undefined : value),
    },

    nationality: { type: String, default: 'Indian' },
    religion: { type: String, default: '' },

    maritalStatus: {
      type: String,
      enum: ['Single', 'Married', 'Divorced', 'Widowed'],
      default: 'Single',
    },

    bloodGroup: { type: String, default: '' },

    // Contact information
    phone: { type: String, default: '' },
    emergencyContact: { type: String, default: '' },

    personalEmail: {
      type: String,
      lowercase: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
      minlength: 6,
    },

    // Indian address information
    currentAddress: { type: String, default: '' },
    city: { type: String, default: 'Jalandhar', trim: true },
    state: { type: String, default: 'Punjab', trim: true },

    // Education and skills
    qualification: { type: String, default: '' },
    university: { type: String, default: '' },
    experienceYears: { type: Number, default: 0 },
    skills: [{ type: String }],
    languages: [{ type: String }],

    // Organization structure
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
    },

    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
      default: null,
    },

    designation: { type: String, required: true },

    reportingManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      default: null,
    },

    role: {
      type: String,
      enum: ROLES,
      default: 'Employee',
    },

    // Employment details
    employmentType: {
      type: String,
      enum: ['Full Time', 'Part Time', 'Intern', 'Remote', 'Hybrid', 'Contract'],
      default: 'Full Time',
    },

    status: {
      type: String,
      enum: [
        'Active',
        'On Leave',
        'Resigned',
        'Terminated',
        'Probation',
        'Suspended',
        'Retired',
      ],
      default: 'Active',
    },

    salary: { type: Number, required: true, default: 0 },

    joiningDate: { type: Date, required: true },
    contractStart: { type: Date },
    contractEnd: { type: Date },

    // Performance and attendance
    attendancePercentage: { type: Number, default: 100 },
    leaveBalance: { type: Number, default: 20 },

    performanceRating: {
      type: String,
      enum: ['Excellent', 'Very Good', 'Good', 'Average', 'Needs Improvement'],
      default: 'Good',
    },

    biography: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Search index
employeeSchema.index({
  fullName: 'text',
  email: 'text',
  designation: 'text',
});

// Hash password before saving
employeeSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  this.password = await bcrypt.hash(this.password, 10);
});

// Compare passwords
employeeSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

// Virtual age field
employeeSchema.virtual('age').get(function () {
  if (!this.dateOfBirth) return null;

  return Math.floor(
    (Date.now() - this.dateOfBirth.getTime()) / 31557600000
  );
});

employeeSchema.set('toJSON', { virtuals: true });
employeeSchema.set('toObject', { virtuals: true });

// Multi-tenant support
employeeSchema.plugin(tenantPlugin, { modelName: 'Employee' });

// Company-scoped indexes
employeeSchema.index(
  { companyId: 1, employeeId: 1 },
  { unique: true }
);

employeeSchema.index(
  { companyId: 1, cardNumber: 1 },
  { unique: true }
);

employeeSchema.index(
  { companyId: 1, aadhaarNumber: 1 },
  {
    unique: true,
    partialFilterExpression: {
      aadhaarNumber: { $type: 'string' },
    },
  }
);

employeeSchema.index({ companyId: 1, team: 1 });
employeeSchema.index({ companyId: 1, status: 1 });

export { ROLES };

export default mongoose.model('Employee', employeeSchema);
