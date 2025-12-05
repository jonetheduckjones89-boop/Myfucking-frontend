# MedCore AI Frontend

Beautiful, modern Next.js frontend for the MedCore AI Agent platform.

## 🚀 Features

- **Drag-and-Drop Upload**: Intuitive file upload with drag-and-drop support
- **Real-time Analysis**: Instant AI-powered document analysis
- **Beautiful UI**: Modern, responsive design with dark mode support
- **Action Items**: Prioritized action items with visual indicators
- **Backend Status**: Real-time backend health monitoring

## 🛠️ Tech Stack

- **Next.js 16**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS 4**: Modern styling with custom theme
- **React 19**: Latest React features

## 📦 Installation

```bash
npm install
```

## 🔑 Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

For production, use your Render backend URL:
```env
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
```

## 💻 Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🏗️ Build

```bash
npm run build
npm start
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variable: `NEXT_PUBLIC_API_URL`
4. Deploy!

### Render Static Site

1. **Build Command**: `npm install && npm run build`
2. **Publish Directory**: `.next`
3. **Environment Variables**:
   - `NEXT_PUBLIC_API_URL`: Your backend URL

## 📡 API Integration

The frontend connects to these backend endpoints:

- `GET /api/health` - Health check
- `POST /api/upload` - Upload and analyze document

## 🎨 Features

### File Upload
- Drag-and-drop support
- File type validation (PDF, DOCX)
- File size validation (max 10MB)
- Real-time upload progress

### Results Display
- AI-generated summary
- Prioritized action items
- Document metadata
- Processing time

### UI/UX
- Responsive design
- Dark mode support
- Smooth animations
- Error handling
- Loading states

## 📝 License

MIT
