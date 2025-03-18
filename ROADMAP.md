# Havenix MVP Development Roadmap

## 📌 Overview
Havenix is a platform that connects students with property owners for safe, convenient, and affordable off-campus housing. This document outlines all the necessary components for the MVP, providing a structured plan for development and tracking progress.

---

## ✅ Core Features Checklist

### 1️⃣ **Authentication & User Management**
- [x] User signup and login with Supabase authentication
- [x] Role-based access (Student, Landlord, Admin)
- [ ] Profile setup and management (Students & Landlords) 
- [ ] Email verification & password reset
- [ ] OAuth login (Google, Facebook, etc.) _(optional for later)_

### 2️⃣ **Property Listings & Management**
- [x] Landlords can list properties (Basic form working)
- [ ] Property listing enhancements:
  - [ ] Multiple images upload 
  - [ ] Categorization (e.g., apartments, hostels, private rooms)
  - [ ] Amenities checklist (WiFi, Electricity, Water, etc.)
  - [ ] Contact details integration (WhatsApp, Phone, Email)
- [ ] Property availability status (Rented, Available)
- [ ] Edit & delete property listings

### 3️⃣ **Student Dashboard**
- [x] View available properties
- [x] Property details page with basic info
- [ ] Save & favorite properties
- [ ] Filter and search by price, location, and amenities
- [ ] Inquiry system (Message landlords directly)

### 4️⃣ **Landlord Dashboard**
- [x] Add properties (Basic functionality)
- [ ] View & manage listed properties
- [ ] Track inquiries from students
- [ ] Update property availability status

### 5️⃣ **Admin Panel (Basic Controls)**
- [ ] Manage users (Approve, Ban, Delete)
- [ ] View reports (User activities, Property analytics)
- [ ] Handle complaints & disputes
- [ ] Feature property listings (Priority rankings)

### 6️⃣ **Booking & Rent Payment System (Future Scope)**
- [ ] Direct rent payment via the platform _(Stripe or Flutterwave)_
- [ ] Rent installment plans (Optional feature)
- [ ] Rental agreement e-signing

### 7️⃣ **Virtual Property Tours**
- [ ] 3D model integration for selected properties
- [ ] Embedded virtual tour videos _(Optional in MVP)_

### 8️⃣ **Notifications & Alerts**
- [ ] Email & push notifications for:
  - [ ] New property listings
  - [ ] Inquiry responses
  - [ ] Payment reminders (If rent system is included)

### 9️⃣ **Mobile Responsiveness & Performance**
- [x] Basic mobile-friendly UI
- [ ] Full mobile optimization (Check UI scaling issues)
- [ ] App performance enhancements (Reduce loading times)

### 🔟 **Deployment & Hosting**
- [x] GitHub repository setup
- [x] Vite project configuration
- [x] GitHub Pages deployment
- [ ] Custom domain setup _(Optional)_
- [ ] Supabase database optimization (Indexes, queries performance)

---

## 🔧 Tech Stack
- **Frontend**: React (Vite), CSS Modules
- **Backend**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Deployment**: GitHub Pages (For now)

---

## 📝 Development Workflow
1. **Feature Planning** → Identify requirements for each component.
2. **Development** → Implement features in modular sections.
3. **Testing** → Test each feature before moving forward.
4. **Deployment** → Push stable updates to GitHub.
5. **Review & Optimization** → Fix issues, improve performance.

---

## 🚀 Next Steps
- [ ] Complete missing features in student & landlord dashboards
- [ ] Implement advanced filtering & search
- [ ] Optimize Supabase queries for performance
- [ ] Integrate messaging system between students and landlords

---

This roadmap will evolve as we progress. Let’s keep building! 💪🔥
