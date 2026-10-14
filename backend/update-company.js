
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Company from './src/models/Company.js';
import { connectDB } from './src/config/db.js';
import { env } from './src/config/env.js';

dotenv.config();

try {
  await connectDB(env.mongoUri);

  const company = await Company.findOne({ slug: 'gsdc' });

  if (!company) {
    console.log('Company not found. No changes made.');
  } else {
    company.name =
      process.env.LEGACY_COMPANY_NAME || company.name;

    company.email = (
      process.env.LEGACY_COMPANY_EMAIL || company.email
    ).toLowerCase();

    company.ownerName =
      process.env.LEGACY_OWNER_NAME || company.ownerName;

    await company.save();

    console.log('Company updated successfully:', company.name);
    console.log('Owner:', company.ownerName);
    console.log('Email:', company.email);
  }
} catch (error) {
  console.error('Update failed:', error.message);
} finally {
  await mongoose.disconnect();
}
