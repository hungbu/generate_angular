/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{html,ts,scss}",
    ],
    theme: {
      extend: {
        colors: {
          // Define custom colors for text, buttons, etc.
          primary: '#1D4ED8', // Custom color for primary elements (text, buttons)
          secondary: '#D1D5DB', // Custom color for secondary elements
          error: '#EF4444', // Custom color for error text
          success: '#10B981', // Custom color for success messages
        },
        fontFamily: {
          // Set custom fonts for headers and body
          sans: ['Inter', 'Arial', 'sans-serif'], // Default sans-serif font
          heading: ['Poppins', 'sans-serif'], // Custom font for headings
          body: ['Roboto', 'sans-serif'], // Custom font for body text
        },
        fontSize: {
          // Custom font sizes for text elements
          header: '2rem', // Font size for header
          title: '1.75rem', // Font size for title
          subtitle: '1.25rem', // Font size for subtitle
          body: '1rem', // Font size for body text
          small: '0.875rem', // Font size for small text (e.g., validation)
        },
        spacing: {
          // Customize spacing (margins, padding, etc.)
          '18': '4.5rem', // For larger margins or paddings
        },
        borderRadius: {
          // Custom border radius for rounded buttons, cards, etc.
          lg: '0.5rem', // Large radius for rounded corners
          md: '6px', // Medium radius for rounded corners
        },
        boxShadow: {
          // Custom box shadow for elements like buttons
          default: '0 2px 10px rgba(0, 0, 0, 0.1)', // Subtle shadow
        },
      },
    },
    plugins: [],
  }
  