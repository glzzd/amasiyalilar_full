const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const User = require('../models/User');
const Role = require('../models/Role');
const Permission = require('../models/Permission');
const PermissionToRoleAssignment = require('../models/PermissionToRoleAssignment');
const RoleToUserAssignment = require('../models/RoleToUserAssignment');
const connectDB = require('../config/database');

const seedUsers = [
  {
    email: 'superadmin@amasiyalilar.az',
    password: 'admin123',
    personalData: {
      name: 'Super',
      surname: 'Admin',
      patronymic: 'Amasiyalı',
      gender: 'male'
    },
    isActive: true,
    role: 'Admin'
  }
];

const seedRoles = [
  { name: 'Admin', description: 'Tam səlahiyyətli idarəçi' },
  { name: 'User', description: 'Standart istifadəçi' }
];

const seedPermissions = [
  // User permissions
  { name: 'İstifadəçi Yaratmaq', slug: 'user.create', description: 'Yeni istifadəçi yarada bilər', resource: 'user', action: 'create' },
  { name: 'İstifadəçi Oxumaq', slug: 'user.read', description: 'İstifadəçi məlumatlarını görə bilər', resource: 'user', action: 'read' },
  { name: 'İstifadəçi Yeniləmək', slug: 'user.update', description: 'İstifadəçi məlumatlarını yeniləyə bilər', resource: 'user', action: 'update' },
  { name: 'İstifadəçi Silmək', slug: 'user.delete', description: 'İstifadəçini silə bilər', resource: 'user', action: 'delete' },
  
  // Role permissions
  { name: 'Rol Yaratmaq', slug: 'role.create', description: 'Yeni rol yarada bilər', resource: 'role', action: 'create' },
  { name: 'Rol Oxumaq', slug: 'role.read', description: 'Rolları görə bilər', resource: 'role', action: 'read' },
  { name: 'Rol Yeniləmək', slug: 'role.update', description: 'Rolu yeniləyə bilər', resource: 'role', action: 'update' },
  { name: 'Rol Silmək', slug: 'role.delete', description: 'Rolu silə bilər', resource: 'role', action: 'delete' }
];

const seedDatabase = async () => {
  try {
    await connectDB();
    
    console.log('🌱 Verilənlər bazasına ilkin məlumatların əlavə olunması başladı...');
    
    // Clear existing data
    await RoleToUserAssignment.deleteMany({});
    await PermissionToRoleAssignment.deleteMany({});
    await Permission.deleteMany({});
    await Role.deleteMany({});
    await User.deleteMany({});
    console.log('✅ Mövcud məlumatlar təmizləndi');

    // Create Permissions
    const createdPermissions = await Permission.insertMany(seedPermissions);
    console.log(`✅ ${createdPermissions.length} icazə yaradıldı`);

    // Create Roles
    const createdRoles = await Role.insertMany(seedRoles);
    console.log(`✅ ${createdRoles.length} rol yaradıldı`);

    const adminRole = createdRoles.find(r => r.name === 'Admin');
    const userRole = createdRoles.find(r => r.name === 'User');

    // Assign Permissions to Roles
    const permissionAssignments = [];
    
    // Admin gets all permissions
    createdPermissions.forEach(perm => {
      permissionAssignments.push({
        roleId: adminRole._id,
        permissionId: perm._id
      });
    });

    // User gets only read permissions
    createdPermissions.filter(p => p.action === 'read').forEach(perm => {
      permissionAssignments.push({
        roleId: userRole._id,
        permissionId: perm._id
      });
    });

    await PermissionToRoleAssignment.insertMany(permissionAssignments);
    console.log(`✅ İcazələr rollara təyin edildi`);
    
    // Create new users and assign roles
    for (const userData of seedUsers) {
      const { role, ...userProps } = userData;
      const user = new User(userProps);
      await user.save();
      console.log(`✅ Əlavə edilən istifadəçi: ${user.email}`);

      // Assign Role to User
      const targetRole = createdRoles.find(r => r.name === role);
      if (targetRole) {
        await RoleToUserAssignment.create({
          userId: user._id,
          roleId: targetRole._id
        });
        console.log(`   - Rol təyin edildi: ${role}`);
      }
    }
    
    console.log('🎉 Verilənlər bazasına məlumatların əlavə olunması uğurla yekunlaşdı!');
    console.log('\n📋 Əlavə edilən istifadəçilər:');
    seedUsers.forEach(user => {
      console.log(`   E-poçt: ${user.email} | Şifrə: ${user.password} | Rol: ${user.role}`);
    });
    
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Verilənlər bazasına məlumat əlavə olunması zamanı xəta baş verdi:', error.message);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();
