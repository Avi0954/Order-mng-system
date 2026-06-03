# 📦 Inventory & Order Management System (InventoryMS)

A complete, enterprise-grade **Inventory and Order Management System** built with **Next.js 15 App Router**, **Prisma ORM**, **Neon PostgreSQL**, and **NextAuth.js**. The application supports distinct user roles (Admin & Seller), dynamic unit conversion (g/kg/mL/L/item), real-time stock validations, and transactional audit trails.

---

## ✨ Features

### 👤 Role-Based Access Control (RBAC)
* **Administrator**: Managed product catalog CRUD, warehouse stock thresholds, manual audits, and order approval/rejection pipelines.
* **Seller**: Product catalogue browsing, real-time search (Name & SKU), automated unit conversion helper, quotation preview generation, and order placements.
* **Middleware Guards**: Secure endpoint routing blocking unauthorised privilege requests.

### 📐 Smart Unit Conversion & Storage
* Unified inventory storage strategy: all product stock volumes and counts are converted and stored using raw **Base Units** (`g`, `mL`, `item`) to eliminate float precision errors.
* Transparent real-time conversion for order quantities (e.g. converting `2 kg` to `2000 g` or `1.5 L` to `1500 mL` automatically during quotation calculations).

### ⚡ Transactional Inventory Updates
* Strict server-side verification comparing order items against real-time warehouse stock quantity.
* Atomic database transitions: stock levels are reduced within a Postgres `$transaction` block only when the order status transitions to `APPROVED`, preventing duplicate reductions or double-spending.
* Automatic logging of all stock adjustments (e.g., product creation, manual updates, and order approvals) to an immutable `InventoryTransaction` ledger.

### 📊 Admin Inventory Dashboard
* Comprehensive stats tracking: Total SKUs, aggregated stock items, low stock warnings, and out-of-stock counts.
* Interactive inventory listing with color-coded status badges (`In Stock`, `Low Stock Alert`, `Out of Stock`) mapping to customizable threshold limits.
* Individual product inspection sheets displaying granular properties and historical transaction logs.

---

## 🛠️ Technology Stack

* **Core Framework**: [Next.js 15](https://nextjs.org/) (App Router, Server Actions, Dynamic Routes)
* **Frontend**: [React 19](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/), [Lucide React Icons](https://lucide.dev/)
* **ORM (Database Client)**: [Prisma Client](https://www.prisma.io/)
* **Database Engine**: [Neon Serverless PostgreSQL](https://neon.tech/)
* **Authentication**: [NextAuth.js v4](https://next-auth.js.org/) (Credentials Provider with JWT Strategy)
* **Libraries**: `bcryptjs` (secure password hashing)

---

## 📂 Project Structure

```text
src/
├── actions/
│   ├── authActions.js        # Authentication helpers
│   ├── productActions.js     # Transactional Product CRUD actions
│   └── orderActions.js       # Transactional stock reduction & status updates
│
├── app/
│   ├── admin/
│   │   ├── inventory/        # Inventory grid and product ledger details
│   │   ├── orders/           # Administrator order approval console
│   │   └── products/         # Catalog management forms (CRUD)
│   ├── api/
│   │   └── auth/             # NextAuth routing handlers
│   ├── debug/
│   │   └── users/            # Verification dashboard showing Postgres users
│   ├── dashboard/            # Seller entry dashboard
│   ├── orders/               # Seller orders listing
│   ├── products/             # Product catalog with search and unit conversion
│   └── login/                # User authentication screen
│
├── components/
│   ├── Sidebar.jsx           # Dynamic navigation bar
│   ├── PageHeader.jsx        # Premium section header layouts
│   └── InventoryTable.jsx    # Warehouse listing component
│
├── lib/
│   ├── auth.js               # Session helpers and credentials provider
│   ├── prisma.js             # Singleton Prisma Client export
│   ├── unitConverter.js      # Unit conversion scaling logic
│   └── inventoryValidator.js # Validation rules for quantities & stock checks
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory of the project and populate the following keys:

```ini
# Neon Serverless PostgreSQL Database Connection string
DATABASE_URL="postgresql://user:password@ep-some-id.us-east-1.aws.neon.tech/neondb?sslmode=require"

# NextAuth Security Secret
NEXTAUTH_SECRET="your-super-secret-development-key-12345"

# NextAuth Client base URL
NEXTAUTH_URL="http://localhost:3000"
```

---

## 🚀 Installation & Running Locally

### 1. Clone the repository
```bash
git clone https://github.com/Avi0954/Order-mng-system.git
cd Order-mng-system
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup the Database Schema
Generate local Prisma bindings and run migrations to create the required tables in your Neon PostgreSQL database:
```bash
npx prisma generate
npx prisma migrate dev --name init_inventory_system
```

### 4. Seed the Database
Populate the database with standard Admin and Seller credentials:
```bash
node prisma/seed.js
```

### 5. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🔑 Demo Credentials

Once the database has been successfully seeded, you can sign in using:

* **Administrator**:
  * **Email**: `admin@example.com`
  * **Password**: `password123`
  * **Role**: `ADMIN` (Access to products CRUD, inventory tracking, and order approvals)

* **Seller Account**:
  * **Email**: `seller@example.com`
  * **Password**: `password123`
  * **Role**: `SELLER` (Access to search catalog, make conversions, and order placements)

---

## 📈 Future Improvements
* **Advanced Reports**: Export inventory levels to CSV and PDF sheets.
* **Notifications**: Push notifications or Email warnings when products drop below their threshold.
* **Supplier Management**: Integrated suppliers and automatic purchase order generations.
