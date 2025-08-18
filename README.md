# YTS - Yaani Tiffin Services

A modern Next.js website for an Indian tiffin service with admin functionality to manage recipes through a static JSON file.

## 🚀 Features

- **Modern Next.js 14** with TypeScript and Tailwind CSS
- **Responsive Design** - Works on all devices
- **Static Admin Panel** - Simple password-protected admin interface
- **Recipe Management** - Edit recipes through JSON files
- **SEO Optimized** - Meta tags and structured data
- **Fast Performance** - Optimized images and code splitting

## 📁 Project Structure

```
tiffin-service/
├── app/
│   ├── admin/
│   │   └── page.tsx          # Admin panel for recipe management
│   ├── api/
│   │   └── meals/
│   │       ├── route.ts      # API to fetch meals
│   │       └── save/
│   │           └── route.ts  # API to save meals
│   ├── plans/
│   │   └── page.tsx          # Plans and menu page
│   ├── globals.css           # Global styles with Tailwind
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Homepage
├── components/
│   ├── Header.tsx            # Navigation header
│   ├── HeroSection.tsx       # Hero section
│   ├── FeaturedOffers.tsx    # Featured offers
│   ├── WhyChooseUs.tsx       # Features section
│   ├── PopularMeals.tsx      # Popular meals display
│   ├── HowItWorks.tsx        # How it works section
│   ├── Testimonials.tsx      # Customer testimonials
│   ├── CTASection.tsx        # Call-to-action section
│   └── Footer.tsx            # Footer
├── data/
│   └── recipes.json          # Static data for meals and recipes
├── package.json
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## 🛠️ Installation & Setup

1. **Install Dependencies**

   ```powershell
   npm install
   ```

2. **Start Development Server**

   ```powershell
   npm run dev
   ```

3. **Open in Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Admin Panel

Access the admin panel at [http://localhost:3000/admin](http://localhost:3000/admin)

**Default Admin Credentials:**

- Password: `admin123`

### Admin Features:

- ✅ Add new meals
- ✅ Edit existing meals
- ✅ Delete meals
- ✅ Manage pricing and components
- ✅ Update stock levels
- ✅ Set popular status

## 📄 Data Management

The website uses a static JSON file (`data/recipes.json`) to store all meal information:

```json
{
  "meals": [
    {
      "id": 1,
      "name": "Mini Meal",
      "price": 159,
      "originalPrice": 169,
      "description": "Perfect for light appetite with authentic flavors",
      "components": {
        "rotis": 3,
        "curries": 2,
        "rice": 0,
        "salad": 1
      },
      "image": "https://images.unsplash.com/...",
      "category": "budget",
      "popular": false,
      "stockLeft": 50
    }
  ],
  "featuredOffers": [...],
  "testimonials": [...]
}
```

## 🎨 Customization

### Colors

Update the color scheme in `tailwind.config.js`:

```javascript
colors: {
  primary: {
    // Orange theme
    500: '#f97316',
    600: '#ea580c',
    // ... more shades
  },
  secondary: {
    // Green theme
    500: '#22c55e',
    600: '#16a34a',
    // ... more shades
  }
}
```

### Content

- **Contact Information**: Update phone numbers and WhatsApp links throughout the components
- **Business Hours**: Update in Footer component
- **Service Area**: Update "Throughout GTA" text as needed
- **Images**: Replace Unsplash URLs with your own images

## 📱 Features

### Homepage

- Hero section with call-to-action
- Featured offers carousel
- Why choose us section
- Popular meals display
- How it works process
- Customer testimonials
- Contact section

### Plans Page

- Full menu display
- Filter by category (All, Popular, Budget, Premium)
- Detailed meal information
- Stock levels
- Pricing with discounts

### Admin Panel

- Simple password authentication
- CRUD operations for meals
- Real-time preview
- Form validation
- Responsive design

## 🚀 Deployment

### Build for Production

```powershell
npm run build
npm start
```

### Deploy to Vercel

```powershell
npm install -g vercel
vercel --prod
```

### Deploy to Netlify

1. Build the project: `npm run build`
2. Upload the `.next` folder to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `.next`

## 🔒 Security Notes

- Change the default admin password in `app/admin/page.tsx`
- For production, implement proper authentication
- Consider using environment variables for sensitive data
- Add rate limiting for API endpoints

## 📞 Contact Information

Update these throughout the application:

- Phone: +1 867 888 2293
- WhatsApp: https://wa.me/18678882293
- Service Area: Greater Toronto Area (GTA)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is open source and available under the MIT License.

---

Made with ❤️ for authentic Indian cuisine lovers.
