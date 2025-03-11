# WeCan - Social Welfare Club Website

A responsive website for WeCan, a social welfare club of NIT Agartala, working towards the empowerment of underprivileged children through education.

## 🌟 Features

- **Responsive Design**: Fully responsive website that works on all devices
- **Modern UI/UX**: Beautiful and intuitive user interface with smooth animations
- **Authentication**: Secure user authentication with NextAuth.js
- **Alumni Section**: Alumni registration, verification, and community features
- **Volunteer Management**: Information about past and present volunteers
- **Ananya Festival**: Details about the annual sports-cultural fest
- **Donation System**: Multiple donation options with QR code and bank details
- **Contact Form**: Interactive contact form with validation

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS, Framer Motion
- **Backend**: Next.js (App Router)
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js, JWT
- **Form Handling**: React Hook Form
- **Styling**: Tailwind CSS
- **Icons**: React Icons
- **Animations**: Framer Motion
- **Carousel**: Swiper.js
- **Notifications**: React Toastify

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- MongoDB (local or Atlas)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/wecan-website.git
   cd wecan-website
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the website.

## 📁 Project Structure

```
wecan-website/
├── public/             # Static files
│   └── images/         # Image assets
├── src/                # Source code
│   ├── app/            # Next.js App Router
│   │   ├── api/        # API routes
│   │   ├── about/      # About page
│   │   ├── alumni/     # Alumni page
│   │   ├── ananya/     # Ananya page
│   │   ├── contact/    # Contact page
│   │   ├── donate/     # Donate page
│   │   ├── login/      # Login page
│   │   ├── register/   # Register page
│   │   ├── volunteers/ # Volunteers page
│   │   └── page.tsx    # Home page
│   ├── components/     # React components
│   ├── lib/            # Utility functions
│   ├── models/         # MongoDB models
│   └── utils/          # Helper functions
├── .env.local          # Environment variables
├── next.config.js      # Next.js configuration
├── package.json        # Project dependencies
├── postcss.config.js   # PostCSS configuration
├── tailwind.config.js  # Tailwind CSS configuration
└── tsconfig.json       # TypeScript configuration
```

## 🔒 Authentication

The website uses NextAuth.js for authentication with the following features:
- Email/password authentication
- JWT-based sessions
- Role-based access control (user, admin, alumni)
- Secure password hashing with bcrypt

## 📱 Mobile App Integration 

The [WeCan mobile app](https://play.google.com/store/apps/details?id=com.nita.wecan) provides essential information and download links for both Android and iOS platforms.

## 🤝 Contributing 

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

For any questions or suggestions, please contact us at wecan@nita.ac.in.
