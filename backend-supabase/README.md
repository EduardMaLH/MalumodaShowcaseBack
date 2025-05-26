# backend-supabase

## Project Overview
This project is a backend application that utilizes Supabase as its backend service. It provides a RESTful API for managing products, stores, and users.

## File Structure
```
backend-supabase
├── .env
├── app.js
├── supabaseClient.js
├── routes
│   ├── productos.js
│   ├── tiendas.js
│   └── usuarios.js
└── README.md
```

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd backend-supabase
   ```

2. **Install Dependencies**
   Make sure you have Node.js installed. Then run:
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the root directory and add your Supabase credentials:
   ```
   SUPABASE_URL=<your-supabase-url>
   SUPABASE_ANON_KEY=<your-anon-key>
   ```

4. **Run the Application**
   Start the server with:
   ```bash
   node app.js
   ```

## Usage
- The API provides endpoints for managing products, stores, and users.
- You can access the API at `http://localhost:3000`.

## Contributing
Feel free to submit issues or pull requests for improvements or bug fixes.

## License
This project is licensed under the MIT License.