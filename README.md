# GlobalTech - Innovative IT Solutions Platform

A comprehensive web platform for GlobalTech (globaltech.az), showcasing enterprise IT solutions with cutting-edge design and interactive features.

## Features

### 🚀 Modern Design & User Experience
- **Futuristic UI**: Cybersecurity-themed design with neon accents and dark mode
- **3D Animations**: Interactive Three.js animations showcasing servers, security shields, and network nodes
- **Responsive Design**: Fully responsive layout optimized for all devices
- **Dynamic Interactions**: Animated counters, typing effects, and particle systems

### 💼 Comprehensive IT Services Portfolio
- **Enterprise Infrastructure Solutions**
  - Data Center Design and Implementation
  - Enterprise Storage Solutions
  - Virtualization and Containerization

- **Advanced Cybersecurity Services**
  - 24/7 Security Operations Center (SOC)
  - Vulnerability Management
  - Compliance and Governance

- **Cloud & Digital Transformation**
  - Multi-Cloud Strategy and Management
  - Digital Workplace Solutions
  - Data Migration and Integration

- **Emerging Technologies**
  - AI & Machine Learning Solutions
  - IoT Implementation
  - Blockchain Technology

### 🛠️ Technical Features
- **Django Framework**: Built with Django 5.2.3 for robust backend
- **PostgreSQL Database**: Enterprise-grade database support
- **Microservices Ready**: Architecture prepared for microservices expansion
- **RESTful APIs**: API endpoints for service management
- **Performance Optimized**: Lazy loading, compressed assets, and efficient animations

## Installation & Setup

### Prerequisites
- Python 3.11+
- PostgreSQL 12+
- Node.js 18+ (for frontend tooling)
- Git

### 1. Clone Repository
```bash
git clone https://github.com/your-repo/globaltech.git
cd globaltech
```

### 2. Virtual Environment Setup
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Database Configuration
Create a PostgreSQL database:
```sql
CREATE DATABASE globaltech;
CREATE USER postgres WITH PASSWORD 'postgres';
GRANT ALL PRIVILEGES ON DATABASE globaltech TO postgres;
```

### 5. Environment Variables
Create a `.env` file in the project root:
```env
SECRET_KEY=your-secret-key-here
DEBUG=True
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/globaltech
ALLOWED_HOSTS=localhost,127.0.0.1
```

### 6. Database Migration
```bash
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

### 7. Collect Static Files
```bash
python manage.py collectstatic --noinput
```

### 8. Run Development Server
```bash
python manage.py runserver
```

Visit `http://localhost:8000` to see the platform in action!

## Project Structure

```
globaltech/
├── core/                          # Main application
│   ├── templates/core/           # HTML templates
│   │   ├── base.html            # Base template
│   │   ├── home.html            # Homepage
│   │   ├── about.html           # About page
│   │   └── contact.html         # Contact page
│   ├── views.py                 # View logic
│   ├── urls.py                  # URL routing
│   └── models.py                # Data models
├── static/                       # Static assets
│   ├── css/
│   │   └── main.css            # Main stylesheet
│   └── js/
│       ├── main.js             # Main JavaScript
│       ├── hero-3d.js          # 3D hero animations
│       └── animations.js       # Additional animations
├── globaltech/                   # Project settings
│   ├── settings.py             # Django settings
│   ├── urls.py                 # Main URL configuration
│   └── wsgi.py                 # WSGI configuration
├── requirements.txt              # Python dependencies
└── manage.py                    # Django management script
```

## Key Technologies

### Backend
- **Django 5.2.3**: Web framework
- **PostgreSQL**: Database
- **Django REST Framework**: API development
- **Celery**: Asynchronous task processing
- **Redis**: Caching and message broker

### Frontend
- **HTML5/CSS3**: Modern markup and styling
- **JavaScript ES6+**: Interactive functionality
- **Three.js**: 3D graphics and animations
- **Bootstrap 5**: Responsive grid system
- **AOS (Animate On Scroll)**: Scroll animations
- **Font Awesome**: Icon library

### Design Features
- **CSS Custom Properties**: Design system variables
- **CSS Grid & Flexbox**: Modern layout techniques
- **CSS Animations**: Smooth transitions and effects
- **Backdrop Filters**: Glass morphism effects
- **Custom Gradients**: Cybersecurity-themed colors

## Customization

### Color Scheme
The design system uses CSS custom properties defined in `static/css/main.css`:

```css
:root {
    --primary-color: #00d4ff;     /* Cyber blue */
    --secondary-color: #0066cc;   /* Deep blue */
    --accent-color: #ff6b35;      /* Orange accent */
    --success-color: #00ff88;     /* Matrix green */
    --warning-color: #ffb800;     /* Warning yellow */
    --danger-color: #ff3366;      /* Alert red */
}
```

### Adding New Services
1. Update the services dictionary in `core/views.py`
2. Add corresponding icons from Font Awesome
3. Create detailed service pages as needed

### Customizing Animations
- Modify `static/js/hero-3d.js` for 3D scene changes
- Update `static/js/animations.js` for interactive effects
- Adjust CSS animations in `static/css/main.css`

## Performance Optimization

- **Lazy Loading**: Images and animations load on demand
- **Compressed Assets**: Minified CSS and JavaScript in production
- **Efficient Animations**: Hardware-accelerated CSS transforms
- **Database Optimization**: Indexed queries and connection pooling
- **Caching Strategy**: Redis for session and query caching

## Security Features

- **CSRF Protection**: Django's built-in CSRF middleware
- **XSS Prevention**: Template auto-escaping
- **SQL Injection Protection**: Django ORM parameterized queries
- **HTTPS Ready**: SSL/TLS configuration support
- **Environment Variables**: Sensitive data protection

## Deployment

### Production Settings
Update `globaltech/settings.py` for production:

```python
DEBUG = False
ALLOWED_HOSTS = ['globaltech.az', 'www.globaltech.az']
DATABASES = {
    'default': dj_database_url.config(default=os.environ.get('DATABASE_URL'))
}
```

### Static Files
Configure for production with WhiteNoise or CDN:
```python
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a Pull Request

## Support

For technical support and inquiries:
- Email: support@globaltech.az
- Phone: +994 12 XXX XX XX
- Address: 28 May Street, Baku, Azerbaijan

## License

© 2024 GlobalTech. All rights reserved.

---

**Built with ❤️ using Django, Three.js, and modern web technologies** 