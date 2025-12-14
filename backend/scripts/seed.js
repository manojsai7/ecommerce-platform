const { User, Product } = require('../src/models');
const bcrypt = require('bcryptjs');

const seedDatabase = async () => {
  try {
    console.log('Starting database seeding...');

    // WARNING: These are hardcoded credentials for development/testing only
    // In production, use environment variables or require password change on first login
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@ecommerce.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    
    // Create admin user
    const hashedAdminPassword = await bcrypt.hash(adminPassword, 10);
    await User.create({
      email: adminEmail,
      password: hashedAdminPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
    });
    console.log('✓ Admin user created');

    // Create sample customer
    const customerPassword = await bcrypt.hash('customer123', 10);
    await User.create({
      email: 'customer@example.com',
      password: customerPassword,
      firstName: 'John',
      lastName: 'Doe',
      role: 'customer',
    });
    console.log('✓ Sample customer created');

    // Create sample products
    const products = [
      {
        name: 'Wireless Headphones',
        description: 'Premium noise-cancelling wireless headphones with 30-hour battery life.',
        price: 199.99,
        compareAtPrice: 249.99,
        sku: 'WH-001',
        inventory: 50,
        category: 'Electronics',
        tags: ['audio', 'wireless', 'premium'],
        images: ['https://via.placeholder.com/400'],
        isFeatured: true,
      },
      {
        name: 'Smart Watch',
        description: 'Fitness tracking smartwatch with heart rate monitor and GPS.',
        price: 299.99,
        sku: 'SW-001',
        inventory: 30,
        category: 'Electronics',
        tags: ['wearable', 'fitness', 'smart'],
        images: ['https://via.placeholder.com/400'],
        isFeatured: true,
      },
      {
        name: 'Laptop Backpack',
        description: 'Durable laptop backpack with multiple compartments and USB charging port.',
        price: 49.99,
        sku: 'BP-001',
        inventory: 100,
        category: 'Accessories',
        tags: ['bag', 'laptop', 'travel'],
        images: ['https://via.placeholder.com/400'],
      },
      {
        name: 'Mechanical Keyboard',
        description: 'RGB mechanical gaming keyboard with customizable keys.',
        price: 129.99,
        compareAtPrice: 159.99,
        sku: 'KB-001',
        inventory: 40,
        category: 'Electronics',
        tags: ['keyboard', 'gaming', 'rgb'],
        images: ['https://via.placeholder.com/400'],
      },
      {
        name: 'USB-C Hub',
        description: '7-in-1 USB-C hub with HDMI, USB 3.0, and card reader.',
        price: 39.99,
        sku: 'HUB-001',
        inventory: 75,
        category: 'Accessories',
        tags: ['usb', 'hub', 'adapter'],
        images: ['https://via.placeholder.com/400'],
      },
    ];

    for (const product of products) {
      await Product.create(product);
    }
    console.log('✓ Sample products created');

    console.log('\nDatabase seeding completed successfully!');
    console.log('\nLogin credentials:');
    console.log(`Admin: ${adminEmail} / ${adminPassword}`);
    console.log('Customer: customer@example.com / customer123');
    console.log('\nWARNING: Change these credentials in production!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run seed if this file is executed directly
if (require.main === module) {
  const { syncDatabase } = require('../src/models');
  syncDatabase().then(seedDatabase);
}

module.exports = seedDatabase;
