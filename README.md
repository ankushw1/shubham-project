# Event Registration Form

A modern, mobile-responsive event registration form built with Next.js 14, JavaScript, and Tailwind CSS. Features a comprehensive registration form with 20 fields and an admin panel to view all submissions.

## Features

- ✅ **20 Field Registration Form** with all required inputs
- ✅ **Mobile Responsive Design** - Works perfectly on all devices
- ✅ **Premium UI/UX** - Beautiful gradient theme with smooth animations
- ✅ **MongoDB Integration** - All submissions saved to MongoDB database
- ✅ **Admin Panel** - View all registrations in a comprehensive table
- ✅ **File Upload Support** - Upload photos (stored as base64)
- ✅ **Form Validation** - Required field validation
- ✅ **Real-time Status Updates** - Success/error messages

## Form Fields

1. Name of Participant
2. Roll Number / ID
3. Department (Dropdown)
4. Year / Class (Dropdown)
5. Gender (Multiple Choice)
6. Contact Number
7. Email ID
8. Event Type (Multiple Choice)
9. Event Category (Solo/Group)
10. Event Date
11. Time Slot
12. Faculty Mentor
13. Team Name (if group)
14. Volunteer Interest (Yes/No)
15. Feedback on College Support (1-5 scale)
16. Overall Event Rating (1-5 scale)
17. Suggestions for Improvement
18. Participation Experience
19. Uploaded Photo (optional)
20. Remarks by Committee

## Tech Stack

- **Next.js 14** - React framework with App Router
- **JavaScript** - No TypeScript
- **Tailwind CSS** - Utility-first CSS framework
- **MongoDB** - Database for storing registrations

## Installation

1. Clone the repository or navigate to the project directory:
```bash
cd shubham-project
```

2. Install dependencies:
```bash
npm install
```

3. Update MongoDB connection string:
   - Open `lib/mongodb.js`
   - Replace `<db_password>` in the connection string with your actual MongoDB password

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Registration Form

1. Navigate to the home page (`/`)
2. Fill in all the required fields
3. Optionally upload a photo
4. Click "Submit Registration"
5. You'll be redirected to the admin panel after successful submission

### Admin Panel

1. Navigate to `/admin` or click "View Admin Panel" button
2. View all registrations in a comprehensive table
3. All 20 fields are displayed for each registration
4. Table is scrollable on mobile devices for better responsiveness

## Project Structure

```
shubham-project/
├── app/
│   ├── api/
│   │   ├── submit-form/
│   │   │   └── route.js          # API endpoint for form submission
│   │   └── get-registrations/
│   │       └── route.js          # API endpoint to fetch all registrations
│   ├── admin/
│   │   └── page.js                # Admin panel page
│   ├── globals.css                # Global styles and Tailwind config
│   ├── layout.js                  # Root layout component
│   └── page.js                    # Registration form page
├── lib/
│   └── mongodb.js                 # MongoDB connection utility
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
└── README.md
```

## MongoDB Connection

The MongoDB connection string is hardcoded in `lib/mongodb.js`. Make sure to:

1. Replace `<db_password>` with your actual MongoDB Atlas password
2. Ensure your IP is whitelisted in MongoDB Atlas
3. The database name is `event-registration`
4. The collection name is `registrations`

## Responsive Design

The entire application is fully responsive and optimized for:
- 📱 Mobile phones (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)
- 🖥️ Large screens (1280px+)

## Customization

### Theme Colors

Edit `tailwind.config.js` to customize the primary color scheme.

### Form Fields

Modify `app/page.js` to add, remove, or modify form fields.

### Admin Panel

Customize the admin panel table in `app/admin/page.js`.

## Build for Production

```bash
npm run build
npm start
```

## Notes

- All form data is validated on the client side
- Photos are converted to base64 and stored in MongoDB
- The admin panel displays all submissions sorted by creation date (newest first)
- No edit/delete functionality is implemented as per requirements

## Support

For issues or questions, please contact the development team.

---

**Built with ❤️ using Next.js 14 and Tailwind CSS**
